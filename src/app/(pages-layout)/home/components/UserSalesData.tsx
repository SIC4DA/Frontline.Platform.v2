"use client";

import { searchDeal } from "@/services/deal";
import type { Deal } from "@/types/deal";
import Search from "@public/icons/Search";
import { useTranslations } from "next-intl";
import { useRef, useState } from "react";
import SalesCard from "./SalesCard";

type UserSalesDataProps = {
  dealsAnalytics: {
    closedDeals: number;
    conversionRate: number;
  };
  initDeals: Deal[];
};

const UserSalesData = ({ dealsAnalytics, initDeals }: UserSalesDataProps) => {
  const t = useTranslations("home");
  const conversionRateWithPercentage = new Intl.NumberFormat("en-US", {
    style: "percent",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(dealsAnalytics.conversionRate);

  const [deals, setDeals] = useState<Deal[]>(initDeals);
  const timeRef = useRef<NodeJS.Timeout>(null);

  const handleOnChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (timeRef.current) {
      clearTimeout(timeRef.current);
    }

    timeRef.current = setTimeout(async () => {
      const query = e.target.value.trim();

      if (!query) {
        setDeals(initDeals);
        return;
      }
      const result = await searchDeal(query);
      setDeals(result);
    }, 500);
  };

  return (
    <div className="mt-7 w-full px-7 max-2xl:mt-5 max-md:px-4 max-sm:px-2">
      <div className="mb-8 flex items-center gap-4 max-2xl:text-sm">
        <p>
          <span className="text-foreground me-1 font-semibold">{dealsAnalytics.closedDeals}</span>
          <span className="text-foreground-secondary">{t("closedSales")}</span>
        </p>
        <p>
          <span className="text-foreground me-1 font-semibold">{conversionRateWithPercentage}</span>
          <span className="text-foreground-secondary">{t("conversionRate")}</span>
        </p>
      </div>
      <div className="mb-6 flex items-center gap-3 rounded-lg bg-[#F5F5F5] px-6 py-2">
        <label htmlFor="search-sales" className="stroke-foreground">
          <Search />
        </label>
        <input
          type="text"
          id="search-sales"
          placeholder={t("searchPlaceholder")}
          className="placeholder:text-foreground-secondary text-foreground flex-grow bg-transparent py-1 focus:outline-0 max-2xl:text-sm"
          onChange={handleOnChange}
        />
      </div>
      <div
        style={{
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        }}
        className="grid gap-4">
        {deals.map((deal) => (
          <SalesCard key={deal.id} {...deal} />
        ))}
      </div>
    </div>
  );
};

export default UserSalesData;
