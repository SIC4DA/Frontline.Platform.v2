import { pgTable, text, timestamp, unique, boolean, foreignKey, index, uuid, jsonb, integer, doublePrecision } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const verification = pgTable("verification", {
	id: text().primaryKey().notNull(),
	identifier: text().notNull(),
	value: text().notNull(),
	expiresAt: timestamp("expires_at", { mode: 'string' }).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }),
	updatedAt: timestamp("updated_at", { mode: 'string' }),
});

export const user = pgTable("user", {
	id: text().primaryKey().notNull(),
	name: text().notNull(),
	email: text().notNull(),
	emailVerified: boolean("email_verified").notNull(),
	image: text(),
	createdAt: timestamp("created_at", { mode: 'string' }).notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).notNull(),
	role: text(),
	banned: boolean(),
	banReason: text("ban_reason"),
	banExpires: timestamp("ban_expires", { mode: 'string' }),
	username: text(),
	displayUsername: text("display_username"),
	bio: text(),
	companyName: text("company_name").notNull(),
	companyLogo: text("company_logo"),
}, (table) => [
	unique("user_email_unique").on(table.email),
	unique("user_username_unique").on(table.username),
]);

export const account = pgTable("account", {
	id: text().primaryKey().notNull(),
	accountId: text("account_id").notNull(),
	providerId: text("provider_id").notNull(),
	userId: text("user_id").notNull(),
	accessToken: text("access_token"),
	refreshToken: text("refresh_token"),
	idToken: text("id_token"),
	accessTokenExpiresAt: timestamp("access_token_expires_at", { mode: 'string' }),
	refreshTokenExpiresAt: timestamp("refresh_token_expires_at", { mode: 'string' }),
	scope: text(),
	password: text(),
	createdAt: timestamp("created_at", { mode: 'string' }).notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).notNull(),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [user.id],
			name: "account_user_id_user_id_fk"
		}).onDelete("cascade"),
]);

export const chat = pgTable("chat", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	userId: text("user_id"),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	index("chat_user_id_idx").using("btree", table.userId.asc().nullsLast().op("text_ops")),
	foreignKey({
			columns: [table.userId],
			foreignColumns: [user.id],
			name: "chat_user_id_user_id_fk"
		}).onDelete("cascade"),
]);

export const message = pgTable("message", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	userId: text("user_id"),
	chatId: uuid("chat_id"),
	role: text().notNull(),
	content: text().notNull(),
	parts: jsonb(),
	revisionId: text("revision_id"),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	index("chat_id_idx").using("btree", table.chatId.asc().nullsLast().op("uuid_ops")),
	foreignKey({
			columns: [table.userId],
			foreignColumns: [user.id],
			name: "message_user_id_user_id_fk"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.chatId],
			foreignColumns: [chat.id],
			name: "message_chat_id_chat_id_fk"
		}).onDelete("cascade"),
]);

export const deal = pgTable("deal", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	chatId: uuid("chat_id").notNull(),
	userId: text("user_id").notNull(),
	companyName: text("company_name"),
	companyLogo: text("company_logo"),
	companySummary: text("company_summary"),
	companyIndustry: text("company_industry"),
	employeeHeadcount: integer("employee_headcount"),
	companyWebsite: text("company_website"),
	contractValue: doublePrecision("contract_value"),
	contractTerm: text("contract_term"),
	contractStartDate: text("contract_start_date"),
	contractEndDate: text("contract_end_date"),
	contractSigner: text("contract_signer"),
	paymentTerms: text("payment_terms"),
	productName: text("product_name"),
	productUsecases: text("product_usecases"),
	painPoints: text("pain_points"),
	keyStakeholders: jsonb("key_stakeholders"),
	salesSource: text("sales_source"),
	salesCycleLength: text("sales_cycle_length"),
	dealContributors: jsonb("deal_contributors"),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	index("deal_chat_id_idx").using("btree", table.chatId.asc().nullsLast().op("uuid_ops")),
	index("deal_company_name_idx").using("btree", table.companyName.asc().nullsLast().op("text_ops")),
	index("deal_user_id_idx").using("btree", table.userId.asc().nullsLast().op("text_ops")),
	foreignKey({
			columns: [table.chatId],
			foreignColumns: [chat.id],
			name: "deal_chat_id_chat_id_fk"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.userId],
			foreignColumns: [user.id],
			name: "deal_user_id_user_id_fk"
		}).onDelete("cascade"),
]);
