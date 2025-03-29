import { Search } from "lucide-react";
import { useTranslations } from "next-intl";

const UserSalesData = () => {
  const t = useTranslations("home");

  return (
    <div className="mt-7 w-full px-7">
      <div className="mb-8 flex items-center gap-4">
        <p>
          <span className="text-foreground me-1 font-semibold">25</span>
          <span className="text-foreground-secondary">{t("closedSales")}</span>
        </p>
        <p>
          <span className="text-foreground me-1 font-semibold">66%</span>
          <span className="text-foreground-secondary">
            {t("conversionRate")}
          </span>
        </p>
      </div>
      <div className="mb-6 flex items-center gap-3 rounded-lg bg-[#F5F5F5] px-6 py-3">
        <label htmlFor="search-sales">
          <Search size={24} className="text-foreground" />
        </label>
        <input
          type="text"
          id="search-sales"
          placeholder={t("searchPlaceholder")}
          className="placeholder:text-foreground-secondary py-1 text-foreground flex-grow bg-transparent focus:outline-0"
        />
      </div>
    </div>
  );
};

export default UserSalesData;
