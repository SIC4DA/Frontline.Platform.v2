import { z } from "zod";

// Stakeholder Schema
export const StakeholderSchema = z
  .object({
    name: z.string().describe("Name of the stakeholder"),
    title: z.string().describe("Title of the stakeholder"),
  })
  .describe("Stakeholder information");

// Contributor Schema
export const ContributorSchema = z
  .object({
    name: z.string().describe("Name of the contributor"),
    title: z.string().describe("Title of the contributor"),
    shoutout: z.string().describe("Shoutout for the contributor"),
    stage: z
      .enum(["Prospecting", "Discovery", "Demo", "Negotiation", "Contracting", "Closing"])
      .describe("Stage of the deal"),
  })
  .describe("Contributor information");

// Product Info Schema
export const ProductInfoSchema = z
  .object({
    productName: z.string().describe("Name of the product"),
    productUsecases: z.string().describe("Usecases of the product"),
    painPoints: z.string().describe("Pain points of the product"),
    keyStakeholders: z.array(StakeholderSchema).default([]).describe("Stakeholders of the product"),
  })
  .describe("Product information");

// Contract Info Schema
export const ContractInfoSchema = z
  .object({
    contractValue: z.string().describe("Contract value (e.g. $500,000)"),
    contractTerm: z.string().describe("Contract term (e.g. 12 months)"),
    contractStartDate: z.string().describe("Contract start date"),
    contractEndDate: z.string().describe("Contract end date"),
    contractSigner: z.string().describe("Contract signer"),
    paymentTerms: z.string().describe("Payment terms (e.g. Net 30 days invoice)"),
  })
  .describe("Contract information");

// Company Info Schema
export const CompanyInfoSchema = z
  .object({
    companyName: z.string().describe("Name of the company"),
    companySummary: z.string().describe("Summary of the company"),
    companyIndustry: z.string().describe("Industry of the company"),
    employeeHeadcount: z.number().int().describe("Employee headcount of the company"),
    companyWebsite: z.string().describe("Website of the company"),
  })
  .describe("Company information");

// Sales Process Info Schema
export const SalesProcessInfoSchema = z
  .object({
    salesSource: z.string().describe("Sales source (e.g. Cold Email, Referral)"),
    salesCycleLength: z.string().describe("Sales cycle length (e.g. 15 months)"),
    dealContributors: z.array(ContributorSchema).default([]).describe("Contributors to the deal"),
  })
  .describe("Sales process information");

export const DealSchema = z
  .object({
    company: CompanyInfoSchema.describe("Company information"),
    contract: ContractInfoSchema.describe("Contract information"),
    product: ProductInfoSchema.describe("Product information"),
    salesProcess: SalesProcessInfoSchema.describe("Sales process information"),
  })
  .describe("Deal information");
