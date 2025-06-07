import Image from "next/image";
import React from "react";

import { cn } from "@/lib/utils";

const LatestDeals = ({
  deals,
}: {
  deals: {
    id: string;
    companyLogo: string;
  }[];
}) => {
  return (
    <div className="relative flex flex-grow flex-wrap items-center gap-4">
      {deals.slice(0, 2).map((deal, index) => (
        <div
          key={deal.id}
          style={{
            left: `${(index * 20).toString()}px`,
          }}
          className={cn(
            "bg-background absolute flex size-8 items-center justify-center rounded-full",
            `z-[${index + 1}]`,
          )}>
          <Image
            src={deal?.companyLogo || "/images/company-placeholder.webp"}
            alt="deal logo"
            width={20}
            height={20}
            className="aspect-square size-6 rounded-lg"
          />
        </div>
      ))}
      {deals.length > 2 && <div className="left-[40px] size-8 rounded-full">+{deals.length - 2}</div>}
    </div>
  );
};

export default LatestDeals;
