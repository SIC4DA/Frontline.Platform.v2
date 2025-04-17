import { user } from "@/core/db/schema";

export type User = typeof user.$inferSelect;
