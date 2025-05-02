"use server";

import { eq } from "drizzle-orm";
import { headers } from "next/headers";

import { db } from "@/core/db";
import { user } from "@/core/db/schema";
import { auth } from "@/lib/auth";
import { tryCatch } from "@/utils/tryCatch";

export const getMe = async () => {
	const { error: sessionError, data: session } = await tryCatch(
		auth.api.getSession({
			headers: await headers(),
		}),
	);

	if (sessionError || !session) {
		throw new Error("User not found");
	}

	const { error: authUserError, data: authUser } = await tryCatch(
		db.query.user.findFirst({
			where: eq(user.id, session.user.id),
		}),
	);

	if (authUserError || !authUser) {
		throw new Error("User not found");
	}

	return authUser;
};

export const getUsers = async () => {
	const users = await db.query.user.findMany();

	return users;
};

export const getUserById = async (id: string) => {
	const result = await db.query.user.findFirst({
		where: eq(user.id, id),
		with: {
			deals: true,
		},
	});

	return result;
};

export const updateUser = async (
	id: string,
	data: Partial<Omit<typeof user.$inferInsert, "id">>,
) => {
	return auth.api.updateUser({
		headers: await headers(),
		body: data,
	});
};

export const deleteUser = async (
	data: { password?: string; token?: string; callbackURL?: string } = {},
) => {
	await auth.api.deleteUser({
		headers: await headers(),
		body: data,
	});
};
