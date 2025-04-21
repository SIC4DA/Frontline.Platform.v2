import { getTranslations } from "next-intl/server";

import { getDeals, getDealsAnalytics } from "@/services/deal";

import UserSales from "./UserSales";

const UserSalesData = async () => {
  const t = await getTranslations("home");
  const [deals, dealsAnalytics] = await Promise.all([getDeals(), getDealsAnalytics()]);

  if (!deals || !deals.length) {
    return <p className="text-foreground-secondary mt-10 text-center text-lg max-2xl:text-base">{t("noSales")}</p>;
  }

  return (
    <div className="mt-7 w-full px-7 max-2xl:mt-5 max-md:px-4 max-sm:px-2">
      <div className="mb-8 flex items-center gap-4 max-2xl:text-sm">
        <p>
          <span className="text-foreground me-1 font-semibold">{dealsAnalytics.closedDeals}</span>
          <span className="text-foreground-secondary">{t("closedSales")}</span>
        </p>
        <p>
          <span className="text-foreground me-1 font-semibold">{dealsAnalytics.conversionRate}%</span>
          <span className="text-foreground-secondary">{t("conversionRate")}</span>
        </p>
      </div>

      <UserSales initDeals={deals} />
    </div>
  );
};

export default UserSalesData;
