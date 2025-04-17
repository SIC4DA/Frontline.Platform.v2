"use server";

import { db } from "@/core/db";
import { chat, message } from "@/core/db/schema";
import { Chat } from "@/types/chat";
import { and, eq } from "drizzle-orm";
import { getMe } from "./user";

export const getChat = async (id: string): Promise<Chat | undefined> => {
  const user = await getMe();

  const result = await db.query.chat.findFirst({
    where: and(eq(chat.id, id), eq(chat.userId, user.id)),
  });

  if (!result) return undefined;

  const messages = await db.query.message.findMany({
    where: eq(message.chatId, id),
  });

  return { ...result, messages } as Chat;
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
  const result = await db.insert(chat).values({ userId: user?.id }).returning({ id: chat.id });

  return result[0].id;
};

export const createMessage = async (
  chatId: string,
  data: Omit<typeof message.$inferInsert, "userId" | "chatId" | "id" | "createdAt">,
) => {
  const user = await getMe();

  const result = await db
    .insert(message)
    .values({ ...data, userId: user.id, chatId })
    .returning({ id: message.id })
    .onConflictDoNothing();

  return result[0].id;
};

export const updateChat = async (id: string, data: Partial<Omit<typeof chat.$inferInsert, "id" | "userId">>) => {
  const user = await getMe();

  return db
    .update(chat)
    .set(data)
    .where(and(eq(chat.id, id), eq(chat.userId, user.id)));
};

export const updateChatMessages = async (
  id: string,
  messages: Omit<typeof message.$inferInsert, "userId" | "chatId">[],
) => {
  const user = await getMe();

  await Promise.all(
    messages.map(async (msg) => {
      await db
        .insert(message)
        .values({ ...msg, chatId: id, userId: user.id })
        .onConflictDoNothing();
    }),
  );
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

  return result;
};
