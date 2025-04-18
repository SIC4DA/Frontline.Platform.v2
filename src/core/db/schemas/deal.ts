import { doublePrecision, index, integer, jsonb, pgTable, text, timestamp } from "drizzle-orm/pg-core";

import { relations } from "drizzle-orm";
import { randomUUID } from "node:crypto";
import { user } from "./auth";
import { chat } from "./chat";

export const deal = pgTable(
  "deal",
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
    companyName: text("company_name"),
    companyLogo: text("company_logo"),
    companySummary: text("company_summary"),
    companyIndustry: text("company_industry"),
    employeeHeadcount: integer("employee_headcount"),
    companyWebsite: text("company_website"),

    // Contract Info
    contractValue: doublePrecision("contract_value"),
    contractTerm: text("contract_term"),
    contractStartDate: text("contract_start_date"),
    contractEndDate: text("contract_end_date"),
    contractSigner: text("contract_signer"),
    paymentTerms: text("payment_terms"),

    // Product Info
    productName: text("product_name"),
    productUseCases: text("product_usecases"),
    painPoints: text("pain_points"),
    // Store an array of Stakeholder objects as JSONB
    keyStakeholders: jsonb("key_stakeholders"),

    // Sales Process Info
    salesSource: text("sales_source"),
    salesCycleLength: text("sales_cycle_length"),
    // Store an array of Contributor objects as JSONB
    dealContributors: jsonb("deal_contributors"),

    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
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
