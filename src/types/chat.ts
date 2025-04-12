import { chat, message } from "@/core/db/schema";

export type chat = typeof chat.$inferSelect & {
  messages: (typeof message.$inferSelect)[];
};

