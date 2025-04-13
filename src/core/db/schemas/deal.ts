import { date, index, integer, jsonb, pgTable, text } from "drizzle-orm/pg-core";

import { relations } from "drizzle-orm";
import { randomUUID } from "node:crypto";
import { user } from "./auth";
import { chat } from "./chat";

export const deal = pgTable(
  "deals",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => randomUUID()),
    chatId: text("chat_id")
      .notNull()
      .references(() => chat.id, { onDelete: "cascade" }),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),

    // Company Info
    companyName: text("company_name").notNull(),
    companySummary: text("company_summary").notNull(),
    companyIndustry: text("company_industry").notNull(),
    employeeHeadcount: integer("employee_headcount"),
    companyWebsite: text("company_website").notNull(),

    // Contract Info
    contractValue: text("contract_value").notNull(),
    contractTerm: text("contract_term").notNull(),
    contractStartDate: date("contract_start_date").notNull(),
    contractEndDate: date("contract_end_date").notNull(),
    contractSigner: text("contract_signer").notNull(),
    paymentTerms: text("payment_terms").notNull(),

    // Product Info
    productName: text("product_name").notNull(),
    productUseCases: text("product_usecases").notNull(),
    painPoints: text("pain_points").notNull(),
    // Store an array of Stakeholder objects as JSONB
    keyStakeholders: jsonb("key_stakeholders").notNull(),

    // Sales Process Info
    salesSource: text("sales_source").notNull(),
    salesCycleLength: text("sales_cycle_length").notNull(),
    // Store an array of Contributor objects as JSONB
    dealContributors: jsonb("deal_contributors").notNull(),
  },
  (deal) => [
    index("deal_chat_id_idx").on(deal.chatId),
    index("deal_user_id_idx").on(deal.userId),
    index("deal_company_name_idx").on(deal.companyName),
  ],
);

export const dealRelations = relations(deal, ({ one }) => ({
  user: one(user, {
    fields: [deal.userId],
    references: [user.id],
  }),
  chat: one(chat, {
    fields: [deal.chatId],
    references: [chat.id],
  }),
}));
