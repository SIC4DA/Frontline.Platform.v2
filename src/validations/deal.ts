import { z } from "zod";

export const DealSchema = z
  .object({
    // Company Info
    companyName: z.string().optional().default("").describe("Name of the company"),
    companySummary: z.string().optional().default("").describe("Summary of the company"),
    companyIndustry: z.string().optional().default("").describe("Industry of the company"),
    employeeHeadcount: z
      .number()
      .int()
      .max(1000000000)
      .optional()
      .default(0)
      .describe("Employee headcount of the company"),
    companyWebsite: z.string().optional().default("").describe("Website of the company"),

    // Contract Info
    contractValue: z.number().max(1000000000).optional().default(0).describe("Contract value (e.g. $500,000)"),
    contractTerm: z.string().optional().default("").describe("Contract term (e.g. 12 months)"),
    contractStartDate: z.string().optional().default("").describe("Contract start date"),
    contractEndDate: z.string().optional().default("").describe("Contract end date"),
    contractSigner: z.string().optional().default("").describe("Contract signer"),
    paymentTerms: z.string().optional().default("").describe("Payment terms (e.g. Net 30 days invoice)"),

    // Product Info
    productName: z.string().optional().default("").describe("Name of the product"),
    productUseCases: z.string().optional().default("").describe("UseCases of the product"),
    painPoints: z.string().optional().default("").describe("Pain points of the product"),
    keyStakeholders: z
      .array(
        z.object({
          name: z.string().optional().default("").describe("Name of the stakeholder"),
          title: z.string().optional().default("").describe("Title of the stakeholder"),
        }),
      )
      .optional()
      .default([])
      .describe("Stakeholders of the product"),

    // Sales Process Info
    salesSource: z.string().optional().default("").describe("Sales source (e.g. Cold Email, Referral)"),
    salesCycleLength: z.string().optional().default("").describe("Sales cycle length (e.g. 15 months)"),
    dealContributors: z
      .array(
        z.object({
          name: z.string().optional().default("").describe("Name of the contributor"),
          title: z.string().optional().default("").describe("Title of the contributor"),
          shoutout: z.string().optional().default("").describe("Shoutout for the contributor"),
          stage: z
            .enum(["Prospecting", "Discovery", "Demo", "Negotiation", "Contracting", "Closing"])
            .optional()
            .default("Prospecting")
            .describe("Stage of the deal"),
        }),
      )
      .optional()
      .default([])
      .describe("Contributors to the deal"),
  })
  .describe("Deal information");
