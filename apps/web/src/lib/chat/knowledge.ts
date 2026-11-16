import "server-only";
import { lstat, readdir, readFile, realpath } from "node:fs/promises";
import path from "node:path";

const MAX_CHUNK_CHARACTERS = 2_400;
const CHUNK_OVERLAP_CHARACTERS = 240;
const MAX_EXCERPTS = 5;

const STOP_WORDS = new Set([
  "aber",
  "auch",
  "dass",
  "eine",
  "einem",
  "einen",
  "einer",
  "eines",
  "fuer",
  "haben",
  "ihre",
  "mein",
  "meine",
  "mich",
  "oder",
  "sich",
  "sind",
  "und",
  "viel",
  "wird",
  "werden",
  "welche",
  "welcher",
  "welches",
  "wenn",
  "wieviel",
  "wieso",
]);

const DOMAIN_TERMS = [
  "absetzbetrag",
  "antrag",
  "anspruch",
  "arbeitslos",
  "arbeitsuchend",
  "auszahlung",
  "bedarf",
  "bedarfsgemeinschaft",
  "berechnung",
  "bewilligung",
  "buergergeld",
  "darlehen",
  "einkommen",
  "erwerbsfaehig",
  "erwerbstaetig",
  "freibetrag",
  "grundsicherung",
  "grundsicherungsgeld",
  "grundsicherungsrechner",
  "heizkosten",
  "hilfebeduerftig",
  "jobcenter",
  "karenzzeit",
  "kindergeld",
  "kooperationsplan",
  "leistung",
  "leistungsminderung",
  "mehrbedarf",
  "meldeversaeumnis",
  "miete",
  "pflichtverletzung",
  "rechner",
  "regelbedarf",
  "sanktion",
  "sgb",
  "unterkunft",
  "vermoegen",
  "wohngeld",
];

const UNRELATED_TERMS = [
  "fussball",
  "gedicht",
  "koch",
  "programm",
  "python",
  "rezept",
  "reise",
  "sport",
  "wetter",
];

const FOLLOW_UP_PATTERN = /^(und (wie|was|gilt)|aber (wie|was)|gilt das|was bedeutet das|wie ist das (bei|mit)|kannst du das|dazu|davon|dabei)\b/;

const PROMPT_CONTROL_PATTERNS = [
  /\b(ignoriere|missachte|umgehe)\b.*\b(regel|regeln|anweisung\w*|instruktion\w*|prompt\w*)\b/,
  /\b(ignore|disregard|bypass)\b.*\b(instruction\w*|rule\w*|prompt\w*)\b/,
  /\b(systemanweisung\w*|systemprompt\w*|system prompt|developer message|entwicklernachricht\w*)\b/,
  /\b(gib|zeige|nenne|verrate|offenlege|drucke|wiederhole)\b.*\b(interne\w* anweisung\w*|systemanweisung\w*|systemprompt\w*|system prompt|developer message)\b/,
  /\b(reveal|show|print|repeat)\b.*\b(system prompt|developer message|internal instruction\w*)\b/,
  /\b(jailbreak|prompt injection)\b/,
  /\btu so als\b.*\b(keine|ohne)\b.*\b(regel|regeln|anweisung\w*)\b/,
];

export type KnowledgeChunk = {
  heading: string;
  source: string;
  text: string;
};

export type KnowledgeSearchResult = {
  excerpts: KnowledgeChunk[];
  inScope: boolean;
};

let corpusPromise: Promise<KnowledgeChunk[]> | undefined;

function normalize(value: string) {
  return value
    .toLocaleLowerCase("de-DE")
    .replaceAll("ä", "ae")
    .replaceAll("ö", "oe")
    .replaceAll("ü", "ue")
    .replaceAll("ß", "ss")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9§]+/g, " ")
    .trim();
}

function terms(value: string) {
  return [...new Set(normalize(value).split(/\s+/))].filter(
    (term) => term.length > 2 && !STOP_WORDS.has(term)
  );
}

function termMatches(candidate: string, target: string) {
  return (
    candidate === target ||
    (candidate.length >= 5 && target.startsWith(candidate)) ||
    (target.length >= 5 && candidate.startsWith(target))
  );
}

export function isQuestionInScope(question: string, priorUserContext = "") {
  const normalizedQuestion = normalize(question);
  const questionTerms = terms(question);
  const hasDomainTerm = DOMAIN_TERMS.some((domainTerm) =>
    questionTerms.some((term) => termMatches(domainTerm, term))
  );
  const hasUnrelatedTerm = UNRELATED_TERMS.some((unrelatedTerm) =>
    questionTerms.some((term) => termMatches(unrelatedTerm, term))
  );
  const hasPromptControlAttempt = PROMPT_CONTROL_PATTERNS.some((pattern) =>
    pattern.test(normalizedQuestion)
  );

  if (hasUnrelatedTerm || hasPromptControlAttempt) {
    return false;
  }

  if (hasDomainTerm) {
    return true;
  }

  return (
    FOLLOW_UP_PATTERN.test(normalizedQuestion) &&
    DOMAIN_TERMS.some((domainTerm) =>
      terms(priorUserContext).some((term) => termMatches(domainTerm, term))
    )
  );
}

