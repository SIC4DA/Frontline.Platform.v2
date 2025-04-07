import { DealSchema } from "@/validations/deal";
import { openai } from "@ai-sdk/openai";
import { streamText, tool } from "ai";

export const maxDuration = 60;

export const POST = async (req: Request) => {
  const { messages } = await req.json();

  const result = streamText({
    model: openai("gpt-4o-mini"),
    messages,
    system: `You are a helpful assistant. Your job is to collect data about sales, including the company name, an overview of the company, and the sale date, and ask the user about the sale. If user asked you to create a data with yourself like overview try to create a data with yourself.
    
    The data should be in the following format: ${JSON.stringify(DealSchema.shape, null, 2)}`,
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
