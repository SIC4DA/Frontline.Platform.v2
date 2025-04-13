"user server";

import { db } from "@/core/db";
import { deal } from "@/core/db/schema";
import { and, eq } from "drizzle-orm";
import { getMe } from "./user";

export const getDeal = async (id: string) => {
  const user = await getMe();

  const result = await db.query.deal.findFirst({
    where: and(eq(deal.id, id), eq(deal.userId, user.id)),
  });

  return result;
};

export const getDeals = async () => {
  const user = await getMe();

  const result = await db.query.deal.findMany({
    where: eq(deal.userId, user.id),
  });

  return result;
};

export const createDeal = async (data: Omit<typeof deal.$inferInsert, "id" | "userId">) => {
  const user = await getMe();

  const result = await db
    .insert(deal)
    .values({ ...data, userId: user.id })
    .returning({ id: deal.id })
    .onConflictDoUpdate({
      target: deal.id,
      set: { ...data, userId: user.id },
    });

  return result[0].id;
};

export const updateDeal = async (id: string, data: Partial<Omit<typeof deal.$inferInsert, "id" | "userId">>) => {
  const user = await getMe();

  return db
    .update(deal)
    .set(data)
    .where(and(eq(deal.id, id), eq(deal.userId, user.id)));
};

export const deleteDeal = async (id: string) => {
  const user = await getMe();

  await db.delete(deal).where(and(eq(deal.id, id), eq(deal.userId, user.id)));
};

