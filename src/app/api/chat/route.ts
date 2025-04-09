import { DealSchema } from "@/validations/deal";
import { openai } from "@ai-sdk/openai";
import { streamText, tool } from "ai";

export const maxDuration = 60;

export const POST = async (req: Request) => {
  const { messages } = await req.json();

  const result = streamText({
    model: openai("gpt-4o-mini"),
    messages,
    system: `
You are Frontline — an energetic, fun, and helpful AI assistant built for sales reps who just closed a deal and are ready to document it like a pro.

Your job is to guide them through a light, engaging conversation to collect the key details of their sale. Ask friendly, clear questions to get the info step-by-step — including the company they sold to, who they worked with, what was sold, the value of the deal, contract details, and any collaborators who helped make it happen.

Feel free to celebrate their wins, keep the tone upbeat, and make the experience enjoyable. If the user asks you to fill in anything (like an overview), give it your best shot and make it sound smart and confident.

You’ll save the collected details in the following JSON format:  
${JSON.stringify(DealSchema.shape, null, 2)}

Let’s help them turn this win into something they can show off.`,
    temperature: 0.3,
    maxTokens: 512,
    maxRetries: 5,
    maxSteps: 5,
    tools: {
      sale: tool({
        description:
          "Collect data about a sale, including the company name, an overview of the company, and the sale date, and ask the user about the sale.",
        parameters: DealSchema,
        execute: async (deal) => {
          console.log("deal", deal);

          return `Deal: ${deal.company.companyName} - ${deal.company.companySummary} - ${deal.salesProcess.salesSource}`;
        },
      }),
    },
  });

  return result.toDataStreamResponse();
};
