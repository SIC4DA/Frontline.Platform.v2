"use server";

import { db } from "@/core/db";
import { deal } from "@/core/db/schema";
import type { TMessage } from "@/types/chat";
import type { Deal } from "@/types/deal";
import { getBrand } from "@/utils/brand";
import { tryCatch } from "@/utils/tryCatch";
import { DealSchema } from "@/validations/deal";
import { google } from "@ai-sdk/google";
import { generateObject } from "ai";
import { and, eq, ilike } from "drizzle-orm";
import { getMe } from "./user";

export const getDeal = async (id: string) => {
  const user = await getMe();

  const result = await db.query.deal.findFirst({
    where: and(eq(deal.id, id), eq(deal.userId, user.id)),
  });

  return result;
};

export const getDealByChatId = async (chatId: string) => {
  const user = await getMe();

  const result = await db.query.deal.findFirst({
    where: and(eq(deal.chatId, chatId), eq(deal.userId, user.id)),
    columns: {
      id: false,
      chatId: false,
      userId: false,
    },
  });

  return result;
};

export const getDeals = async ({ limit }: { limit?: number } = {}) => {
  const user = await getMe();

  const result = await db.query.deal.findMany({
    where: eq(deal.userId, user.id),
    ...(limit && { limit }),
  });

  return result as Deal[];
};

export const createDeal = async (chatId: string) => {
  const user = await getMe();

  const result = await db.insert(deal).values({ chatId, userId: user.id }).returning();

  return result[0];
};

export const updateDeal = async (id: string, data: Partial<Omit<typeof deal.$inferInsert, "id" | "userId">>) => {
  const user = await getMe();

  return db
    .update(deal)
    .set(data)
    .where(and(eq(deal.id, id), eq(deal.userId, user.id)));
};

export const updateDealByChatId = async (
  chatId: string,
  data: Partial<Omit<typeof deal.$inferInsert, "id" | "userId">>,
) => {
  const user = await getMe();

  return db
    .update(deal)
    .set(data)
    .where(and(eq(deal.chatId, chatId), eq(deal.userId, user.id)));
};

export const deleteDeal = async (id: string) => {
  const user = await getMe();

  await db.delete(deal).where(and(eq(deal.id, id), eq(deal.userId, user.id)));
};

export const generateDealByAI = async (chatId: string, messages: TMessage[]) => {
  const deal = (await getDealByChatId(chatId)) ?? ({} as Deal);

  const { object } = await generateObject({
    model: google("gemini-1.5-flash"),
    messages,
    system: `
      You are Frontline — an energetic, fun, and helpful AI assistant built for sales reps who just closed a deal and are ready to document it like a pro.

      Your job is to guide them through a light, engaging conversation to collect ALL the key details of their sale. Ask friendly, clear questions to get the info step-by-step, covering every field in the schema.

      The schema includes:
      - Company information: name, logo, summary, industry, employee headcount, website
      - Contract information: value, term, start/end dates, signer, payment terms
      - Product information: name, use cases, pain points, key stakeholders (with names and titles)
      - Sales process information: source, cycle length, and contributors (with names, titles, shoutouts, and stages)

      Feel free to celebrate their wins and keep the tone upbeat. However, NEVER generate or suggest any content for the user.

      your current deal: ${JSON.stringify(deal, null, 2)}

      You'll save the collected details in the following JSON format:  
      ${JSON.stringify(DealSchema.shape, null, 2)}

      IMPORTANT INSTRUCTIONS:
      1. Systematically work through EVERY field in the schema, asking about each one individually
      2. For nested objects and arrays (like keyStakeholders and dealContributors), ask about each sub-field
      3. Don't skip any fields, even if they seem optional
      4. NEVER fill in any details yourself - ONLY save what the user explicitly provides
      5. Only skip asking about fields that already have non-default values
      6. For empty fields: (string => '', number => 0, boolean => false, object => {}, array => [])
      7. Ask one question at a time, and wait for the user's response before moving to the next field
      8. If the user asks you to generate or suggest content, politely decline and explain you can only record information they provide
      9. If the user doesn't provide information for a field, leave it with the default empty value
      10. Do not make assumptions or inferences about any data - only use exactly what the user tells you
    `,
    temperature: 0,
    maxTokens: 512,
    schemaName: "Deal",
    schema: DealSchema,
    schemaDescription: "The data you will be given is about the deal that the sales rep just closed.",
  });

  if (!Object.keys(deal).length && object.company?.companyName) {
    const createdDeal = await createDeal(chatId);
    Object.assign(deal, createdDeal);
    console.log(deal);
  }

  if (object.company?.companyName !== deal?.companyName) {
    const { data: brand, error } = await tryCatch(getBrand(object.company?.companyName));

    if (brand && !error) {
      object.company = {
        ...object.company,
        companyLogo: brand.icon,
      };
    }
  }

  await updateDealByChatId(chatId, {
    ...object.company,
    ...object.contract,
    ...object.product,
    ...object.salesProcess,
  });

  return { success: true, deal: object };
};

export const getDealsAnalytics = async () => {
  const user = await getMe();

  const result = (await db.query.deal.findMany({
    where: eq(deal.userId, user.id),
  })) as Deal[];

  const closedDeals = result.filter(
    (deal) =>
      Array.isArray(deal.dealContributors) &&
      deal.dealContributors.some((contributor) => contributor.stage === "Closing"),
  );

  const dealsCount = result.length;
  const closedDealsCount = closedDeals.length;
  const conversionRate = closedDealsCount > 0 ? (closedDealsCount / dealsCount) * 100 : 0;

  return {
    closedDeals: closedDealsCount,
    conversionRate: Number(conversionRate.toFixed(2)),
  };
};

export const searchDeal = async (query: string, { limit }: { limit?: number } = {}) => {
  const user = await getMe();

  const result = await db.query.deal.findMany({
    where: and(eq(deal.userId, user.id), ilike(deal.companyName, `%${query}%`)),
    ...(limit && { limit }),
  });

  return result as Deal[];
};
