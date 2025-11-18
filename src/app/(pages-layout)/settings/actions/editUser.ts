"use server";

import { getTranslations } from "next-intl/server";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { z } from "zod";

import { auth } from "@/lib/auth";
import { uploadFile } from "@/services/cloudnary";
import { tryCatch } from "@/utils/tryCatch";

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
  const profileImage = formData.get("profileImage") as File;
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

  const session = await auth.api.getSession({ headers: await headers() });

  const { error } = await tryCatch(
    auth.api.updateUser({
      headers: await headers(),
      body: {
        name: fullName,
        ...(username !== session?.user.username && { username }),
        ...(imageUrl && { image: imageUrl }),
        // @ts-expect-error bio is a valid key.
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

  revalidatePath("/");

  return {
    status: "success",
    username,
    fullName,
    bio,
  };
}
