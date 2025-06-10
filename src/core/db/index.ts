import { drizzle } from "drizzle-orm/node-postgres";

import env from "@/config/env";
import logger from "@/services/logger";

import * as schema from "./schema";

export const db = drizzle(env.DATABASE_URL, { schema });

export const checkDatabaseConnection = async () => {
  let isConnected = true;

  await db.$client.connect((err) => {
    if (err) {
      isConnected = false;
      logger.error("Could not connect to database", err);
      process.exit(1);
    }
  });

  return isConnected;
};

checkDatabaseConnection();
