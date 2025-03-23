import { type BetterAuthPlugin } from "better-auth";
import { APIError } from "better-auth/api";
import { createAuthMiddleware } from "better-auth/plugins";

import { AssertError, Value } from "@sinclair/typebox/value";
import { type TSchema } from "elysia";
import type { ValidatorOptions } from "./types";

const standardValidate = async <T>(schema: TSchema, data: T) => {
  Value.Parse(["Assert"], schema, data);
};

export const validator = ({ middlewares }: ValidatorOptions) =>
  ({
    id: "validator",
    middlewares: middlewares.map(({ path, schemas, handler }) => ({
      path,
      middleware: createAuthMiddleware(async (ctx) => {
        try {
          const { body, query, params } = ctx;

          await Promise.all([
            schemas.body && standardValidate(schemas.body, body),
            schemas.query && standardValidate(schemas.query, query),
            schemas.params && standardValidate(schemas.params, params),
          ]);

          if (handler) {
            await handler(ctx);
          }
        } catch (error) {
          if (error instanceof APIError) {
            throw error;
          }

          if (error instanceof AssertError) {
            const firstError = error.Errors().First();

            const mapError = {
              code:
                firstError?.message.toUpperCase().split(" ").join("_") ||
                "BAD_REQUEST",
              message:
                (firstError?.schema.error as string) || "Invalid request",
              path: firstError?.path,
            };

            throw new APIError("BAD_REQUEST", mapError);
          }
        }
      }),
    })),
  }) as BetterAuthPlugin;
