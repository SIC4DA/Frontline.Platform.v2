"use server";

import { openai } from "@ai-sdk/openai";
import { generateObject } from "ai";
import { and, eq, ilike, or } from "drizzle-orm";

import { db } from "@/core/db";
import { deal } from "@/core/db/schema";
import type { TMessage } from "@/types/chat";
import type { Deal } from "@/types/deal";
import { getBrand } from "@/utils/brand";
import { tryCatch } from "@/utils/tryCatch";
import { DealSchema } from "@/validations/deal";

import { getMe } from "./user";

export const getDeal = async (id: string): Promise<Partial<Deal & { isPublic: boolean }> | null> => {
  const user = await getMe();

  const result = (await db.query.deal.findFirst({
    where: or(eq(deal.id, id), eq(deal.privateId, id)),
  })) as Partial<Deal | undefined>;

  if (!result) {
    return null;
  }

  // Check if the deal id is private or belongs to the user
  if (result.userId === user.id || result.privateId === id) {
    return {
      ...result,
      isPublic: false,
    };
  }

  // return a limited set of fields for public deals
  return {
    id: result.id,
    companyName: result.companyName,
    // Add any other fields you want to include
    isPublic: true,
  };
};

export const getDealByChatId = async (chatId: string) => {
  const user = await getMe();

  const result = await db.query.deal.findFirst({
    where: and(eq(deal.chatId, chatId), eq(deal.userId, user.id)),
    columns: {
      id: false,
      chatId: false,
      userId: false,
      privateId: false,
    },
  });

  return result as Deal | undefined;
};

export const getDeals = async ({ limit }: { limit?: number } = {}) => {
  const user = await getMe();

  const result = await db.query.deal.findMany({
    columns: {
      privateId: false,
    },
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

  await db
    .update(deal)
    .set(data)
    .where(and(eq(deal.id, id), eq(deal.userId, user.id)));
};

export const updateDealByChatId = async (
  chatId: string,
  data: Partial<Omit<typeof deal.$inferInsert, "id" | "userId">>,
) => {
  const user = await getMe();

  await db
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
    model: openai("gpt-4o-mini"),
    messages,
    maxRetries: 5,
    system: `
      You are Frontline — an energetic, fun, and helpful AI assistant for sales reps who just closed a deal.

      Your main task is to collect a complete JSON object that matches the following Zod schema for a Deal. 
      You must ensure that every field in the schema is filled with appropriate data by asking the user for input and don't fill data with yourself without asking the user if user doesn't provide you any data make it empty.

      For each field in the schema:
      - First check if the field already exists in the current deal data
      - If a field exists, ask the user if they want to update it or keep the current value
      - For empty or missing fields, ask the user for the required information
      - For nested objects or arrays (like stakeholders or contributors), show existing entries and ask if user wants to add/modify/remove entries
      - Every field in the schema must be present in the final JSON object
      - At the end, output a single JSON object that matches the schema exactly
      - Don't return 'null' just return an empty field value like this: { "fieldName": "", "price": 0, "date": "2023-01-01", other: [] }
      - If the user provides an invalid or incorrectly formatted answer (e.g., "8m" instead of "8 months"), politely explain the correct format and ask them to provide the information again
      - For dates, ensure they are in MM-DD-YYYY format
      - For currency values, ensure they are in number format without symbols
      - For percentages, ensure they are in number format without the % symbol
      - Never generate or assume any data - always ask the user
      - Try to calculate end date from duration and start date if both are provided
      - If start date and duration are available, add the duration (in months) to the start date to determine the end date
      - Validate that the calculated end date is after the start date
      - If either start date or duration is missing, prompt the user for the end date directly

      Your goal is to ensure the Deal object is fully populated and valid according to the schema above, while preserving existing data unless explicitly changed by the user. Always require explicit user input for any data changes or additions.
    `,
    temperature: 0.1,
    schemaName: "Deal",
    schema: DealSchema,
    schemaDescription: "The data you will be given is about the deal that the sales rep just closed.",
  });

  if (!Object.keys(deal).length && object?.companyName) {
    const createdDeal = await createDeal(chatId);
    Object.assign(deal, createdDeal);
  }

  if (object?.companyName !== deal?.companyName || !deal.companyLogo?.trim()) {
    const { data: brand, error } = await tryCatch(getBrand(object?.companyName));

    if (brand && !error) {
      Object.assign(object, { companyLogo: brand.icon });
    }
  }

  await updateDealByChatId(chatId, object);

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

export const getDealWithUserAnalytics = async (id: string) => {
  const result = await db.query.deal.findFirst({
    where: eq(deal.id, id),
    with: {
      user: {
        with: {
          accounts: true,
          deals: true,
        },
      },
    },
  });

  if (!result) {
    return null;
  }

  const {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    user: { accounts, deals, ...userData },
    ...dealData
  } = result;

  const userAccountProviders = accounts.map((account) => account.providerId);

  const closedUserDeals = result.user.deals.filter(
    (deal) =>
      Array.isArray(deal.dealContributors) &&
      deal.dealContributors.some((contributor) => contributor.stage === "Closing"),
  );

  // Deal Analytics
  const closedDealsCount = closedUserDeals.length;
  const totalEarned = closedUserDeals.reduce((total, deal) => total + Number(deal.contractValue), 0);
  const averageDealSize = closedDealsCount > 0 ? totalEarned / closedDealsCount : 0;
  const averageDealCycle = closedUserDeals.reduce((total, deal) => {
    const regexNumbersMatch = /\d+/g;
    const match = deal.salesCycleLength?.match(regexNumbersMatch) ?? 0;
    const cycleLength = match ? Number(match[0]) : 0;
    return total + cycleLength;
  }, 0);

  const analytics = {
    closedDealsCount,
    totalEarned,
    averageDealSize,
    averageDealCycle,
  };

  return {
    user: {
      ...userData,
      userAccountProviders,
    },
    deal: dealData as Deal,
    analytics,
  };
};
