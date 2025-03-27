type Env = {
  NODE_ENV: "development" | "production" | "test";

  APP_ORIGIN: string;
  PUBLIC_APP_ORIGIN: string;

  NEXT_BASE_URL: string;
  NEXT_PUBLIC_BASE_URL: string;

  DATABASE_URL: string;

  BETTER_AUTH_SECRET: string;
  BETTER_AUTH_URL: string;

  SMTP_URL: string;
  SMTP_FROM: string;

  REDIS_URL: string;

  LINKEDIN_CLIENT_ID: string;
  LINKEDIN_CLIENT_SECRET: string;

  MICROSOFT_CLIENT_ID: string;
  MICROSOFT_CLIENT_SECRET: string;
  MICROSOFT_TENANT: string;

  GOOGLE_CLIENT_ID: string;
  GOOGLE_CLIENT_SECRET: string;

  SLACK_CLIENT_ID: string;
  SLACK_CLIENT_SECRET: string;
  SLACK_SIGNING_SECRET: string;

  GEMINI_API_KEY: string;

  CLOUDINARY_NAME: string;
  CLOUDINARY_API_KEY: string;
  CLOUDINARY_API_SECRET: string;
};

const env = process?.env as Env;
export default env;
