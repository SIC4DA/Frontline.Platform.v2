import { BetterAuthOptions } from "better-auth";

import { mapOAuthProfile } from "../utils";

import env from "@/config/env";
import { redisClient } from "@/config/redis";

export const emailAndPasswordOptions: BetterAuthOptions["emailAndPassword"] = {
  enabled: true,
  autoSignIn: false,
  requireEmailVerification: true,
  minPasswordLength: 6,
};

export const userOptions: BetterAuthOptions["user"] = {
  additionalFields: {
    firstName: { type: "string", required: true },
    lastName: { type: "string", required: true },
    company: { type: "string", required: true },
  },
};

export const sessionOptions: BetterAuthOptions["session"] = {
  expiresIn: 60 * 60 * 24 * 30, // 30 days
  updateAge: 60 * 60 * 24, // 1 day
  freshAge: 60 * 60 * 24, // 1 day
  cookieCache: {
    enabled: true,
    maxAge: 60 * 60 * 24 * 1, // 1 day
  },
};

export const redisStorage: BetterAuthOptions["secondaryStorage"] = {
  get: async (key) => {
    const value = await redisClient.get(key);

    return value ? JSON.parse(value) : null;
  },
  set: async (key, value, ttl) => {
    if (ttl) await redisClient.set(key, JSON.stringify(value), { EX: ttl });
    else await redisClient.set(key, JSON.stringify(value));
  },
  delete: async (key) => {
    await redisClient.del(key);
  },
};

export const socialProvidersOptions: BetterAuthOptions["socialProviders"] = {
  linkedin: {
    clientId: env.LINKEDIN_CLIENT_ID,
    clientSecret: env.LINKEDIN_CLIENT_SECRET,
    mapProfileToUser: (profile) =>
      mapOAuthProfile({
        id: profile.sub,
        firstName: profile.given_name,
        lastName: profile.family_name,
        email: profile.email,
        name: profile.name,
        image: profile.picture,
        country: profile.locale.country,
        emailVerified: profile.email_verified,
      }),
  },
  microsoft: {
    clientId: env.MICROSOFT_CLIENT_ID,
    clientSecret: env.MICROSOFT_CLIENT_SECRET,
    tenantId: env.MICROSOFT_TENANT,
    mapProfileToUser: (profile) =>
      mapOAuthProfile({
        id: profile.sub,
        email: profile.email,
        name: profile.name,
        image: profile.picture,
        emailVerified: true,
      }),
  },
};
