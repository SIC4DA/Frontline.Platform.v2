"use client";

import Search from "@public/icons/Search";
import { useTranslations } from "next-intl";
import { useRef, useState } from "react";

import { searchDeal } from "@/services/deal";
import { Deal } from "@/types/deal";

import SalesCard from "./SalesCard";

const UserSales = ({ initDeals }: { initDeals: Deal[] }) => {
  const t = useTranslations("home");
  const timeRef = useRef<NodeJS.Timeout>(null);
  const [deals, setDeals] = useState<Deal[]>(initDeals);

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
    <>
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
    </>
  );
};

export default UserSales;
