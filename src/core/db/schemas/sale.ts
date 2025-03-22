import { pgTable, text, timestamp } from "drizzle-orm/pg-core";

import { user } from "./auth";
import { chat } from "./chat";

export enum SalesProcessStages {
  PROSPECTING = "Prospecting",
  DISCOVERY_MEETING = "Discovery Meeting",
  PRODUCT_DEMO = "Product Demo",
  PRODUCT_EVALUATION = "Product Evaluation",
  NEGOTIATION_LEGAL = "Negotiation/Legal",
  CLOSED_WON = "Closed Won",
}

export const salesProcessStagesValues = [
  "Prospecting",
  "Discovery Meeting",
  "Product Demo",
  "Product Evaluation",
  "Negotiation/Legal",
  "Closed Won",
] as const;

export const sale = pgTable("sale", {
  id: text("id").primaryKey(),
  reportingManager: text("reporting_manager"),
  companyLogo: text("company_logo"),
  companyBannerColor: text("company_banner_color"),
  companyName: text("company_name").notNull(),
  companyOverview: text("company_overview"),
  companyIndustry: text("company_industry"),
  companySubIndustry: text("company_sub_industry"),
  buyerName: text("buyer_name").notNull(),
  buyerTitle: text("buyer_title").notNull(),
  productsSold: text("products_sold").notNull(),
  contractSize: text("contract_size").notNull(),
  contractTerm: text("contract_term").notNull(),
  contractStartDate: text("contract_start_date").notNull(),
  contractEndDate: text("contract_end_date").notNull(),
  primaryUseCases: text("primary_use_cases").notNull(),
  leadOrigination: text("lead_origination").notNull(),
  keyPurchasingReason: text("key_purchasing_reason").notNull(),
  keyCompetitors: text("key_competitors").notNull(),
  salesCycle: text("sales_cycle").notNull(),
  customerSuccess: text("customer_success").notNull(),
  accountManager: text("account_manager").notNull(),
  orientationMeetingDate: text("orientation_meeting_date").notNull(),
  customerAttendees: text("customer_attendees").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id),
  chatId: text("chat_id")
    .notNull()
    .references(() => chat.id),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
});

export const salesProcess = pgTable("sales_process", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  saleId: text("sale_id")
    .notNull()
    .references(() => sale.id, { onDelete: "cascade" }),
  stage: text("stage", { enum: salesProcessStagesValues }).notNull(),
  performerName: text("performer_name").notNull(),
  performerTitle: text("performer_title").notNull(),
  contribution: text("contribution").notNull(),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
});
