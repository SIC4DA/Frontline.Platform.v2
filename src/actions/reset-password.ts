"use server";

import { getTranslations } from "next-intl/server";
import { redirect } from "next/navigation";
import { z } from "zod";

import { auth } from "@/lib/auth";
import { tryCatch } from "@/utils/tryCatch";

export type ResetPasswordActionState = {
  status: "idle" | "success" | "error";
  password?: string;
  confirmPassword?: string;
  errors?: {
    password?: string[];
    confirmPassword?: string[];
    form?: string[];
  };
};

export async function resetPasswordAction(
  _prevState: ResetPasswordActionState,
  formData: FormData,
): Promise<ResetPasswordActionState> {
  const t = await getTranslations("auth");

  const resetPasswordSchema = z
    .object({
      password: z
        .string()
        .min(8, { message: t("passwordMinLength") })
        .regex(/[A-Z]/, { message: t("passwordRequiresUppercase") })
        .regex(/[a-z]/, { message: t("passwordRequiresLowercase") })
        .regex(/[0-9]/, { message: t("passwordRequiresNumber") }),
      confirmPassword: z.string().min(1, { message: t("confirmPasswordRequired") }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      path: ["confirmPassword"],
      message: t("passwordsDoNotMatch"),
    });

  const password = (formData.get("password") as string) || "";
  const confirmPassword = (formData.get("confirmPassword") as string) || "";
  const token = (formData.get("token") as string) || "";

  if (!token) {
    return {
      status: "error",
      password,
      confirmPassword,
      errors: {
        form: [t("resetTokenMissing")],
      },
    };
  }

  const validationResult = resetPasswordSchema.safeParse({ password, confirmPassword });

  if (!validationResult.success) {
    const errors = validationResult.error.flatten().fieldErrors;
    return {
      status: "error",
      password,
      confirmPassword,
      errors: {
        password: errors.password,
        confirmPassword: errors.confirmPassword,
      },
    };
  }

  const { error } = await tryCatch(
    auth.api.resetPassword({
      body: {
        newPassword: password,
        token,
      },
    }),
  );

  if (error) {
    return {
      status: "error",
      errors: {
        form: [error.message || "An unexpected error occurred. Please try again."],
      },
    };
  }

  redirect("/login");
}
