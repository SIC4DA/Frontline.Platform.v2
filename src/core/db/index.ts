import { drizzle } from "drizzle-orm/node-postgres";

import * as schema from "./schema";

import env from "@/config/env";

export const db = drizzle(env.DATABASE_URL, { schema });

export const checkDatabaseConnection = async () => {
  await db.$client.connect((err) => {
    if (err) {
      console.error("Could not connect to database", err);
      process.exit(1);
    }
  });

  return true;
};

checkDatabaseConnection();