function splitLongSection(section: string) {
  if (section.length <= MAX_CHUNK_CHARACTERS) {
    return [section];
  }

  const chunks: string[] = [];
  let start = 0;

  while (start < section.length) {
    let end = Math.min(start + MAX_CHUNK_CHARACTERS, section.length);
    if (end < section.length) {
      const paragraphBreak = section.lastIndexOf("\n\n", end);
      if (paragraphBreak > start + MAX_CHUNK_CHARACTERS / 2) {
        end = paragraphBreak;
      }
    }
    chunks.push(section.slice(start, end).trim());
    if (end === section.length) {
      break;
    }
    start = Math.max(end - CHUNK_OVERLAP_CHARACTERS, start + 1);
  }

  return chunks;
}

export function chunkMarkdown(markdown: string, source: string) {
  const withoutFrontmatter = markdown.replace(/^---\n[\s\S]*?\n---\n?/, "");
  const sections: Array<{ heading: string; lines: string[] }> = [];
  let current = { heading: "Einleitung", lines: [] as string[] };

  for (const line of withoutFrontmatter.split(/\r?\n/)) {
    const headingMatch = /^(#{1,4})\s+(.+)$/.exec(line);
    if (headingMatch) {
      if (current.lines.some((item) => item.trim())) {
        sections.push(current);
      }
      current = { heading: headingMatch[2].trim(), lines: [line] };
    } else {
      current.lines.push(line);
    }
  }
  if (current.lines.some((item) => item.trim())) {
    sections.push(current);
  }

  return sections.flatMap(({ heading, lines }) =>
    splitLongSection(lines.join("\n").trim()).map((text) => ({
      heading,
      source: `knowledge/${source}`,
      text,
    }))
  );
}

async function listMarkdownFiles(root: string, directory = root): Promise<string[]> {
  const rootRealPath = await realpath(root);
  const directoryRealPath = await realpath(directory);
  const relativeDirectory = path.relative(rootRealPath, directoryRealPath);

  if (relativeDirectory.startsWith("..") || path.isAbsolute(relativeDirectory)) {
    throw new Error("Knowledge path escapes the configured corpus root.");
  }

  const entries = await readdir(directoryRealPath, { withFileTypes: true });
  const files: string[] = [];

  for (const entry of entries.sort((left, right) => left.name.localeCompare(right.name))) {
    const entryPath = path.join(directoryRealPath, entry.name);
    const stats = await lstat(entryPath);
    if (stats.isSymbolicLink()) {
      throw new Error("Symbolic links are not allowed in the knowledge corpus.");
    }
    if (stats.isDirectory()) {
      files.push(...(await listMarkdownFiles(rootRealPath, entryPath)));
    } else if (stats.isFile() && path.extname(entry.name).toLowerCase() === ".md") {
      files.push(entryPath);
    }
  }

  return files;
}

export async function loadKnowledgeCorpus(root: string) {
  const rootRealPath = await realpath(root);
  const files = await listMarkdownFiles(rootRealPath);
  if (files.length === 0) {
    throw new Error("No Markdown files found in the knowledge corpus.");
  }

  const chunks = await Promise.all(
    files.map(async (file) => {
      const relativePath = path.relative(rootRealPath, file);
      if (relativePath.startsWith("..") || path.isAbsolute(relativePath)) {
        throw new Error("Knowledge file escapes the configured corpus root.");
      }
      return chunkMarkdown(
        await readFile(file, "utf8"),
        relativePath.split(path.sep).join("/")
      );
    })
  );

  return chunks.flat();
}

function scoreChunk(chunk: KnowledgeChunk, queryTerms: string[]) {
  const headingTerms = terms(`${chunk.source} ${chunk.heading}`);
  const bodyTerms = terms(chunk.text);

  return queryTerms.reduce((score, queryTerm) => {
    if (headingTerms.some((term) => termMatches(queryTerm, term))) {
      return score + 3;
    }
    if (bodyTerms.some((term) => termMatches(queryTerm, term))) {
      return score + 1;
    }
    return score;
  }, 0);
}

export function searchKnowledge(
  chunks: KnowledgeChunk[],
  question: string,
  priorUserContext = ""
): KnowledgeSearchResult {
  if (!isQuestionInScope(question, priorUserContext)) {
    return { excerpts: [], inScope: false };
  }

  const queryTerms = terms(`${question} ${priorUserContext}`);
  const ranked = chunks
    .map((chunk) => ({ chunk, score: scoreChunk(chunk, queryTerms) }))
    .filter(({ score }) => score >= 1)
    .sort(
      (left, right) =>
        right.score - left.score || left.chunk.source.localeCompare(right.chunk.source)
    );

  if (ranked.length === 0) {
    return { excerpts: [], inScope: true };
  }

  const excerpts = ranked.slice(0, MAX_EXCERPTS).map(({ chunk }) => chunk);
  const warning = chunks.find(
    (chunk) =>
      chunk.source === "knowledge/index.md" &&
      normalize(chunk.text).includes("quellen und zeitwarnung")
  );
  if (warning && !excerpts.includes(warning)) {
    excerpts.splice(Math.max(0, MAX_EXCERPTS - 1), 1, warning);
  }

  return { excerpts, inScope: true };
}

export function formatKnowledgeContext(excerpts: KnowledgeChunk[]) {
  return excerpts
    .map(
      (excerpt) =>
        `Quelle: [${excerpt.source}]\nAbschnitt: ${excerpt.heading}\n${excerpt.text}`
    )
    .join("\n\n---\n\n");
}

export async function retrieveKnowledge(
  question: string,
  priorUserContext = ""
): Promise<KnowledgeSearchResult> {
  const knowledgeRoot = path.resolve(process.cwd(), "../../knowledge");
  corpusPromise ??= loadKnowledgeCorpus(knowledgeRoot);
  return searchKnowledge(await corpusPromise, question, priorUserContext);
}
