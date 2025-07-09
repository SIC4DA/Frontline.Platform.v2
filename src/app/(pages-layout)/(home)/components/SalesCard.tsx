// import { Deal } from "@/types/deal";
import { Calendar, Package, User, Wallet } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";

import type { Deal } from "@/types/deal";

const SalesCard = ({
  id,
  companyName,
  companyIndustry,
  companyLogo,
  contractValue,
  dealContributors = [],
  contractSigner,
  productName,
  contractTerm,
}: Deal) => {
  const t = useTranslations("home");

  const contractValueWithCurrency = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(Number(contractValue) || 0);

  const lastDealContributor = dealContributors?.at(-1);

  const salesData = [
    {
      title: t("contract"),
      value: contractValueWithCurrency,
      icon: <Wallet size={20} className="text-foreground-secondary" />,
    },
    {
      title: t("contactPerson"),
      value: contractSigner || t("notAvailable"),
      icon: <User size={20} className="text-foreground-secondary" />,
    },
    {
      title: t("product"),
      value: productName || t("notAvailable"),
      icon: <Package size={20} className="text-foreground-secondary" />,
    },
    {
      title: t("terms"),
      value: contractTerm || t("notAvailable"),
      icon: <Calendar size={20} className="text-foreground-secondary" />,
    },
  ];

  return (
    <a href={lastDealContributor?.stage === "Closing" ? `/deal/${id}` : undefined}>
      <div className="border-border rounded-lg border px-5 py-6 max-sm:px-4">
        <div className="mb-10 flex items-center gap-3">
          <Image
            src={companyLogo || "/images/company-placeholder.webp"}
            alt={companyName || "Google"}
            width={34}
            height={34}
            className="aspect-square w-8 rounded-lg object-cover"
          />
          <div>
            <h4 className="text-sm font-medium capitalize">{companyName}</h4>
            <p className="text-foreground-secondary text-xs">{companyIndustry}</p>
          </div>
        </div>
        <div className="flex flex-col gap-7">
          {salesData.map(({ title, value, icon }) => (
            <div className="flex items-center justify-between gap-1 text-sm" key={title}>
              <div className="flex items-center gap-2">
                {icon}
                <p className="text-foreground-secondary capitalize">{title}</p>
              </div>
              <div className="flex w-full max-w-32 items-center justify-center text-center font-medium">{value}</div>
            </div>
          ))}
        </div>
      </div>
    </a>
  );
};

export default SalesCard;
