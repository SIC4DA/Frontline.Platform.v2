import { getTranslations } from "next-intl/server";

import RequestError from "@/components/shared/RequestError";
import { getUsersWithClosedDeals } from "@/services/leaderboard";
import { getMe } from "@/services/user";
import { tryCatch } from "@/utils/tryCatch";

import AchieverSwitcher from "./components/AchieverSwitcher";
import UsersTable from "./components/UsersTable";

export default async function LeaderboardPage() {
  const t = await getTranslations("leaderboard");
  const { data, error } = await tryCatch(getUsersWithClosedDeals());
  const { data: me } = await tryCatch(getMe());

  if (error || !data) {
    return (
      <section className="flex min-h-dvh items-center justify-center px-8 py-3.5 max-sm:px-2">
        <RequestError />
      </section>
    );
  }

  if (data.length === 0) {
    return (
      <section className="flex min-h-dvh items-center justify-center px-8 py-3.5 max-sm:px-2">
        <p>{t("noDataFound")}</p>
      </section>
    );
  }

  return (
    <section className="min-h-dvh px-8 py-3.5 max-md:px-5 max-sm:px-4 max-sm:pb-24">
      <AchieverSwitcher users={data} currentCompanyLogo={me?.companyLogo} />
      <div className="w-full max-w-full overflow-x-auto">
        <UsersTable users={data} />
      </div>
    </section>
  );
}
