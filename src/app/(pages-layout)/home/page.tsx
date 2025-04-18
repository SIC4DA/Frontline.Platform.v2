import RequestError from "@/components/shared/RequestError";
import { getMe } from "@/services/user";
import { tryCatch } from "@/utils/tryCatch";
import { Suspense } from "react";
import SalesLoader from "./components/SalesLoader";
import UserCover from "./components/UserCover";
import UserData from "./components/UserData";
import UserSalesData from "./components/UserSalesData";

export default async function HomePage() {
  const { data, error } = await tryCatch(getMe());

  if (error || !data) {
    return (
      <section className="flex min-h-dvh items-center justify-center px-8 py-3.5 max-sm:px-2">
        <RequestError />
      </section>
    );
  }

  return (
    <section className="px-8 py-3.5 max-md:px-5 max-sm:px-4 max-sm:pb-24">
      <UserCover user={data} />
      <UserData user={data} />
      <Suspense fallback={<SalesLoader />}>
        <UserSalesData />
      </Suspense>
    </section>
  );
}
