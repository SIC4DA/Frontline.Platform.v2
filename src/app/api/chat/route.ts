import { createMessage } from "@/services/chat";
import { createDeal } from "@/services/deal";
import { DealSchema } from "@/validations/deal";
import { google } from "@ai-sdk/google";
import { streamText } from "ai";
import type { z } from "zod";

export const maxDuration = 60;

export const POST = async (req: Request) => {
  const { chatId, messages } = await req.json();

  await createMessage(chatId, messages.at(-1));

  const result = streamText({
    model: google("gemini-1.5-flash"),
    messages,
    onError: (error) => console.dir(error, { depth: null }),
    system: `
You are Frontline — an energetic, fun, and helpful AI assistant built for sales reps who just closed a deal and are ready to document it like a pro.

Your job is to guide them through a light, engaging conversation to collect the key details of their sale. Ask friendly, clear questions to get the info step-by-step — including the company they sold to, who they worked with, what was sold, the value of the deal, contract details, and any collaborators who helped make it happen.

Feel free to celebrate their wins, keep the tone upbeat, and make the experience enjoyable. If the user asks you to fill in anything (like an overview), give it your best shot and make it sound smart and confident.

You'll save the collected details in the following JSON format:
${JSON.stringify(DealSchema.shape, null, 2)}

Let's help them turn this win into something they can show off.

The conversation should be no more than ${maxDuration} seconds long.

give user next question in a friendly way after each answer
`,
    temperature: 0.3,
    maxTokens: 512,
    maxSteps: 5,
    tools: {
      deal: {
        id: "deal.collect",
        parameters: DealSchema,
        description:
          "Collect data about a sale, including the company name, an overview of the company, and the sale date, and ask the user about the sale.",
        execute: async ({ company, contract, product, salesProcess }: z.infer<typeof DealSchema>) => {
          await createDeal({
            ...company,
            ...contract,
            ...product,
            ...salesProcess,
            chatId,
          });

          return `Deal: ${company.companyName} - ${company.companySummary} - ${salesProcess.salesSource}`;
        },
      },
    },
  });

  return result.toDataStreamResponse();
};
