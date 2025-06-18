import { useTranslations } from "next-intl";
import React from "react";

import type { Deal } from "@/types/deal";

import ContractSigner from "./ContractSigner";
import ContractTerms from "./ContractTerms";
import ContractValue from "./ContractValue";

const ContractInfo = ({ deal }: { deal: Deal | null | undefined }) => {
  const t = useTranslations("deal");

  return (
    <div className="mt-60">
      <h2 className="text-center text-[45px] text-[#00326B]">{t("contractInfo")}</h2>
      <div className="mt-20 grid grid-cols-2 gap-16 max-md:grid-cols-1 max-md:gap-x-0">
        <ContractValue contractValue={deal?.contractValue} />
        <ContractTerms contractTerm={deal?.contractTerm} />
        <ContractSigner deal={deal} />
      </div>
    </div>
  );
};

export default ContractInfo;
