import type { createAuthMiddleware } from "better-auth/plugins";
import type { TSchema } from "elysia";

export type MiddlewareHandlerContext = Parameters<
  Parameters<typeof createAuthMiddleware>[0]
>[0];

export type MiddlewareOptions = {
  path: string;
  schemas: {
    body?: TSchema;
    query?: TSchema;
    params?: TSchema;
  };
  handler?: (ctx: MiddlewareHandlerContext) => void;
};

export type ValidatorOptions = {
  middlewares: MiddlewareOptions[];
};
