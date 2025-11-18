import React from "react";

import RequestError from "@/components/shared/RequestError";
import { getMe } from "@/services/user";
import { tryCatch } from "@/utils/tryCatch";

import LogoutButton from "../components/LogoutButton";
import UserModificationForm from "./components/UserModificationForm";

export default async function SettingsPage() {
  const { data, error } = await tryCatch(getMe());

  if (error || !data) {
    return (
      <section className="flex min-h-dvh items-center justify-center px-8 py-3.5 max-sm:px-2">
        <RequestError />
      </section>
    );
  }

  return (
    <section className="min-h-dvh px-12 pt-12 py-3.5 max-md:px-5 max-sm:px-4 max-sm:pb-24">
      <UserModificationForm user={data} />
      <div className="mt-6">
        <LogoutButton text="Sign Out" />
      </div>
    </section>
  );
}
