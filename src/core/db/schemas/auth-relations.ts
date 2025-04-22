import { relations } from "drizzle-orm";

import { user } from "./auth";
import { chat } from "./chat";
import { deal } from "./deal";

export const userRelations = relations(user, ({ many }) => ({
  deals: many(deal),
  chats: many(chat),
}));
