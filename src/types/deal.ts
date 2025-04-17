import type { deal } from "@/core/db/schema";

type DealContributor = {
  name: string;
  title: string;
  shoutout: string;
  stage: "Prospecting" | "Discovery" | "Demo" | "Negotiation" | "Contracting" | "Closing";
};

type KeyStakeholder = {
  name: string;
  title: string;
};

export type Deal = typeof deal.$inferSelect & {
  dealContributors: DealContributor[];
  keyStakeholders: KeyStakeholder[];
};
