import { getTranslations } from "next-intl/server";

import type { Deal } from "@/types/deal";

import UserSales from "./UserSales";

// import UserSales from "./UserSales";

const SalesData = async ({ deals }: { deals: Deal[] }) => {
  const t = await getTranslations("home");

  const closedDealsCount = deals.filter(
    (deal) =>
      Array.isArray(deal.dealContributors) &&
      deal.dealContributors.some((contributor) => contributor.stage === "Closing"),
  ).length;

  const conversionRate = closedDealsCount > 0 ? (closedDealsCount / deals.length) * 100 : 0;

  if (!deals || !deals.length) {
    return <p className="text-foreground-secondary mt-10 text-center text-lg max-2xl:text-base">{t("noSales")}</p>;
  }

  return (
    <div className="mt-7 w-full px-7 max-2xl:mt-5 max-md:px-4 max-sm:px-2">
      <div className="mb-8 flex items-center gap-4 max-2xl:text-sm">
        <p>
          <span className="text-foreground me-1 font-semibold">{closedDealsCount}</span>
          <span className="text-foreground-secondary">{t("closedSales")}</span>
        </p>
        <p>
          <span className="text-foreground me-1 font-semibold">{conversionRate}%</span>
          <span className="text-foreground-secondary">{t("conversionRate")}</span>
        </p>
      </div>

      <UserSales initDeals={deals} />
    </div>
  );
};

export default SalesData;
