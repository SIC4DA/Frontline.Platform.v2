import { redirect } from "next/navigation";
import { Suspense } from "react";

import { getMe } from "@/services/user";
import { tryCatch } from "@/utils/tryCatch";

import SalesLoader from "./components/SalesLoader";
import UserCover from "./components/UserCover";
import UserData from "./components/UserData";
import UserSalesData from "./components/UserSalesData";

export default async function HomePage() {
  const { data, error } = await tryCatch(getMe());

  if (error || !data) {
    // return redirect("/login");
    return;
  }

  return (
    <section className="px-8 py-3.5 max-md:px-5 max-sm:px-4 max-sm:pb-24">
      <UserCover user={data} />
      <UserData user={data} isMe />
      <Suspense fallback={<SalesLoader />}>
        <UserSalesData />
      </Suspense>
    </section>
  );
}
