import { BetterAuthOptions } from "better-auth";

import { mapOAuthProfile } from "../utils";

import env from "@/config/env";
import { redisClient } from "@/config/redis";

export const emailAndPasswordOptions: BetterAuthOptions["emailAndPassword"] = {
  enabled: true,
  autoSignIn: true,
  requireEmailVerification: true,
  minPasswordLength: 8,
};

export const userOptions: BetterAuthOptions["user"] = {
  additionalFields: {
    companyName: { type: "string", required: true },
    companyLogo: { type: "string", required: false },
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
        email: profile.email,
        name: profile.name,
        image: profile.picture,
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
      }),
  },
  google: {
    clientId: env.GOOGLE_CLIENT_ID,
    clientSecret: env.GOOGLE_CLIENT_SECRET,
    mapProfileToUser: (profile) =>
      mapOAuthProfile({
        id: profile.sub,
        email: profile.email,
        name: profile.name,
        image: profile.picture,
      }),
  },
};

export const databaseHooksOptions: BetterAuthOptions["databaseHooks"] = {
  user: {
    create: {
      after: async (user, ctx) => {
        await ctx?.context.internalAdapter.updateUser(user.id, {
          emailVerified: true,
        });
      },
    },
  },
};
