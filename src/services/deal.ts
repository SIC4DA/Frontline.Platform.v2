"use server";

import { db } from "@/core/db";
import { deal } from "@/core/db/schema";
import type { TMessage } from "@/types/chat";
import { DealSchema } from "@/validations/deal";
import { google } from "@ai-sdk/google";
import { generateObject } from "ai";
import { and, eq } from "drizzle-orm";
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

  console.log(result);

  return result;
};

export const getDeals = async () => {
  const user = await getMe();

  const result = await db.query.deal.findMany({
    where: eq(deal.userId, user.id),
  });

  return result;
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
    system: `You are Frontline — an energetic, fun, and helpful AI assistant built for sales reps who just closed a deal and are ready to document it like a pro.

    current deal: ${JSON.stringify(deal, null, 2)}
    You will be given some data about the deal in the following format: ${JSON.stringify(DealSchema.shape, null, 2)}

    if there is data can't be found, respond with empty field.
    `,
    temperature: 0.3,
    maxTokens: 512,
    schemaName: "Deal",
    schema: DealSchema,
    schemaDescription:
      "You are Frontline — an energetic, fun, and helpful AI assistant built for sales reps who just closed a deal and are ready to document it like a pro.",
  });

  await updateDealByChatId(chatId, {
    ...object.company,
    ...object.contract,
    ...object.product,
    ...object.salesProcess,
  });

  return { success: true, deal: object };
};
