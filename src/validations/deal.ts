import { z } from "zod";

// Stakeholder Schema
export const StakeholderSchema = z
  .object({
    name: z.string().optional().default("").describe("Name of the stakeholder"),
    title: z.string().optional().default("").describe("Title of the stakeholder"),
  })
  .describe("Stakeholder information");

// Contributor Schema
export const ContributorSchema = z
  .object({
    name: z.string().optional().default("").describe("Name of the contributor"),
    title: z.string().optional().default("").describe("Title of the contributor"),
    shoutout: z.string().optional().default("").describe("Shoutout for the contributor"),
    stage: z
      .enum(["Prospecting", "Discovery", "Demo", "Negotiation", "Contracting", "Closing"])
      .optional()
      .default("Prospecting")
      .describe("Stage of the deal"),
  })
  .describe("Contributor information");

// Product Info Schema
export const ProductInfoSchema = z
  .object({
    productName: z.string().optional().default("").describe("Name of the product"),
    productUseCases: z.string().optional().default("").describe("UseCases of the product"),
    painPoints: z.string().optional().default("").describe("Pain points of the product"),
    keyStakeholders: z.array(StakeholderSchema).optional().default([]).describe("Stakeholders of the product"),
  })
  .describe("Product information");

// Contract Info Schema
export const ContractInfoSchema = z
  .object({
    contractValue: z.number().optional().default(0).describe("Contract value (e.g. $500,000)"),
    contractTerm: z.string().optional().default("").describe("Contract term (e.g. 12 months)"),
    contractStartDate: z.string().optional().default("").describe("Contract start date"),
    contractEndDate: z.string().optional().default("").describe("Contract end date"),
    contractSigner: z.string().optional().default("").describe("Contract signer"),
    paymentTerms: z.string().optional().default("").describe("Payment terms (e.g. Net 30 days invoice)"),
  })
  .describe("Contract information");

// Company Info Schema
export const CompanyInfoSchema = z
  .object({
    companyName: z.string().optional().default("").describe("Name of the company"),
    companyLogo: z.string().optional().default("").describe("Logo of the company"),
    companySummary: z.string().optional().default("").describe("Summary of the company"),
    companyIndustry: z.string().optional().default("").describe("Industry of the company"),
    employeeHeadcount: z.number().int().optional().default(0).describe("Employee headcount of the company"),
    companyWebsite: z.string().optional().default("").describe("Website of the company"),
  })
  .describe("Company information");

// Sales Process Info Schema
export const SalesProcessInfoSchema = z
  .object({
    salesSource: z.string().optional().default("").describe("Sales source (e.g. Cold Email, Referral)"),
    salesCycleLength: z.string().optional().default("").describe("Sales cycle length (e.g. 15 months)"),
    dealContributors: z.array(ContributorSchema).optional().default([]).describe("Contributors to the deal"),
  })
  .describe("Sales process information");

export const DealSchema = z
  .object({
    company: CompanyInfoSchema.optional().default({}).describe("Company information"),
    contract: ContractInfoSchema.optional().default({}).describe("Contract information"),
    product: ProductInfoSchema.optional().default({}).describe("Product information"),
    salesProcess: SalesProcessInfoSchema.optional().default({}).describe("Sales process information"),
  })
  .describe("Deal information");
