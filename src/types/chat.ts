import { Message } from "ai";

import { chat } from "@/core/db/schema";

export type TMessage = Message;

export type Chat = typeof chat.$inferSelect & {
  messages: TMessage[];
};

export type ChatHistory = typeof chat.$inferSelect & {
  deal: {
    companyName: string;
    companyLogo: string;
  };
};
