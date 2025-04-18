import { createMessage } from "@/services/chat";
import { getDealByChatId } from "@/services/deal";
import { DealSchema } from "@/validations/deal";
import { google } from "@ai-sdk/google";
import { streamText } from "ai";

export const maxDuration = 60;

export const POST = async (req: Request) => {
  const { chatId, messages } = await req.json();

  await createMessage(chatId, messages.at(-1));
  const deal = await getDealByChatId(chatId);

  const result = streamText({
    model: google("gemini-1.5-flash"),
    messages,
    onError: (error) => console.dir(error, { depth: null }),
    system: `
    You are Frontline — an energetic, fun, and helpful AI assistant built for sales reps who just closed a deal and are ready to document it like a pro.

    Your job is to collect ALL the key details of their sale by asking the user a series of questions, one at a time, for every field in the schema. After the user answers a question, ask the next one. If the user asks for help generating an answer, you may suggest a confident, smart-sounding response based on the context.

    Here are the questions to ask, in order:
    1. What is the name of the company?
    2. What is the company logo URL? (If you don't have one, you can skip)
    3. Please provide a summary of the company.
    4. What industry is the company in?
    5. What is the employee headcount of the company?
    6. What is the company website?
    7. What is the contract value? (e.g. $500,000)
    8. What is the contract term? (e.g. 12 months)
    9. What is the contract start date?
    10. What is the contract end date?
    11. Who is the contract signer?
    12. What are the payment terms? (e.g. Net 30 days invoice)
    13. What is the product name?
    14. What are the product use cases?
    15. What are the pain points addressed by the product?
    16. Who are the key stakeholders for the product? (Please provide names and titles. You can add more than one.)
    17. What is the sales source? (e.g. Cold Email, Referral)
    18. What is the sales cycle length? (e.g. 15 months)
    19. Who contributed to the deal? (Please provide names, titles, shoutouts, and their stage in the process. You can add more than one.)

    Please ask each question one at a time, and wait for the user's response before moving to the next. If the user asks for help generating an answer, you may suggest one. Otherwise, only record what the user provides.

    If a field is already filled in, skip that question. For fields with multiple entries (like stakeholders or contributors), ask if the user wants to add another after each entry.

    Do not make assumptions or fill in any data yourself unless the user requests your help.

    Your current deal: ${JSON.stringify(deal, null, 2)}

    You'll save the collected details in the following JSON format:  
    ${JSON.stringify(DealSchema.shape, null, 2)}
  `,
    temperature: 0.3,
    maxTokens: 512,
    maxSteps: 5,
  });

  return result.toDataStreamResponse();
};
