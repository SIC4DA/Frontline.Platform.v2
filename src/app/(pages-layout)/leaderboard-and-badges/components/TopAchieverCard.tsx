import { BadgeCheck } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import { Button } from "@/components/ui/button";
import { UserWithClosedDeals } from "@/services/leaderboard";

import LatestDeals from "./LatestDeals";

const TopAchieverCard = ({ topAchieverData }: { topAchieverData: UserWithClosedDeals }) => {
  const t = useTranslations("leaderboard");

  return (
    <div className="border-border mx-auto w-full max-w-[500px] overflow-hidden rounded-3xl border">
      <div className="relative h-[120px] bg-gradient-to-b from-[#266DF0] to-[#89D9FF]">
        <Image
          draggable={false}
          src={topAchieverData?.user?.image ?? "/images/danny.jpg"}
          className="border-background absolute -bottom-6 left-6 aspect-square w-16 rounded-2xl border-2 shadow-2xl duration-300 max-2xl:w-14"
          alt="user Image"
          width={56}
          height={56}
        />
      </div>
      <div className="mt-2 p-6">
        <div className="flex items-center gap-1">
          <h3 className="text-lg font-medium max-2xl:text-base">{topAchieverData.user.name}</h3>
          <BadgeCheck fill="#49adf4" className="size-5 max-2xl:size-4" stroke="#fff" />
        </div>
        <p className="inline-block bg-gradient-to-r from-[#7F7F7F] to-[#3BBBF6] bg-clip-text text-xs text-transparent max-2xl:text-[10px]">
          @{topAchieverData.user.username}
        </p>
        <div className="mt-3 flex items-center gap-2">
          <div className="border-r-2 border-[#D9D9D9] pr-4 text-sm">
            <p className="text-sm font-medium">{topAchieverData.closedDealsCount}</p>
            <span className="text-foreground-secondary text-[13px] max-2xl:text-xs">{t("closedDeals")}</span>
          </div>
          <div className="pl-4">
            <p className="text-sm font-medium">{topAchieverData.conversionRate}%</p>
            <span className="text-foreground-secondary text-[13px] max-2xl:text-xs">{t("conversionRate")}</span>
          </div>
        </div>
        <div className="mt-7 flex items-center justify-between">
          <LatestDeals deals={topAchieverData.deals} />
          <Link className="block w-full max-w-[140px]" href={`/profile/${topAchieverData.user.id}`}>
            <Button size="sm" variant="primary" className="w-full max-w-[140px]">
              {t("profile")}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TopAchieverCard;
