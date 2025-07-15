"use server";

import { and, eq } from "drizzle-orm";

import { db } from "@/core/db";
import { chat } from "@/core/db/schema";
import type { Chat, TMessage } from "@/types/chat";

import { getMe } from "./user";

export const getChat = async (id: string): Promise<Chat | undefined> => {
  const user = await getMe();

  const result = await db.query.chat.findFirst({
    where: and(eq(chat.id, id), eq(chat.userId, user.id)),
  });

  if (!result) return undefined;

  return result as Chat;
};

export const getChats = async () => {
  const user = await getMe();

  const chats = await db.query.chat.findMany({
    where: eq(chat.userId, user.id),
  });

  return chats;
};

export const createChat = async () => {
  const user = await getMe();
  const result = await db.insert(chat).values({ userId: user.id }).returning({ id: chat.id });

  return result[0].id;
};

export const updateChatMessages = async (id: string, messages: TMessage[]) => {
  const user = await getMe();

  return db
    .update(chat)
    .set({ messages })
    .where(and(eq(chat.id, id), eq(chat.userId, user.id)));
};

export const deleteChat = async (id: string) => {
  const user = await getMe();

  await db.delete(chat).where(and(eq(chat.id, id), eq(chat.userId, user.id)));
};

export const getChatHistory = async () => {
  const user = await getMe();

  const result = await db.query.chat.findMany({
    where: eq(chat.userId, user.id),
    with: {
      deal: {
        columns: {
          companyName: true,
          companyLogo: true,
        },
      },
    },
    columns: {
      userId: false,
    },
  });

  const dealsWithCompanyName = result.filter((chat) => chat.deal?.companyName);

  return dealsWithCompanyName;
};
