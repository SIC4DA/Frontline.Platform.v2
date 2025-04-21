"use server";

import { getTranslations } from "next-intl/server";
import { redirect } from "next/navigation";
import { z } from "zod";

import { auth } from "@/lib/auth";
import { tryCatch } from "@/utils/tryCatch";

export type LoginActionState = {
  status: "idle" | "success" | "error";
  email?: string;
  password?: string;
  errors?: {
    email?: string[];
    password?: string[];
    form?: string[];
  };
};

export async function loginAction(prevState: LoginActionState, formData: FormData): Promise<LoginActionState> {
  const t = await getTranslations("auth");

  const loginSchema = z.object({
    email: z
      .string()
      .min(1, { message: t("emailRequired") })
      .email({ message: t("invalidEmail") }),
    password: z.string().min(1, { message: t("passwordRequired") }),
  });

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const validationResult = loginSchema.safeParse({ email, password });

  if (!validationResult.success) {
    const errors = validationResult.error.flatten().fieldErrors;
    return {
      status: "error",
      email,
      password,
      errors: {
        email: errors.email,
        password: errors.password,
      },
    };
  }

  const { error } = await tryCatch(
    auth.api.signInEmail({
      body: {
        email,
        password,
        callbackURL: "/home",
      },
    }),
  );

  if (error) {
    return {
      status: "error",
      email,
      password,
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
