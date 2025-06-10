import { defineConfig } from "drizzle-kit";

import env from "@/config/env";

import "./src/config/envConfig";

export default defineConfig({
  out: "./drizzle",
  schema: "./src/core/db/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: env.DATABASE_URL,
  },
});
