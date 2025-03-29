import RequestError from "@/components/shared/RequestError";
import { authClient } from "@/lib/auth-client";
import { headers } from "next/headers";
import UserCover from "./components/UserCover";
import UserData from "./components/UserData";
import UserSalesData from "./components/UserSalesData";

export default async function HomePage() {
  const { data } = await authClient.getSession({
    fetchOptions: {
      headers: await headers(),
    },
  });

  if (!data?.user)
    return (
      <section className="flex min-h-dvh items-center justify-center px-8 py-3.5">
        <RequestError />
      </section>
    );

  return (
    <section className="px-8 py-3.5">
      <UserCover user={data?.user} />
      <UserData user={data?.user} />
      <UserSalesData />
    </section>
  );
}
