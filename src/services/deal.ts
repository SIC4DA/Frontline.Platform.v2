"user server";

import { db } from "@/core/db";
import { deal } from "@/core/db/schema";
import { auth } from "@/lib/auth";
import { and, eq } from "drizzle-orm";
import { headers } from "next/headers";

export const getDeal = async (id: string) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return undefined;
  }

  const result = await db.query.deal.findFirst({
    where: and(eq(deal.id, id), eq(deal.userId, session.user.id)),
  });

  return result?.id;
};

export const getDeals = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return undefined;
  }

  const result = await db.query.deal.findMany({
    where: eq(deal.userId, session.user.id),
  });

  return result;
};

export const createDeal = async (data: typeof deal.$inferInsert) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return undefined;
  }

  const result = await db
    .insert(deal)
    .values({ ...data, userId: session.user.id })
    .returning({ id: deal.id });

  return result[0].id;
};

export const updateDeal = async (id: string, data: Partial<Omit<typeof deal.$inferInsert, "id">>) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return undefined;
  }

  await db
    .update(deal)
    .set(data)
    .where(and(eq(deal.id, id), eq(deal.userId, session.user.id)));
};

export const deleteDeal = async (id: string) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return undefined;
  }

  await db.delete(deal).where(and(eq(deal.id, id), eq(deal.userId, session.user.id)));
};

