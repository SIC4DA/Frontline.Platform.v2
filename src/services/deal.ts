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

  const result = await db.insert(deal).values({ chatId, userId: user.id }).returning({ id: deal.id });

  return result[0].id;
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
  const deal = await getDealByChatId(chatId);

  const { object } = await generateObject({
    model: google("gemini-1.5-flash"),
    messages,
    system: `
      You are Frontline — an energetic, fun, and helpful AI assistant built for sales reps who just closed a deal and are ready to document it like a pro.

      Your job is to guide them through a light, engaging conversation to collect the key details of their sale. Ask friendly, clear questions to get the info step-by-step — including the company they sold to, who they worked with, what was sold, the value of the deal, contract details, and any collaborators who helped make it happen.

      Feel free to celebrate their wins, keep the tone upbeat, and make the experience enjoyable. If the user asks you to fill in anything (like an overview), give it your best shot and make it sound smart and confident.

      your current deal: ${JSON.stringify(deal, null, 2)}

      You’ll save the collected details in the following JSON format:  
      ${JSON.stringify(DealSchema.shape, null, 2)}

      Let’s help them turn this win into something they can show off.

      don't fill in the details yet, just ask the user for them and return the initial value of fields that are not filled in yet.
      initial values: (string => '', number => 0, boolean => false, => object => {}, array => [])

      don't ask the user for anything if the field is already filled in.

      ask the user after each field is filled in about the next field.
    `,
    temperature: 0,
    maxTokens: 512,
    schemaName: "Deal",
    schema: DealSchema,
    schemaDescription: "The data you will be given is about the deal that the sales rep just closed.",
  });

  if (!deal && object.company?.companyName) {
    await createDeal(chatId);
  }

  if (object.company?.companyName && !deal?.companyLogo) {
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
