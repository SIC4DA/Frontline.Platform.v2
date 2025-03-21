import { betterAuth } from "better-auth";

export const auth = betterAuth({
  //...
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    linkedin: {
      clientId: process.env.LINKEDIN_CLIENT_ID || "",
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET || "",
    },
  },
});
