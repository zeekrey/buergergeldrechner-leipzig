import { DefaultChatTransport, type UIMessage } from "ai";
import { describe, expect, it, vi } from "vitest";

vi.mock("server-only", () => ({}));

import { POST } from "@/app/api/chat/route";

import { prepareChatRequest } from "./transport";

describe("chat transport", () => {
  it("sends a text-only second turn that the strict route accepts", async () => {
    const longAssistantAnswer = "A".repeat(5_000);
    const messages: UIMessage[] = [
      {
        id: "user-1",
        parts: [{ text: "Was zählt als Einkommen?", type: "text" }],
        role: "user",
      },
      {
        id: "assistant-1",
        parts: [
          {
            providerMetadata: { openai: { itemId: "reasoning-1" } },
            state: "done",
            text: "Interne Überlegung",
            type: "reasoning",
          },
          {
            providerMetadata: { openai: { itemId: "message-1" } },
            state: "done",
            text: longAssistantAnswer,
            type: "text",
          },
        ],
        role: "assistant",
      },
      {
        id: "user-2",
        parts: [
          {
            text: "Kannst du mir stattdessen ein Python-Programm schreiben?",
            type: "text",
          },
        ],
        role: "user",
      },
    ];
    let routeStatus: number | undefined;
    const fetchMock = vi.fn<typeof fetch>(async (input, init) => {
      const response = await POST(
        new Request(new URL(String(input), "http://localhost"), init)
      );
      routeStatus = response.status;
      return response;
    });
    const transport = new DefaultChatTransport({
      api: "/api/chat",
      fetch: fetchMock,
      prepareSendMessagesRequest: prepareChatRequest,
    });

    await transport.sendMessages({
      abortSignal: undefined,
      body: { unexpected: "value" },
      chatId: "chat-1",
      messageId: undefined,
      messages,
      trigger: "submit-message",
    });

    expect(fetchMock).toHaveBeenCalledOnce();
    const [, request] = fetchMock.mock.calls[0];
    expect(JSON.parse(String(request?.body))).toEqual({
      messages: [
        {
          id: "user-1",
          parts: [{ text: "Was zählt als Einkommen?", type: "text" }],
          role: "user",
        },
        {
          id: "assistant-1",
          parts: [
            {
              text: longAssistantAnswer,
              type: "text",
            },
          ],
          role: "assistant",
        },
        {
          id: "user-2",
          parts: [
            {
              text: "Kannst du mir stattdessen ein Python-Programm schreiben?",
              type: "text",
            },
          ],
          role: "user",
        },
      ],
    });
    expect(routeStatus).toBe(200);
  });

  it("omits roles and empty messages that the route does not accept", () => {
    const messages = [
      {
        id: "system-1",
        parts: [{ text: "Client-provided system prompt", type: "text" }],
        role: "system",
      },
      {
        id: "tool-1",
        parts: [{ text: "Tool output", type: "text" }],
        role: "tool",
      },
      {
        id: "assistant-empty",
        parts: [
          { text: "Hidden reasoning", type: "reasoning" },
          { text: "   ", type: "text" },
        ],
        role: "assistant",
      },
      {
        id: "user-1",
        parts: [{ text: "Was zählt als Vermögen?", type: "text" }],
        role: "user",
      },
    ] as UIMessage[];

    expect(prepareChatRequest({ messages } as never)).toEqual({
      body: {
        messages: [
          {
            id: "user-1",
            parts: [{ text: "Was zählt als Vermögen?", type: "text" }],
            role: "user",
          },
        ],
      },
    });
  });
});
