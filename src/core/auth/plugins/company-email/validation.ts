import { z } from "zod";

export const sendCompanyEmailVerificationValidation = z.object({
  email: z.string({ message: "Email is required" }).email({
    message: "Invalid email",
  }),
  callbackUrl: z
    .string({
      message: "Invalid callback URL",
      description: "Callback URL after email verification",
    })
    .url({ message: "Invalid callback URL" })
    .optional(),
});

export const verifyCompanyEmailValidation = z.object({
  token: z.string({ message: "Invalid token" }),
  redirectTo: z.string({ message: "Invalid redirect path" }).optional(),
});

export const checkCompanyEmailValidation = z.object({
  email: z.string({ message: "Email is required" }).email({
    message: "Invalid email",
  }),
});
