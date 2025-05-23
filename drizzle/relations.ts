import { relations } from "drizzle-orm/relations";
import { user, account, chat, message, deal } from "./schema";

export const accountRelations = relations(account, ({one}) => ({
	user: one(user, {
		fields: [account.userId],
		references: [user.id]
	}),
}));

export const userRelations = relations(user, ({many}) => ({
	accounts: many(account),
	chats: many(chat),
	messages: many(message),
	deals: many(deal),
}));

export const chatRelations = relations(chat, ({one, many}) => ({
	user: one(user, {
		fields: [chat.userId],
		references: [user.id]
	}),
	messages: many(message),
	deals: many(deal),
}));

export const messageRelations = relations(message, ({one}) => ({
	user: one(user, {
		fields: [message.userId],
		references: [user.id]
	}),
	chat: one(chat, {
		fields: [message.chatId],
		references: [chat.id]
	}),
}));

export const dealRelations = relations(deal, ({one}) => ({
	chat: one(chat, {
		fields: [deal.chatId],
		references: [chat.id]
	}),
	user: one(user, {
		fields: [deal.userId],
		references: [user.id]
	}),
}));