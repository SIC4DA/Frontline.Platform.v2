import { sendEmail, type TemplateName } from "@/services/mailer";
import { APIError } from "better-auth/api";
import type { EmailOTPOptions } from "better-auth/plugins";

export const emailOTPOptions: EmailOTPOptions = {
  expiresIn: 10 * 60,
  disableSignUp: true,
  otpLength: 6,
  async sendVerificationOTP({ type, email, otp }) {
    const template: TemplateName | "unknown" =
      type === "email-verification"
        ? "emailVerification"
        : type === "forget-password"
          ? "forgetPassword"
          : "unknown";

    if (template === "unknown") {
      throw new APIError("BAD_REQUEST", {
        message: "Invalid type",
      });
    }

    await sendEmail(template, {
      to: email,
      code: otp,
    });
  },
};
