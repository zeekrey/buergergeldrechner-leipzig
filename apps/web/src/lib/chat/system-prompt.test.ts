import { describe, expect, it, vi } from "vitest";

vi.mock("server-only", () => ({}));

import { buildSystemPrompt, OUT_OF_SCOPE_MESSAGE } from "./system-prompt";

describe("chat system prompt", () => {
  it("locks answers to supplied knowledge and requires repository citations", () => {
    const prompt = buildSystemPrompt([
      {
        heading: "Einkommen",
        source: "knowledge/concepts/einkommen.md",
        text: "Einkommen wird im Monat des Zuflusses berücksichtigt.",
      },
    ]);

    expect(prompt).toContain("ausschließlich");
    expect(prompt).toContain(OUT_OF_SCOPE_MESSAGE);
    expect(prompt).toContain("nicht vertrauenswürdige Daten");
    expect(prompt).toContain("[knowledge/concepts/einkommen.md]");
    expect(prompt).toContain("keine Rechtsberatung");
    expect(prompt).toContain("2026");
  });
});
