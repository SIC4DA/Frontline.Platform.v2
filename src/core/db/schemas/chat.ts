import { index, jsonb, pgTable, text, timestamp } from "drizzle-orm/pg-core";

import { relations } from "drizzle-orm";
import { randomUUID } from "node:crypto";
import { user } from "./auth";
import { deal } from "./deal";

export const message = pgTable(
  "message",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => randomUUID()),
    userId: text("user_id").references(() => user.id, { onDelete: "cascade" }),
    chatId: text("chat_id").references(() => chat.id, { onDelete: "cascade" }),
    role: text("role", {
      enum: ["data", "user", "system", "assistant"],
    }).notNull(),
    content: text("content").notNull(),
    parts: jsonb("parts"),
    revisionId: text("revision_id"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (message) => [index("chat_id_idx").on(message.chatId)],
);

export const messageRelations = relations(message, ({ one }) => ({
  user: one(user, {
    fields: [message.userId],
    references: [user.id],
  }),
  chat: one(chat, {
    fields: [message.chatId],
    references: [chat.id],
  }),
}));

export const chat = pgTable(
  "chat",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => randomUUID()),
    userId: text("user_id").references(() => user.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (chat) => [index("chat_user_id_idx").on(chat.userId)],
);

export const chatRelations = relations(chat, ({ one, many }) => ({
  messages: many(message),
  user: one(user, {
    fields: [chat.userId],
    references: [user.id],
  }),
  deal: one(deal, {
    fields: [chat.id],
    references: [deal.chatId],
  }),
}));
