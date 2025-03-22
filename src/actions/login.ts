"use server";

import { auth } from "@/lib/auth";
import { tryCatch } from "@/utils/tryCatch";
import { getTranslations } from "next-intl/server";
import { z } from "zod";

// Define the return type for the login action
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

// Create the login action
export async function loginAction(
  prevState: LoginActionState,
  formData: FormData,
): Promise<LoginActionState> {
  const t = await getTranslations("auth");

  // Define the login form schema with Zod
  const loginSchema = z.object({
    email: z
      .string()
      .min(1, { message: t("emailRequired") })
      .email({ message: t("invalidEmail") }),
    password: z.string().min(1, { message: t("passwordRequired") }),
  });

  // Extract form data
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  // Validate form data
  const validationResult = loginSchema.safeParse({ email, password });

  // If validation fails, return errors
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
        callbackURL: "/dashboard",
      },
    }),
  );

  if (error) {
    return {
      status: "error",
      email,
      password,
      errors: {
        form: [
          error.message || "An unexpected error occurred. Please try again.",
        ],
      },
    };
  }

  return {
    status: "success",
    email,
    password,
  };
}
