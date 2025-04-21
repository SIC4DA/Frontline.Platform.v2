import { Message } from "ai";

import { chat, message } from "@/core/db/schema";

export type TMessage = typeof message.$inferSelect & {
  parts: Message["parts"];
};

export type Chat = typeof chat.$inferSelect & {
  messages: TMessage[];
};

export type ChatHistory = typeof chat.$inferSelect & {
  deal: {
    companyName: string;
    companyLogo: string;
  };
};
