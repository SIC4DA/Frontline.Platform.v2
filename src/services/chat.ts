"use server";

import { db } from "@/core/db";
import { chat } from "@/core/db/schema";
import { eq } from "drizzle-orm";

export const createChat = async () => {
  const result = await db.insert(chat).values({}).returning({ id: chat.id });

  return result[0].id;
};

export const getChat = async (id: string) => {
  const result = await db.query.chat.findMany({
    where: eq(chat.id, id),
    with: { message: true },
  });

  return result[0]?.id;
};

export const getChats = async () => {
  const result = await db.query.chat.findMany({
    with: {
      message: true,
    },
  });

  return result.map((item) => item.id);
};

export const deleteChat = async (id: string) => {
  await db.delete(chat).where(eq(chat.id, id));
};

