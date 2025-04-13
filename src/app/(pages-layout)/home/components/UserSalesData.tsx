import { useTranslations } from "next-intl";
import Search from "../../../../../public/icons/Search";
import SalesCard from "./SalesCard";

const UserSalesData = () => {
  const t = useTranslations("home");

  return (
    <div className="mt-7 w-full px-7 max-2xl:mt-5 max-md:px-4 max-sm:px-2">
      <div className="mb-8 flex items-center gap-4 max-2xl:text-sm">
        <p>
          <span className="text-foreground me-1 font-semibold">25</span>
          <span className="text-foreground-secondary">{t("closedSales")}</span>
        </p>
        <p>
          <span className="text-foreground me-1 font-semibold">66%</span>
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
        />
      </div>
      <div
        style={{
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        }}
        className="grid gap-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <SalesCard key={i} />
        ))}
      </div>
    </div>
  );
};

export default UserSalesData;
