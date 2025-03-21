"use server";

import { z } from "zod";
import { authClient } from "@/lib/auth-client";
import { getTranslations } from "next-intl/server";

export type EmailVerificationActionState = {
  status: "idle" | "success" | "error";
  email?: string;
  errors?: {
    email?: string[];
  };
};

export async function sendVerificationEmailAction(
  prevState: EmailVerificationActionState,
  formData: FormData
): Promise<EmailVerificationActionState> {
  const t = await getTranslations("auth");

  const emailVerificationSchema = z.object({
    email: z
      .string()
      .min(1, { message: t("emailRequired") })
      .email({ message: t("invalidEmail") }),
  });

  const email = formData.get("email") as string;

  const validationResult = emailVerificationSchema.safeParse({ email });

  if (!validationResult.success) {
    const errors = validationResult.error.flatten().fieldErrors;
    return {
      status: "error",
      email,
      errors: {
        email: errors.email,
      },
    };
  }

  const { error } = await authClient.sendVerificationEmail({
    email,
    callbackURL: `/check-email?email=${email}`,
  });

  if (error) {
    return {
      status: "error",
      email,
      errors: {
        email: [
          error.message || "An unexpected error occurred. Please try again.",
        ],
      },
    };
  }

  return {
    status: "success",
    email,
  };
}
