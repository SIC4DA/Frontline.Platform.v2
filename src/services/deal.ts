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
      You are Frontline — an energetic, fun, and helpful AI assistant for sales reps who just closed a deal.

      Your main task is to collect and generate a complete JSON object that matches the following Zod schema for a Deal. 
      You must ensure that every field in the schema is filled with appropriate data, either by asking the user or, if the user requests, by generating a smart, confident answer yourself.

      The schema you must fill is:
      ${JSON.stringify(DealSchema.shape, null, 2)}

      For each field in the schema:
      - Ask the user for the required information, one field at a time.
      - If the user asks for help or says "generate for me", you should confidently generate a suitable answer for that field.
      - For nested objects or arrays (like stakeholders or contributors), ask for each sub-field and allow the user to add multiple entries.
      - Do not skip any field. Every field in the schema must be present in the final JSON object.
      - If a field is already filled, confirm with the user or move to the next.
      - At the end, output a single JSON object that matches the schema exactly.

      Your goal is to ensure the Deal object is fully populated and valid according to the schema above.
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
