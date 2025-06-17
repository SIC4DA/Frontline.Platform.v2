import { Calendar, Compass } from "lucide-react";
import { useTranslations } from "next-intl";
import React from "react";

import type { Deal } from "@/types/deal";

import InfoChip from "../InfoChip";
import StagesList from "./StagesList";

const SalesProcessInfo = ({ deal }: { deal: Deal }) => {
  const t = useTranslations("deal");

  return (
    <div className="my-60">
      <h2 className="mb-16 text-center text-[45px] text-[#00326B] capitalize">{t("salesProcessInfo")}</h2>
      <div className="flex flex-wrap items-center justify-center gap-4">
        <InfoChip
          icon={<Calendar className="size-[18px] stroke-[1.5px]" />}
          value={deal?.salesCycleLength}
          label={t("salesCycle")}
        />
        <InfoChip icon={<Compass className="size-[18px] stroke-[1.5px]" />} value={deal?.salesSource} />
      </div>
      <StagesList stages={deal?.dealContributors} />
    </div>
  );
};

export default SalesProcessInfo;
