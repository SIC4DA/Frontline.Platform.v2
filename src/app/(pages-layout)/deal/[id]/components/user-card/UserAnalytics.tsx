import { Calendar, CircleDollarSign, DollarSign, FileText } from "lucide-react";
import { useTranslations } from "next-intl";
import React from "react";

const UserAnalytics = () => {
  const t = useTranslations("deal");

  const analytics = [
    {
      icon: <FileText className="size-[18px] stroke-[1.5px]" />,
      label: t("dealsClosed"),
      value: 12,
    },
    {
      icon: <DollarSign className="size-[18px] stroke-[1.5px]" />,
      label: t("earned"),
      value: "350K",
    },
    {
      icon: <CircleDollarSign className="size-[18px] stroke-[1.5px]" />,
      label: t("avgDealSize"),
      value: "50K",
    },
    {
      icon: <Calendar className="size-[18px] stroke-[1.5px]" />,
      label: t("avgSalesCycle"),
      value: "5 months",
    },
  ];

  return (
    <div className="mt-9 flex flex-wrap items-center gap-3">
      {analytics.map((item) => (
        <div key={item.label} className="bg-background flex items-center gap-2 rounded-lg px-3 py-2">
          <span className="text-foreground-secondary">{item.icon}</span>
          <div className="flex flex-wrap items-center gap-1 text-[13px] font-medium">
            <span>{item.value}</span>
            <span>{item.label}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserAnalytics;
