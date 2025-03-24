import env from "@/config/env";
import { genericOAuth } from "better-auth/plugins";

export const genericOAuthOptions: Parameters<typeof genericOAuth>[0] = {
  config: [
    {
      providerId: "slack",
      clientId: env.SLACK_CLIENT_ID,
      clientSecret: env.SLACK_CLIENT_SECRET,
      authorizationUrl: "https://slack.com/oauth/v2/authorize",
      tokenUrl: "https://slack.com/api/oauth.v2.access",
      scopes: ["users:read", "users:read.email"],
    },
  ],
};
