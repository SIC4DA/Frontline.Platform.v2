"use server";

import { getTranslations } from "next-intl/server";
import { redirect } from "next/navigation";
import { z } from "zod";

import env from "@/config/env";
import { auth } from "@/lib/auth";
import { tryCatch } from "@/utils/tryCatch";

export type ForgotPasswordActionState = {
  status: "idle" | "success" | "error";
  email?: string;
  errors?: {
    email?: string[];
    form?: string[];
  };
};

export async function forgotPasswordAction(
  _prevState: ForgotPasswordActionState,
  formData: FormData,
): Promise<ForgotPasswordActionState> {
  const t = await getTranslations("auth");

  const forgotPasswordSchema = z.object({
    email: z
      .string()
      .min(1, { message: t("emailRequired") })
      .email({ message: t("invalidEmail") }),
  });

  const email = (formData.get("email") as string) || "";

  const validationResult = forgotPasswordSchema.safeParse({ email });

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

  const { error } = await tryCatch(
    auth.api.forgetPassword({
      body: {
        email,
        redirectTo: `${env.APP_ORIGIN}/reset-password`,
      },
    }),
  );

  if (error) {
    return {
      status: "error",
      email,
      errors: {
        form: [error.message || "An unexpected error occurred. Please try again."],
      },
    };
  }

  redirect(`/check-email?email=${email}`);
}
