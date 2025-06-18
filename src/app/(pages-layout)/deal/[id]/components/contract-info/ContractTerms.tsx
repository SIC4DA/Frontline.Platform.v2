import { useTranslations } from "next-intl";
import Image from "next/image";
import React from "react";

const ContractTerms = ({ contractTerm }: { contractTerm: string | undefined | null }) => {
  const t = useTranslations("deal");

  return (
    <div className="border-border outline-border flex flex-col justify-between rounded-[32px] border bg-gradient-to-b from-[#FCFCFC] to-[#e2eefe] p-4 pb-[51px] outline outline-offset-8">
      <Image
        src="/images/terms.svg"
        alt="company logo"
        className="mx-auto max-h-[230px] w-full"
        width={400}
        height={400}
      />
      <div className="mt-5 flex flex-col gap-2">
        <div className="text-accent mx-auto w-fit rounded-lg bg-gradient-to-b from-[#3BBBF6] to-[#266DF0] px-8 py-1.5 text-center text-[15px] max-md:text-sm">
          {t("terms")}
        </div>
        <p className="mt-3 text-center text-4xl text-[#00326B] capitalize max-md:text-2xl">{contractTerm || 0}</p>
      </div>
    </div>
  );
};

export default ContractTerms;
