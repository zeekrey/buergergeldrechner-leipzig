import {
  convertToModelMessages,
  createUIMessageStream,
  createUIMessageStreamResponse,
  gateway,
  streamText,
  toUIMessageStream,
  type UIMessage,
  validateUIMessages,
} from "ai";
import { z } from "zod";

import { retrieveKnowledge } from "@/lib/chat/knowledge";
import {
  buildSystemPrompt,
  NO_GROUNDING_MESSAGE,
  OUT_OF_SCOPE_MESSAGE,
} from "@/lib/chat/system-prompt";

export const runtime = "nodejs";
export const maxDuration = 30;

export const CHAT_MODEL = "openai/gpt-5.6-luna";

const MAX_BODY_BYTES = 32_000;
const MAX_MESSAGES = 20;
const MAX_USER_MESSAGE_CHARACTERS = 4_000;
const MAX_TOTAL_CHARACTERS = 12_000;
const MAX_MODEL_MESSAGES = 12;
const GENERIC_ERROR_MESSAGE =
  "Die Antwort konnte nicht erstellt werden. Bitte versuchen Sie es später erneut.";

const textPartSchema = z
  .object({
    state: z.enum(["streaming", "done"]).optional(),
    text: z.string().max(MAX_TOTAL_CHARACTERS),
    type: z.literal("text"),
  })
  .strict();

const messageSchema = z
  .object({
    id: z.string().min(1).max(200),
    parts: z.array(textPartSchema).min(1).max(8),
    role: z.enum(["user", "assistant"]),
  })
  .strict();

const bodySchema = z
  .object({
    messages: z.array(messageSchema).min(1).max(MAX_MESSAGES),
  })
  .strict();

function textOf(message: UIMessage) {
  return message.parts
    .filter((part) => part.type === "text")
    .map((part) => part.text)
    .join("\n")
    .trim();
}

function textStreamResponse(text: string) {
  const textId = crypto.randomUUID();
  const stream = createUIMessageStream({
    execute({ writer }) {
      writer.write({ id: textId, type: "text-start" });
      writer.write({ delta: text, id: textId, type: "text-delta" });
      writer.write({ id: textId, type: "text-end" });
    },
  });

  return createUIMessageStreamResponse({ stream });
}

function errorResponse(message: string, status: number) {
  return Response.json({ error: message }, { status });
}

export async function POST(request: Request) {
  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.toLowerCase().startsWith("application/json")) {
    return errorResponse("Es werden nur JSON-Anfragen akzeptiert.", 415);
  }

  const declaredLength = Number(request.headers.get("content-length") ?? 0);
  if (Number.isFinite(declaredLength) && declaredLength > MAX_BODY_BYTES) {
    return errorResponse("Die Anfrage ist zu groß.", 413);
  }

  let rawBody: string;
  try {
    rawBody = await request.text();
  } catch {
    return errorResponse("Die Anfrage konnte nicht gelesen werden.", 400);
  }

  if (new TextEncoder().encode(rawBody).byteLength > MAX_BODY_BYTES) {
    return errorResponse("Die Anfrage ist zu groß.", 413);
  }

  let body: unknown;
  try {
    body = JSON.parse(rawBody);
  } catch {
    return errorResponse("Die Anfrage enthält kein gültiges JSON.", 400);
  }

  const parsedBody = bodySchema.safeParse(body);
  if (!parsedBody.success) {
    return errorResponse("Die Nachrichten sind ungültig.", 400);
  }

  const totalCharacters = parsedBody.data.messages.reduce(
    (total, message) =>
      total + message.parts.reduce((sum, part) => sum + part.text.length, 0),
    0
  );
  const hasOversizedUserMessage = parsedBody.data.messages.some(
    (message) =>
      message.role === "user" &&
      message.parts.reduce((sum, part) => sum + part.text.length, 0) >
        MAX_USER_MESSAGE_CHARACTERS
  );
  const latestMessage = parsedBody.data.messages.at(-1);
  if (
    totalCharacters > MAX_TOTAL_CHARACTERS ||
    hasOversizedUserMessage ||
    latestMessage?.role !== "user" ||
    latestMessage.parts.every((part) => part.text.trim().length === 0)
  ) {
    return errorResponse("Die Nachrichten sind ungültig oder zu lang.", 400);
  }

  let validatedMessages: UIMessage[];
  try {
    validatedMessages = await validateUIMessages({
      messages: parsedBody.data.messages,
    });
  } catch {
    return errorResponse("Die Nachrichten sind ungültig.", 400);
  }

  const latestQuestion = textOf(validatedMessages.at(-1)!);
  const previousUserQuestions = validatedMessages
    .slice(0, -1)
    .filter((message) => message.role === "user")
    .slice(-2)
    .map(textOf)
    .join("\n");

  try {
    const knowledge = await retrieveKnowledge(
      latestQuestion,
      previousUserQuestions
    );
    if (!knowledge.inScope) {
      return textStreamResponse(OUT_OF_SCOPE_MESSAGE);
    }
    if (knowledge.excerpts.length === 0) {
      return textStreamResponse(NO_GROUNDING_MESSAGE);
    }
    if (!process.env.AI_GATEWAY_API_KEY) {
      return errorResponse("Der Chat ist derzeit nicht verfügbar.", 503);
    }

    const recentMessages = validatedMessages.slice(-MAX_MODEL_MESSAGES);
    const result = streamText({
      abortSignal: request.signal,
      instructions: buildSystemPrompt(knowledge.excerpts),
      maxOutputTokens: 1_200,
      messages: await convertToModelMessages(recentMessages),
      model: gateway(CHAT_MODEL),
    });

    return createUIMessageStreamResponse({
      stream: toUIMessageStream({
        onError: () => GENERIC_ERROR_MESSAGE,
        sendReasoning: false,
        stream: result.stream,
      }),
    });
  } catch {
    return errorResponse(GENERIC_ERROR_MESSAGE, 500);
  }
}
