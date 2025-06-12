import { relations } from "drizzle-orm";

import { account, user } from "./auth";
import { chat } from "./chat";
import { deal } from "./deal";

export const userRelations = relations(user, ({ many }) => ({
  deals: many(deal),
  chats: many(chat),
  accounts: many(account),
}));

export const accountRelations = relations(account, ({ one }) => ({
  user: one(user, {
    fields: [account.userId],
    references: [user.id],
  }),
}));
