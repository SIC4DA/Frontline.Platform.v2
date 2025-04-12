"use server";

import { db } from "@/core/db";
import { chat } from "@/core/db/schema";
import { and, eq } from "drizzle-orm";
import { getMe } from "./user";

export const getChat = async (id: string) => {
  const user = await getMe();

  const result = await db.query.chat.findFirst({
    where: and(eq(chat.id, id), eq(chat.userId, user?.id)),
    with: {
      message: true,
    },
  });

  return result?.id;
};

export const getChats = async () => {
  const user = await getMe();

  const result = await db.query.chat.findMany({
    with: {
      message: true,
    },
    where: eq(chat.userId, user.id),
  });

  return result.map((item) => item.id);
};

export const createChat = async () => {
  const user = await getMe();
  const result = await db.insert(chat).values({ userId: user?.id }).returning({ id: chat.id });

  return result[0].id;
};

export const updateChat = async (id: string, data: Partial<Omit<typeof chat.$inferInsert, "id" | "userId">>) => {
  const user = await getMe();

  await db
    .update(chat)
    .set(data)
    .where(and(eq(chat.id, id), eq(chat.userId, user.id)));
};

export const deleteChat = async (id: string) => {
  const user = await getMe();

  await db.delete(chat).where(and(eq(chat.id, id), eq(chat.userId, user.id)));
};

