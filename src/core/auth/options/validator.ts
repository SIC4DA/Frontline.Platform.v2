import { APIError } from "better-auth/api";
import { z } from "zod";

import type { ValidatorOptions } from "../plugins/validator/types";

import { signUpEmailValidation } from "@/validations/auth";

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
