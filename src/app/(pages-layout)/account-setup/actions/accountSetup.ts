"use server";

import { auth } from "@/lib/auth";
import { tryCatch } from "@/utils/tryCatch";
import { getTranslations } from "next-intl/server";
import { redirect } from "next/navigation";
import { z } from "zod";

export type AccountSetupState = {
  status: "idle" | "success" | "error";
  username?: string;
  companyName?: string;
  errors?: {
    username?: string[];
    companyName?: string[];
    form?: string[];
  };
};

export async function accountSetupAction(prevState: AccountSetupState, formData: FormData): Promise<AccountSetupState> {
  const t = await getTranslations("auth");

  const loginSchema = z.object({
    username: z.string().min(1, { message: t("usernameRequired") }),
    companyName: z.string().min(1, { message: t("companyNameRequired") }),
  });

  const username = formData.get("username") as string;
  const companyName = formData.get("companyName") as string;

  const validationResult = loginSchema.safeParse({ username, companyName });

  if (!validationResult.success) {
    const errors = validationResult.error.flatten().fieldErrors;
    return {
      status: "error",
      username,
      companyName,
      errors: {
        username: errors.username,
        companyName: errors.companyName,
      },
    };
  }

  const { error } = await tryCatch(
    auth.api.updateUser({
      body: {
        username,
        companyName,
      },
    }),
  );

  if (error) {
    return {
      status: "error",
      username,
      companyName,
      errors: {
        form: [error.message || "An unexpected error occurred. Please try again."],
      },
    };
  }

  redirect("/home");

  // return {
  //   status: "success",
  //   email,
  //   password,
  // };
}
