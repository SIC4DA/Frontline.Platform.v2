import { Calendar, CircleDollarSign, DollarSign, FileText } from "lucide-react";
import { useTranslations } from "next-intl";
import React from "react";

import { DealAnalytics } from "@/types/deal";
import { compactCurrency } from "@/utils/helper";

import InfoChip from "../InfoChip";

const UserAnalytics = ({ analytics }: { analytics: DealAnalytics | null }) => {
  const t = useTranslations("deal");

  const analyticsData = [
    {
      icon: <FileText className="size-[18px] stroke-[1.5px]" />,
      label: t("dealsClosed"),
      value: analytics?.closedDealsCount,
    },
    {
      icon: <DollarSign className="size-[18px] stroke-[1.5px]" />,
      label: t("earned"),
      value: compactCurrency(analytics?.totalEarned || 0),
    },
    {
      icon: <CircleDollarSign className="size-[18px] stroke-[1.5px]" />,
      label: t("avgDealSize"),
      value: compactCurrency(analytics?.averageDealSize || 0),
    },
    {
      icon: <Calendar className="size-[18px] stroke-[1.5px]" />,
      label: t("avgSalesCycle"),
      value: analytics?.averageDealCycle,
    },
  ];

  return (
    <div className="mt-9 flex flex-wrap items-center gap-3">
      {analyticsData.map((item) => (
        <InfoChip key={item.label} icon={item.icon} value={item.value} label={item.label} />
      ))}
    </div>
  );
};

export default UserAnalytics;
