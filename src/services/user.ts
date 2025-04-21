"use server";

import { eq } from "drizzle-orm";
import { headers } from "next/headers";

import { db } from "@/core/db";
import { user } from "@/core/db/schema";
import { auth } from "@/lib/auth";
import type { User } from "@/types/user";

export const getMe = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    throw new Error("User not found");
  }

  return session.user as User;
};

export const getUsers = async () => {
  const users = await db.query.user.findMany();

  return users;
};

export const getUser = async (id: string) => {
  const result = await db.query.user.findFirst({
    where: eq(user.id, id),
  });

  return result;
};

export const updateUser = async (id: string, data: Partial<Omit<typeof user.$inferInsert, "id">>) => {
  return auth.api.updateUser({
    headers: await headers(),
    body: data,
  });
};

export const deleteUser = async (data: { password?: string; token?: string; callbackURL?: string } = {}) => {
  await auth.api.deleteUser({
    headers: await headers(),
    body: data,
  });
};
