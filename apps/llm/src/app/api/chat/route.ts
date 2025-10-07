import { openai } from "@ai-sdk/openai";
import {
  streamText,
  UIMessage,
  convertToModelMessages,
  tool,
  stepCountIs,
} from "ai";
import z from "zod";
import { calculateSalary } from "calculation";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  const result = streamText({
    model: openai("gpt-4o"),
    messages: convertToModelMessages(messages),
    stopWhen: stepCountIs(5),

    tools: {
      calculateSalary: tool({
        description:
          "Berechnet die Einnahmen einer Person die Bürgergeld benatragen möchte. Die anzurechnenden Einnahmen einer Person werden durch mögliche Freibeträge reduziert, sodass sich der Bürgergeldanspruch erhöhen kann.",
        inputSchema: z.object({
          gross: z
            .number()
            .describe("Das Brutto-Einkommen des Antragstellers."),
          net: z.number().describe("Das Netto-Einkommen des Antragstellers."),
          hasMinorChild: z
            .boolean()
            .describe(
              "Lebt ein Kind im Haushalt des Antragstellers, welches unter 18 Jahre alt ist?"
            ),
          isYoung: z
            .boolean()
            .describe("Ist der Antragsteller jünger als 18 Jahre?"),
        }),
        execute: async ({ gross, net, hasMinorChild, isYoung }) => {
          /**
           * Ich möchte Bürgergeld beantragen und möchte wissen wie viel von meinen Einkommen angerechnet wird. Kannst du das berechnen?
           * Mein Brutto-Einkommen: 900, Mein Netto-Einkommen: 600, Lebt ein Kind unter 18 Jahren in deinem Haushalt? Nein,  Bist du jünger als 18 Jahre? Nein
           */

          console.log(gross, net, hasMinorChild, isYoung);

          const result = calculateSalary({
            gross,
            net,
            hasMinorChild,
            isYoung,
          });

          console.log(result);

          return result;
        },
      }),
    },
  });

  return result.toUIMessageStreamResponse();
}
