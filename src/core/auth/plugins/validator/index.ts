import { type BetterAuthPlugin } from "better-auth";
import { APIError } from "better-auth/api";
import { createAuthMiddleware } from "better-auth/plugins";

import { type ZodSchema } from "zod";
import type { ValidatorOptions } from "./types";

const standardValidate = async <T>(schema: ZodSchema, data: T) => {
  const result = schema.safeParse(data);

  if (!result.success) {
    const firstError = result.error.issues[0];

    throw new APIError("BAD_REQUEST", {
      message: firstError.message,
      code: firstError.code,
    });
  }
};

export const validator = ({ middlewares }: ValidatorOptions) =>
  ({
    id: "validator",
    hooks: {
      before: middlewares.map(({ path, schemas, handler }) => ({
        matcher: (ctx) => ctx.path === path,
        handler: createAuthMiddleware(async (ctx) => {
          try {
            const { body, query, params } = ctx;

            await Promise.all([
              schemas.body && standardValidate(schemas.body, body),
              schemas.query && standardValidate(schemas.query, query),
              schemas.params && standardValidate(schemas.params, params),
            ]);

            await handler?.(ctx);
          } catch (error) {
            console.dir(error, { depth: null });

            if (error instanceof APIError) {
              throw error;
            }

            throw new APIError("BAD_REQUEST", {
              message: "Invalid request",
              error: JSON.stringify(error),
            });
          }
        }),
      })),
    },
  }) satisfies BetterAuthPlugin;
