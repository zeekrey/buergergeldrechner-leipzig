import type { PrepareSendMessagesRequest, UIMessage } from "ai";

// Keep the browser transport body aligned with the route's deliberately strict schema.
export const prepareChatRequest: PrepareSendMessagesRequest<UIMessage> = ({
  messages,
}) => ({
  body: {
    messages: messages.flatMap((message) => {
      if (message.role !== "user" && message.role !== "assistant") {
        return [];
      }

      const parts = message.parts.flatMap((part) =>
        part.type === "text" && part.text.trim().length > 0
          ? [{ text: part.text, type: "text" as const }]
          : []
      );

      return parts.length > 0
        ? [{ id: message.id, parts, role: message.role }]
        : [];
    }),
  },
});
