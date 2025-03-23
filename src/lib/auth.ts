import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { admin, emailOTP, openAPI } from "better-auth/plugins";
import { companyEmail } from "company-email-better-auth";

import {
  emailAndPasswordOptions,
  redisStorage,
  sessionOptions,
  socialProvidersOptions,
  userOptions,
} from "@/core/auth/options/better-auth";
import { companyEmailOptions } from "@/core/auth/options/company-email";
import { emailOTPOptions } from "@/core/auth/options/email-otp";
import { validatorOptions } from "@/core/auth/options/validator";
import { validator } from "@/core/auth/plugins/validator";
import { db } from "@/core/db";
import * as schema from "@/core/db/schema";

export const auth = betterAuth({
  appName: "Frontline",
  database: drizzleAdapter(db, {
    provider: "pg",
    schema,
  }),
  emailAndPassword: emailAndPasswordOptions,
  user: userOptions,
  session: sessionOptions,
  secondaryStorage: redisStorage,
  socialProviders: socialProvidersOptions,
  plugins: [
    emailOTP(emailOTPOptions),
    admin({ defaultRole: "user" }),
    validator(validatorOptions),
    companyEmail(companyEmailOptions),
    openAPI(),
  ],
});
