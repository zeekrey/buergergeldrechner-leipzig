"use client";

import { useChat, type UIMessage } from "@ai-sdk/react";
import { useState } from "react";
import { createMarkdownExit } from "markdown-exit";

export default function Chat() {
  const md = createMarkdownExit();
  const initialMessage: UIMessage[] = [
    {
      id: "initial-message",
      role: "assistant",
      parts: [
        {
          type: "text",
          text: "Hallo! Ich berechne Ihren Bürgergeldanspruch. Zunächst die Frage: Sind Sie erwerbsfähig?",
        },
      ],
    },
  ];

  const [input, setInput] = useState("");
  const { messages, sendMessage } = useChat({ messages: initialMessage });
  return (
    <div className="w-full max-w-xl py-24 mx-auto prose prose-sm prose-p:my-0.5 prose-ul:m-0.5 prose-li:my-0.5">
      {messages.map((message) => (
        <div key={message.id} className="whitespace-pre-wrap">
          <div className="text-zinc-400">
            {message.role === "user" ? "User: " : "AI: "}
          </div>
          {message.parts.map((part, i) => {
            switch (part.type) {
              case "text":
                return (
                  <div
                    key={`${message.id}-${i}`}
                    dangerouslySetInnerHTML={{ __html: md.render(part.text) }}
                  />
                );
            }
          })}
        </div>
      ))}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage({ text: input });
          setInput("");
        }}
      >
        <input
          className="fixed dark:bg-zinc-900 bottom-0 w-full max-w-xl p-2 mb-8 border border-zinc-300 dark:border-zinc-800 rounded shadow-xl"
          value={input}
          placeholder="Say something..."
          onChange={(e) => setInput(e.currentTarget.value)}
        />
      </form>
    </div>
  );
}
