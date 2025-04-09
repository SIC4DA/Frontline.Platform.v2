import { jsonb, pgTable, text, timestamp } from "drizzle-orm/pg-core";

import { user } from "./auth";

export const message = pgTable("message", {
  id: text("id").primaryKey(),
  userId: text("user_id").references(() => user.id),
  createdAt: timestamp("created_at").notNull(),
  role: text("role").notNull(),
  content: text("content").notNull(),
  parts: jsonb("parts").notNull(),
  revisionId: text("revision_id"),
});

export const chat = pgTable("chat", {
  id: text("id").primaryKey(),
  messages: jsonb("messages").notNull(),
  createdAt: timestamp("created_at").notNull(),
});
