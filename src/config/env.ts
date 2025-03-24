import { z } from "zod";

const EnvSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]),

  APP_ORIGIN: z.string(),
  PUBLIC_APP_ORIGIN: z.string(),

  NEXT_BASE_URL: z.string(),
  NEXT_PUBLIC_BASE_URL: z.string(),

  DATABASE_URL: z.string(),

  BETTER_AUTH_SECRET: z.string(),
  BETTER_AUTH_URL: z.string(),

  SMTP_URL: z.string(),
  SMTP_FROM: z.string(),

  REDIS_URL: z.string(),

  LINKEDIN_CLIENT_ID: z.string(),
  LINKEDIN_CLIENT_SECRET: z.string(),

  MICROSOFT_CLIENT_ID: z.string(),
  MICROSOFT_CLIENT_SECRET: z.string(),
  MICROSOFT_TENANT: z.string(),

  GOOGLE_CLIENT_ID: z.string(),
  GOOGLE_CLIENT_SECRET: z.string(),

  SLACK_CLIENT_ID: z.string(),
  SLACK_CLIENT_SECRET: z.string(),
  SLACK_SIGNING_SECRET: z.string(),

  GEMINI_API_KEY: z.string(),

  CLOUDINARY_NAME: z.string(),
  CLOUDINARY_API_KEY: z.string(),
  CLOUDINARY_API_SECRET: z.string(),
});

const { error, data } = EnvSchema.safeParse(process.env);

if (error) {
  const errors = error.issues.map((err) => `${err.path} ${err.message}`);

  console.error(`Config validation error: ${JSON.stringify(errors, null, 2)}`);
  process.exit(1);
}

const env = data;
export default env;
