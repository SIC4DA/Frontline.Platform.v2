import type { BetterAuthPlugin } from "better-auth";
import { APIError } from "better-auth/api";
import { generateRandomString } from "better-auth/crypto";
import { createAuthEndpoint } from "better-auth/plugins";
import CompanyEmailValidator from "company-email-validator";

import {
  checkCompanyEmailMetadata,
  sendEmailVerificationMetadata,
  verifyEmailMetadata,
} from "./metadata";
import type { CompanyEmailOptions } from "./types";
import {
  checkCompanyEmailValidation,
  sendCompanyEmailVerificationValidation,
  verifyCompanyEmailValidation,
} from "./validation";

export const companyEmail = (
  {
    expiresIn = 60 * 60 * 24,
    disableCleanup = false,
    allowedEmails = [],
    generateToken = () => generateRandomString(32),
    sendCompanyEmailVerification,
    registerTokenExpiry = 60 * 60,
  }: CompanyEmailOptions = {} as CompanyEmailOptions,
) =>
  ({
    id: "company-email",
    endpoints: {
      sendCompanyEmailVerification: createAuthEndpoint(
        "/company-email/send-verification-email",
        {
          method: "POST",
          metadata: sendEmailVerificationMetadata,
          body: sendCompanyEmailVerificationValidation,
        },
        async (ctx) => {
          try {
            const { email, callbackUrl } = ctx.body;

            const isCompanyEmail = CompanyEmailValidator.isCompanyEmail(email);

            if (!isCompanyEmail && !allowedEmails.includes(email)) {
              throw new APIError("BAD_REQUEST", {
                message: "Email is not a company email",
              });
            }

            const token = await generateToken();

            await ctx.context.adapter.delete({
              model: "verification",
              where: [
                {
                  field: "value",
                  operator: "eq",
                  value: email,
                },
              ],
            });

            await ctx.context.internalAdapter.createVerificationValue({
              identifier: token,
              value: email,
              expiresAt: new Date(new Date().setSeconds(expiresIn)),
            });

            await sendCompanyEmailVerification({
              email,
              url: callbackUrl || ctx.context.baseURL,
              token,
            });

            return { success: true };
          } catch (error) {
            if (error instanceof APIError) {
              throw error;
            }

            throw new APIError("INTERNAL_SERVER_ERROR", {
              message: "Failed to send verification email",
              cause: error,
            });
          }
        },
      ),
      verifyCompanyEmailVerification: createAuthEndpoint(
        "/company-email/verify-email",
        {
          method: "GET",
          metadata: verifyEmailMetadata,
          query: verifyCompanyEmailValidation,
        },
        async (ctx) => {
          try {
            const { token } = ctx.query;

            const verification =
              await ctx.context.internalAdapter.findVerificationValue(token);

            if (!verification || verification.expiresAt < new Date()) {
              throw new APIError("BAD_REQUEST", {
                message: "Invalid or expired verification token",
              });
            }

            const generatedToken = await generateToken();

            await ctx.context.internalAdapter.createVerificationValue({
              identifier: generatedToken,
              value: verification.value,
              expiresAt: new Date(new Date().setSeconds(registerTokenExpiry)),
            });

            if (!disableCleanup) {
              await ctx.context.internalAdapter.deleteVerificationValue(
                verification.id,
              );
            }

            return { success: true, token: generatedToken };
          } catch (error) {
            if (error instanceof APIError) {
              throw error;
            }

            throw new APIError("INTERNAL_SERVER_ERROR", {
              message: "Failed to verify email",
            });
          }
        },
      ),
      checkCompanyEmail: createAuthEndpoint(
        "/company-email/check",
        {
          method: "POST",
          metadata: checkCompanyEmailMetadata,
          body: checkCompanyEmailValidation,
        },
        async (ctx) => {
          const { email } = ctx.body;

          const isCompanyEmail = CompanyEmailValidator.isCompanyEmail(email);

          if (!isCompanyEmail) {
            throw new APIError("BAD_REQUEST", {
              message: "Email is not a company email",
            });
          }

          return { success: true };
        },
      ),
    },
  }) satisfies BetterAuthPlugin;
