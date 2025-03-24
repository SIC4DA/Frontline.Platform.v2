import { APIError } from "better-auth/api";

import type { ValidatorOptions } from "../plugins/validator/types";

import {
  forgetPasswordValidation,
  resetPasswordValidation,
  sendVerificationOtpValidation,
  signInEmailValidation,
  signUpEmailValidation,
  verifyEmailValidation,
} from "@/validations/auth";
import { t } from "elysia";

export const validatorOptions: ValidatorOptions = {
  middlewares: [
    {
      path: "/sign-up/email",
      schemas: {
        body: signUpEmailValidation,
        query: t.Object({ token: t.String() }),
      },
      async handler(ctx) {
        const tempVerification = ctx.query?.token;
        console.log(tempVerification);

        if (!tempVerification) {
          throw new APIError("BAD_REQUEST", {
            message: "Invalid or expired verification token",
          });
        }

        const verified = await ctx.context.adapter.findOne({
          model: "verification",
          where: [
            { field: "identifier", value: tempVerification, operator: "eq" },
          ],
        });

        console.log(verified);

        if (!verified) {
          throw new APIError("BAD_REQUEST", {
            message: "Invalid or expired verification token",
          });
        }

        await ctx.context.adapter.delete({
          model: "verification",
          where: [
            { field: "identifier", value: tempVerification, operator: "eq" },
          ],
        });
      },
    },
    {
      path: "/sign-in/email",
      schemas: { body: signInEmailValidation },
    },
    {
      path: "/email-otp/send-verification-otp",
      schemas: { body: sendVerificationOtpValidation },
    },
    {
      path: "/email-otp/verify-verification-otp",
      schemas: { body: verifyEmailValidation },
    },
    {
      path: "/forget-password/email-otp",
      schemas: { body: forgetPasswordValidation },
    },
    {
      path: "/email-otp/reset-password",
      schemas: { body: resetPasswordValidation },
    },
  ],
};
