"use server";

import { getTranslations } from "next-intl/server";
import { redirect } from "next/navigation";
import { z } from "zod";

import { auth } from "@/lib/auth";
import { uploadFile, uploadImageFromUrl } from "@/services/cloudnary";
import { tryCatch } from "@/utils/tryCatch";

// Define the return type for the register action
export type RegisterActionState = {
  status: "idle" | "success" | "error";
  fullName?: string;
  username?: string;
  companyName?: string;
  jobTitle?: string;
  password?: string;
  email?: string;
  profileImage?: string;
  errors?: {
    fullName?: string[];
    username?: string[];
    jobTitle?: string[];
    companyName?: string[];
    password?: string[];
    form?: string[];
  };
};

// Create the register action
export async function registerAction(prevState: RegisterActionState, formData: FormData): Promise<RegisterActionState> {
  const t = await getTranslations("auth");

  // Define the register form schema with Zod
  const registerSchema = z.object({
    fullName: z.string().min(1, { message: t("fullNameRequired") }),
    username: z.string().min(1, { message: t("usernameRequired") }),
    jobTitle: z.string().min(1, { message: t("jobTitleRequired") }),
    companyName: z.string().min(1, { message: t("companyNameRequired") }),
    password: z
      .string()
      .min(8, { message: t("passwordMinLength") })
      .regex(/[A-Z]/, { message: t("passwordRequiresUppercase") })
      .regex(/[a-z]/, { message: t("passwordRequiresLowercase") })
      .regex(/[0-9]/, { message: t("passwordRequiresNumber") }),
  });

  // Extract form data
  const fullName = formData.get("fullName") as string;
  const username = formData.get("username") as string;
  const jobTitle = formData.get("jobTitle") as string;
  const companyName = formData.get("companyName") as string;
  const companyLogo = formData.get("companyLogo") as string;
  const email = formData.get("email") as string;
  const token = formData.get("token") as string;
  const password = formData.get("password") as string;
  const profileImage = formData.get("profileImage") as File;

  // Validate form data
  const validationResult = registerSchema.safeParse({
    fullName,
    username,
    jobTitle,
    companyName,
    password,
  });

  // If validation fails, return errors
  if (!validationResult.success) {
    const errors = validationResult.error.flatten().fieldErrors;
    return {
      status: "error",
      fullName,
      username,
      companyName,
      jobTitle,
      password,
      errors: {
        fullName: errors.fullName,
        username: errors.username,
        jobTitle: errors.jobTitle,
        companyName: errors.companyName,
        password: errors.password,
      },
    };
  }

  let imageUrl: string | undefined;
  if (profileImage.size > 0) {
    const { error: imageError, data } = await tryCatch(
      uploadFile(profileImage, {
        folder: "profile",
      }),
    );

    if (imageError) {
      return {
        status: "error",
        errors: {
          form: [imageError.message],
        },
      };
    }

    imageUrl = data?.secure_url;
  }

  if (companyLogo) {
    const { error: logoError } = await tryCatch(uploadImageFromUrl(companyLogo, { folder: "users" }));
    if (logoError) {
      return {
        status: "error",
        errors: {
          form: [logoError.message],
        },
      };
    }
  }

  const { error } = await tryCatch(
    auth.api.signUpEmail({
      body: {
        email,
        password,
        name: fullName,
        // @ts-expect-error companyName and companyLogo are valid keys of auth.api.signUpEmail
        jobTitle,
        companyName,
        companyLogo,
        username,
        ...(imageUrl && { image: imageUrl }),
      },
      query: {
        token,
      },
    }),
  );

  if (error) {
    return {
      status: "error",
      fullName,
      username,
      companyName,
      jobTitle,
      password,
      errors: {
        form: [error.message || "An unexpected error occurred. Please try again."],
      },
    };
  }

  redirect("/login");

  // return {
  //   status: "success",
  //   firstName,
  //   lastName,
  //   companyName,
  //   password,
  // };
}
