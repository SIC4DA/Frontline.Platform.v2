"use server";

import env from "@/config/env";
import { db } from "@/core/db";
import { user } from "@/core/db/schema";
import { auth } from "@/lib/auth";
import { tryCatch } from "@/utils/tryCatch";
import { eq } from "drizzle-orm";
import { getTranslations } from "next-intl/server";
import { redirect } from "next/navigation";
import { z } from "zod";

export type EmailVerificationActionState = {
  status: "idle" | "success" | "error";
  email?: string;
  errors?: {
    email?: string[];
  };
};

export async function sendVerificationEmailAction(
  prevState: EmailVerificationActionState,
  formData: FormData,
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

  const userExists = await db.query.user.findFirst({
    columns: {
      email: true,
    },
    where: eq(user.email, email),
  });

  if (userExists?.email) {
    return {
      status: "error",
      email,
      errors: {
        email: ["Email already exists. Please use a different email."],
      },
    };
  }

  const { error } = await tryCatch(
    auth.api.sendCompanyEmailVerification({
      body: {
        email,
        callbackUrl: `${env.APP_ORIGIN}/verify-email?email=${email}`,
      },
    }),
  );

  if (error) {
    console.log(error);

    return {
      status: "error",
      email,
      errors: {
        email: [error.message || "An unexpected error occurred. Please try again."],
      },
    };
  }

  redirect(`/check-email?email=${email}`);

  // return {
  //   status: "success",
  //   email,
  // };
}
