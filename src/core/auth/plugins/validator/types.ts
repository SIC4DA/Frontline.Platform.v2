import type { createAuthMiddleware } from "better-auth/plugins";
import type { ZodSchema } from "zod";

export type MiddlewareHandlerContext = Parameters<Parameters<typeof createAuthMiddleware>[0]>[0];

export type MiddlewareOptions = {
  path: string;
  schemas: {
    body?: ZodSchema;
    query?: ZodSchema;
    params?: ZodSchema;
  };
  handler?: (ctx: MiddlewareHandlerContext) => Promise<void> | void;
};

export type ValidatorOptions = {
  middlewares: MiddlewareOptions[];
};
