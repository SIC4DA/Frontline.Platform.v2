import { z } from "zod";

import type { deal } from "@/core/db/schema";
import type { DealSchema } from "@/validations/deal";

export type Deal = z.infer<typeof DealSchema> & typeof deal.$inferSelect;

export type DealContributors = Deal["dealContributors"];

export type KeyStakeholder = Deal["keyStakeholders"];

export type DealAnalytics = {
  closedDealsCount: number;
  totalEarned: number;
  averageDealSize: number;
  averageDealCycle: number;
};
