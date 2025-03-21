"use server";

import { z } from "zod";
import { authClient } from "@/lib/auth-client";
import { getTranslations } from "next-intl/server";

// Define the return type for the register action
export type RegisterActionState = {
  status: "idle" | "success" | "error";
  firstName?: string;
  lastName?: string;
  companyName?: string;
  password?: string;
  email?: string;
  profileImage?: string;
  errors?: {
    firstName?: string[];
    lastName?: string[];
    companyName?: string[];
    password?: string[];
    form?: string[];
  };
};

// Create the register action
export async function registerAction(
  prevState: RegisterActionState,
  formData: FormData
): Promise<RegisterActionState> {
  const t = await getTranslations("auth");

  // Define the register form schema with Zod
  const registerSchema = z.object({
    firstName: z.string().min(1, { message: t("firstNameRequired") }),
    lastName: z.string().min(1, { message: t("lastNameRequired") }),
    companyName: z.string().min(1, { message: t("companyNameRequired") }),
    password: z
      .string()
      .min(8, { message: t("passwordMinLength") })
      .regex(/[A-Z]/, { message: t("passwordRequiresUppercase") })
      .regex(/[0-9]/, { message: t("passwordRequiresNumber") }),
    profileImage: z.string().optional(),
  });

  // Extract form data
  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;
  const companyName = formData.get("companyName") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const profileImage = formData.get("profileImage") as string;

  // Validate form data
  const validationResult = registerSchema.safeParse({
    firstName,
    lastName,
    companyName,
    password,
    profileImage,
  });

  // If validation fails, return errors
  if (!validationResult.success) {
    const errors = validationResult.error.flatten().fieldErrors;
    return {
      status: "error",
      firstName,
      lastName,
      companyName,
      password,
      profileImage,
      errors: {
        firstName: errors.firstName,
        lastName: errors.lastName,
        companyName: errors.companyName,
        password: errors.password,
      },
    };
  }

  const { error } = await authClient.signUp.email({
    email,
    password,
    name: `${firstName} ${lastName}`,
    ...(profileImage && { image: profileImage }),
  });

  if (error) {
    return {
      status: "error",
      firstName,
      lastName,
      companyName,
      password,
      profileImage,
      errors: {
        form: [
          error.message || "An unexpected error occurred. Please try again.",
        ],
      },
    };
  }

  return {
    status: "success",
    firstName,
    lastName,
    companyName,
    password,
    profileImage,
  };
}
