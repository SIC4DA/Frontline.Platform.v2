import { z } from "zod";

// Stakeholder Schema
export const StakeholderSchema = z.object({
  name: z.string(),
  title: z.string(),
});

// Contributor Schema
export const ContributorSchema = z.object({
  name: z.string(),
  title: z.string(),
  shoutout: z.string(),
  stage: z.enum(["Prospecting", "Discovery", "Demo", "Negotiation", "Contracting", "Closing", "Other"]),
});

// Product Info Schema
export const ProductInfoSchema = z.object({
  productName: z.string(),
  productUsecases: z.string(),
  painPoints: z.string(),
  keyStakeholders: z.array(StakeholderSchema).default([]),
});

// Contract Info Schema
export const ContractInfoSchema = z.object({
  contractValue: z.string(), // e.g. "$500,000"
  contractTerm: z.string(), // e.g. "12 months"
  contractStartDate: z.string(), // Consider refining with a date parser if needed
  contractEndDate: z.string(),
  contractSigner: z.string(), // e.g. "Phil Knight, Founder & CEO"
  paymentTerms: z.string(), // e.g. "Net 30 days invoice"
});

// Company Info Schema
export const CompanyInfoSchema = z.object({
  companyName: z.string(),
  companySummary: z.string(),
  companyIndustry: z.string(),
  employeeHeadcount: z.union([z.number(), z.string()]),
  companyWebsite: z.string().url(),
});

// Sales Process Info Schema
export const SalesProcessInfoSchema = z.object({
  salesSource: z.string(), // e.g. "Cold Email", "Referral"
  salesCycleLength: z.string(), // e.g. "15 months"
  dealContributors: z.array(ContributorSchema).default([]),
});

export const DealSchema = z.object({
  company: CompanyInfoSchema,
  contract: ContractInfoSchema,
  product: ProductInfoSchema,
  salesProcess: SalesProcessInfoSchema,
});
