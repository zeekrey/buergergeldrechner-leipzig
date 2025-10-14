import { openai } from "@ai-sdk/openai";
import {
  streamText,
  UIMessage,
  convertToModelMessages,
  tool,
  stepCountIs,
} from "ai";
import z from "zod";
import { calculateSalary, calculateOverall, StepContext } from "calculation";
import { systemPrompt } from "./system-prompt";
import { createOllama } from "ollama-ai-provider-v2";

const ollama = createOllama({
  // optional settings, e.g.
  // baseURL: 'https://api.ollama.com',
});

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  const result = streamText({
    // model: openai("gpt-4o"),
    model: ollama("gpt-oss:20b"),
    system: systemPrompt,
    messages: convertToModelMessages(messages),
    stopWhen: stepCountIs(5),
    tools: {
      // calculateSalary: tool({
      //   description:
      //     "Berechnet die Einnahmen einer Person die Bürgergeld benatragen möchte. Die anzurechnenden Einnahmen einer Person werden durch mögliche Freibeträge reduziert, sodass sich der Bürgergeldanspruch erhöhen kann.",
      //   inputSchema: z.object({
      //     gross: z
      //       .number()
      //       .describe("Das Brutto-Einkommen des Antragstellers."),
      //     net: z.number().describe("Das Netto-Einkommen des Antragstellers."),
      //     hasMinorChild: z
      //       .boolean()
      //       .describe(
      //         "Lebt ein Kind im Haushalt des Antragstellers, welches unter 18 Jahre alt ist?"
      //       ),
      //     isYoung: z
      //       .boolean()
      //       .describe("Ist der Antragsteller jünger als 18 Jahre?"),
      //   }),
      //   execute: async ({ gross, net, hasMinorChild, isYoung }) => {
      //     /**
      //      * Ich möchte Bürgergeld beantragen und möchte wissen wie viel von meinen Einkommen angerechnet wird. Kannst du das berechnen?
      //      * Mein Brutto-Einkommen: 900, Mein Netto-Einkommen: 600, Lebt ein Kind unter 18 Jahren in deinem Haushalt? Nein,  Bist du jünger als 18 Jahre? Nein
      //      */
      //     const result = calculateSalary({
      //       gross,
      //       net,
      //       hasMinorChild,
      //       isYoung,
      //     });

      //     console.log(result);

      //     return result;
      //   },
      // }),
      calculateOverall: tool({
        description:
          "Berechnet den Bürgergeldanspruch einer Person. Um den Anspruch berechnen zu können, werden eine Reihe von Informationen benötigt. Eine Grundvorraussetzung für den Bezug von Bürgergeld ist die erwerbsfähigkeit (isEmployable). Frage diese zunächst ab. Gib den Hinweis, dass Antragsteller grundsätzlich Vermittelbar und arbeitsfähig sein müssen. Ist dies nicht der Fall, können andere Förderungen benatragt werden aber kein Bürgergeld.",
        inputSchema: StepContext,
        execute: async (context) => {
          /**
           * Ich möchte Bürgergeld beantragen und möchte wissen wie viel von meinen Einkommen angerechnet wird. Kannst du das berechnen?
           * Mein Brutto-Einkommen: 900, Mein Netto-Einkommen: 600, Lebt ein Kind unter 18 Jahren in deinem Haushalt? Nein,  Bist du jünger als 18 Jahre? Nein
           */
          const result = calculateOverall(context);

          console.log(result);

          return result;
        },
      }),
    },
  });

  return result.toUIMessageStreamResponse();
}
