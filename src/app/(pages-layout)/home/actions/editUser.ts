"use server";

import { auth } from "@/lib/auth";
import { tryCatch } from "@/utils/tryCatch";
import { getTranslations } from "next-intl/server";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { z } from "zod";

export type EditUserState = {
  status: "idle" | "success" | "error";
  fullName?: string;
  username?: string;
  bio?: string;
  errors?: {
    fullName?: string[];
    username?: string[];
    bio?: string[];
    form?: string[];
  };
};

export async function editUserAction(prevState: EditUserState, formData: FormData): Promise<EditUserState> {
  const t = await getTranslations("home");

  const loginSchema = z.object({
    username: z.string().min(1, { message: t("usernameRequired") }),
    fullName: z.string().min(1, { message: t("fullNameRequired") }),
    bio: z
      .string()
      .max(150, { message: t("bioMaxLength") })
      .optional(),
  });

  const username = formData.get("username") as string;
  const fullName = formData.get("fullName") as string;
  const bio = formData.get("bio") as string;

  const validationResult = loginSchema.safeParse({ username, fullName, bio });

  if (!validationResult.success) {
    const errors = validationResult.error.flatten().fieldErrors;
    return {
      status: "error",
      username,
      fullName,
      bio,
      errors: {
        username: errors.username,
        fullName: errors.fullName,
        bio: errors.bio,
      },
    };
  }

  const { error } = await tryCatch(
    auth.api.updateUser({
      headers: await headers(),
      body: {
        name: fullName,
        username,
        bio,
      },
    }),
  );

  if (error) {
    return {
      status: "error",
      username,
      fullName,
      bio,
      errors: {
        form: [error.message || "An unexpected error occurred. Please try again."],
      },
    };
  }

  revalidatePath("/home");

  return {
    status: "success",
    username,
    fullName,
    bio,
  };
}
