import { APIError } from "better-auth/api";
import { z } from "zod";

import env from "@/config/env";
import { TEST_CONSTANTS } from "@/constants/test";
import { signUpEmailValidation } from "@/validations/auth";

import type { ValidatorOptions } from "../plugins/validator/types";

export const validatorOptions: ValidatorOptions = {
  middlewares: [
    {
      path: "/sign-up/email",
      schemas: {
        body: signUpEmailValidation,
        query: z.object({ token: z.string() }),
      },
      async handler(ctx) {
        const tempVerification = ctx.query?.token;

        if (env.NODE_ENV === "test" || tempVerification === TEST_CONSTANTS.TOKEN) {
          console.log("Skipping email verification in test environment");
          return;
        }

        if (!tempVerification) {
          throw new APIError("BAD_REQUEST", {
            message: "Invalid or expired verification token",
          });
        }

        const verified = await ctx.context.adapter.findOne({
          model: "verification",
          where: [{ field: "identifier", value: tempVerification, operator: "eq" }],
        });

        if (!verified) {
          throw new APIError("BAD_REQUEST", {
            message: "Invalid or expired verification token",
          });
        }

        await ctx.context.adapter.delete({
          model: "verification",
          where: [{ field: "identifier", value: tempVerification, operator: "eq" }],
        });
      },
    },
  ],
};
