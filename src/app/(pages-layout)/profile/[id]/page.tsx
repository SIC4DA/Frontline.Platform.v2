import React from "react";

import RequestError from "@/components/shared/RequestError";
import { getUserById } from "@/services/user";
import { Deal } from "@/types/deal";
import { tryCatch } from "@/utils/tryCatch";

import UserCover from "../../home/components/UserCover";
import UserData from "../../home/components/UserData";
import SalesData from "./components/SalesData";

export default async function UserProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { data: userData, error } = await tryCatch(getUserById(id));

  if (error || !userData) {
    return (
      <section className="flex min-h-dvh items-center justify-center px-8 py-3.5 max-sm:px-2">
        <RequestError />
      </section>
    );
  }

  return (
    <section className="px-8 py-3.5 max-md:px-5 max-sm:px-4 max-sm:pb-24">
      <UserCover user={userData} />
      <UserData user={userData} />
      <SalesData deals={userData.deals as Deal[]} />
    </section>
  );
}
