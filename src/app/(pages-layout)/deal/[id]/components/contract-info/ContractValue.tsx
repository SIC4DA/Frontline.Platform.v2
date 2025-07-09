import { useTranslations } from "next-intl";
import Image from "next/image";
import React from "react";

import { formatCurrency } from "@/utils/helper";

const ContractValue = ({ contractValue }: { contractValue: number | undefined | null }) => {
  const t = useTranslations("deal");

  return (
    <div className="border-border outline-border flex flex-col justify-between rounded-[32px] border bg-gradient-to-b from-[#FCFCFC] to-[#e2eefe] p-4 py-[51px] outline outline-offset-8">
      <Image
        src="/images/money.svg"
        alt="company logo"
        draggable="false"
        className="mx-auto"
        width={302}
        height={302}
      />
      <div className="mt-5 flex flex-col gap-4">
        <div className="text-accent mx-auto w-fit rounded-lg bg-[#3ba3ee] px-8 py-1.5 text-center text-[15px] max-md:text-sm">
          {t("value")}
        </div>
        <p className="mt-3 text-center text-4xl text-[#00326B] max-md:text-2xl">{formatCurrency(contractValue || 0)}</p>
      </div>
    </div>
  );
};

export default ContractValue;
