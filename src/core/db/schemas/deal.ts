import { date, index, integer, jsonb, pgTable, text, varchar } from "drizzle-orm/pg-core";

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
    companyName: varchar("company_name", { length: 256 }).notNull(),
    companySummary: text("company_summary").notNull(),
    companyIndustry: varchar("company_industry", { length: 128 }).notNull(),
    employeeHeadcount: integer("employee_headcount"),
    companyWebsite: varchar("company_website", { length: 256 }).notNull(),

    // Contract Info
    contractValue: varchar("contract_value", { length: 64 }).notNull(),
    contractTerm: varchar("contract_term", { length: 64 }).notNull(),
    contractStartDate: date("contract_start_date").notNull(),
    contractEndDate: date("contract_end_date").notNull(),
    contractSigner: varchar("contract_signer", { length: 128 }).notNull(),
    paymentTerms: varchar("payment_terms", { length: 128 }).notNull(),

    // Product Info
    productName: varchar("product_name", { length: 128 }).notNull(),
    productUseCases: text("product_usecases").notNull(),
    painPoints: text("pain_points").notNull(),
    // Store an array of Stakeholder objects as JSONB
    keyStakeholders: jsonb("key_stakeholders").notNull(),

    // Sales Process Info
    salesSource: varchar("sales_source", { length: 64 }).notNull(),
    salesCycleLength: varchar("sales_cycle_length", { length: 64 }).notNull(),
    // Store an array of Contributor objects as JSONB
    dealContributors: jsonb("deal_contributors").notNull(),
  },
  (deal) => [
    index("deal_chat_id_idx").on(deal.chatId),
    index("deal_user_id_idx").on(deal.userId),
    index("deal_company_name_idx").on(deal.companyName),
  ],
);
