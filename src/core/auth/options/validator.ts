import { APIError } from "better-auth/api";
import type { ValidatorOptions } from "validator-better-auth";

import {
  forgetPasswordValidation,
  resetPasswordValidation,
  sendVerificationOtpValidation,
  signInEmailValidation,
  signUpEmailValidation,
  verifyEmailValidation,
} from "@/validations/auth";

export const validatorOptions: ValidatorOptions = {
  middlewares: [
    {
      path: "/sign-up/email",
      schemas: { body: signUpEmailValidation },
      async handler(ctx) {
        const tempVerification = ctx.getCookie("temp-verification");

        if (!tempVerification) {
          throw new APIError("BAD_REQUEST", {
            message: "Invalid or expired verification token",
          });
        }

        const verified = await ctx.context.adapter.findOne({
          model: "verification",
          where: [
            {
              field: "identifier",
              value: tempVerification,
              operator: "eq",
            },
          ],
        });

        if (!verified) {
          throw new APIError("BAD_REQUEST", {
            message: "Invalid or expired verification token",
          });
        }

        await ctx.context.adapter.delete({
          model: "verification",
          where: [
            {
              field: "identifier",
              value: tempVerification,
              operator: "eq",
            },
          ],
        });

        ctx.setCookie("temp-verification", tempVerification, {
          httpOnly: true,
          secure: true,
          sameSite: "strict",
          path: "/",
          expires: new Date(new Date().setSeconds(0)), // 0 seconds
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
