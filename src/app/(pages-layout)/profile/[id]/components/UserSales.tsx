"use client";

import Search from "@public/icons/Search";
import { useTranslations } from "next-intl";
import React from "react";

import SalesCard from "@/app/(pages-layout)/(home)/components/SalesCard";
import useDebounce from "@/hooks/shared/useDebounce";
import { Deal } from "@/types/deal";

const UserSales = ({ initDeals }: { initDeals: Deal[] }) => {
  const t = useTranslations("home");
  const [deals, setDeals] = React.useState(initDeals || []);
  const [search, setSearch] = React.useState("");
  const debouncedSearch = useDebounce<string>(search, 500);

  React.useEffect(() => {
    if (!debouncedSearch) {
      setDeals(initDeals);
      return;
    }

    const filteredDeals = initDeals.filter((deal) => {
      return deal?.companyName?.toLowerCase()?.includes(debouncedSearch?.toLowerCase());
    });

    setDeals(filteredDeals);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch]);

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
          value={search}
          onChange={(e) => setSearch(e.target.value)}
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
