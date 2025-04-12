import type { deal } from "@/core/db/schema";

export type Deal = typeof deal.$inferSelect;
