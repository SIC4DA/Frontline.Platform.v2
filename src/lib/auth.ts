import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { admin, genericOAuth, openAPI, username } from "better-auth/plugins";

import {
  databaseHooksOptions,
  emailAndPasswordOptions,
  redisStorage,
  sessionOptions,
  socialProvidersOptions,
  userOptions,
} from "@/core/auth/options/better-auth";
import { companyEmailOptions } from "@/core/auth/options/company-email";
import { genericOAuthOptions } from "@/core/auth/options/generic-oauth";
import { validatorOptions } from "@/core/auth/options/validator";
import { companyEmail } from "@/core/auth/plugins/company-email";
import { validator } from "@/core/auth/plugins/validator";
import { db } from "@/core/db";
import * as schema from "@/core/db/schema";
import { randomUUID } from "node:crypto";

export const auth = betterAuth({
  appName: "Frontline",
  database: drizzleAdapter(db, {
    provider: "pg",
    schema,
  }),
  advanced: {
    database: {
      generateId: () => randomUUID(),
    },
  },
  emailAndPassword: emailAndPasswordOptions,
  user: userOptions,
  session: sessionOptions,
  secondaryStorage: redisStorage,
  socialProviders: socialProvidersOptions,
  databaseHooks: databaseHooksOptions,
  plugins: [
    admin(),
    username(),
    validator(validatorOptions),
    companyEmail(companyEmailOptions),
    openAPI(),
    genericOAuth(genericOAuthOptions),
    nextCookies(), // must be last
  ],
});
