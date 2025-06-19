import { User } from "lucide-react";
import { useTranslations } from "next-intl";
import React from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Contributor } from "@/types/deal";

const ContributorCard = ({ contributor, isSwitching }: { contributor: Contributor; isSwitching: boolean }) => {
  const t = useTranslations("deal");

  return (
    <div
      dir="ltr"
      className={cn(
        "flex flex-col justify-between gap-10 rounded-xl bg-gradient-to-b from-[#FFFFFF] to-[#D6E8FF] p-6 opacity-100 duration-500 ease-in-out",
        isSwitching && "opacity-0",
      )}>
      <p className="text-2xl font-medium text-[#2F2F2F]">{contributor.name}</p>
      <div>
        <p className="flex items-center gap-2 text-sm text-[#2F2F2F]">
          <User className="size-[18px] fill-[#2F2F2F] stroke-[1.5px]" />
          <span>{contributor.title || "Contributor Title"}</span>
        </p>
        <p className="text-foreground-secondary mt-3 line-clamp-2 text-sm" title={contributor.shoutout}>
          {contributor.shoutout}
        </p>
      </div>
      <Button className="h-10 w-full rounded-[7px] bg-[#369FEA] duration-300 hover:bg-[#369FEA]" variant="primary">
        {t("connect")}
      </Button>
    </div>
  );
};

export default ContributorCard;
