import env from "@/config/env";
import { genericOAuth } from "better-auth/plugins";
import { mapOAuthProfile } from "../utils";

export const genericOAuthOptions: Parameters<typeof genericOAuth>[0] = {
  config: [
    {
      providerId: "slack",
      clientId: env.SLACK_CLIENT_ID,
      clientSecret: env.SLACK_CLIENT_SECRET,
      authorizationUrl: "https://slack.com/oauth/v2/authorize",
      tokenUrl: "https://slack.com/api/oauth.v2.access",
      scopes: ["openid", "profile", "email"],
      discoveryUrl: "https://slack.com/.well-known/openid-configuration",
      mapProfileToUser: (profile) =>
        mapOAuthProfile({
          id: profile.sub,
          username: profile.name,
          email: profile.email,
          name: profile.name,
          image: profile.picture,
          emailVerified: profile.email_verified,
          company: "",
        }),
    },
  ],
};
