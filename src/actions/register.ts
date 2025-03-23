"use server";

import { apiClient } from "@/lib/api-client";
import { auth } from "@/lib/auth";
import { tryCatch } from "@/utils/tryCatch";
import { getTranslations } from "next-intl/server";
import { redirect } from "next/navigation";
import { z } from "zod";

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
  formData: FormData,
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
      .regex(/[a-z]/, { message: t("passwordRequiresLowercase") })
      .regex(/[0-9]/, { message: t("passwordRequiresNumber") }),
  });

  // Extract form data
  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;
  const companyName = formData.get("companyName") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const profileImage = formData.get("profileImage") as File;

  // Validate form data
  const validationResult = registerSchema.safeParse({
    firstName,
    lastName,
    companyName,
    password,
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
      errors: {
        firstName: errors.firstName,
        lastName: errors.lastName,
        companyName: errors.companyName,
        password: errors.password,
      },
    };
  }

  let imageUrl: string | null = null;
  if (profileImage.size > 0) {
    const { error: imageError, data } = await apiClient.api.image.upload.post({
      file: profileImage,
    });

    imageUrl = data?.url || null;

    if (imageError) {
      console.log("imageError", imageError.message);
      return {
        status: "error",
        errors: {
          form: [imageError.message],
        },
      };
    }
  }

  const { error } = await tryCatch(
    auth.api.signUpEmail({
      body: {
        email,
        password,
        name: `${firstName} ${lastName}`,
        company: companyName,
        firstName,
        lastName,
        ...(imageUrl && { imageUrl }),
      },
    }),
  );

  if (error) {
    console.log("error", error);
    return {
      status: "error",
      firstName,
      lastName,
      companyName,
      password,
      errors: {
        form: [
          error.message || "An unexpected error occurred. Please try again.",
        ],
      },
    };
  }

  redirect("/dashboard");

  // return {
  //   status: "success",
  //   firstName,
  //   lastName,
  //   companyName,
  //   password,
  // };
}
