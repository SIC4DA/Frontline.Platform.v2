import { DollarSign, FileText } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";

import { Deal } from "@/types/deal";

import InfoChip from "../InfoChip";

const ContractSigner = ({ deal }: { deal: Deal | null | undefined }) => {
  const t = useTranslations("deal");

  return (
    <div className="relative col-span-2">
      <div className="absolute top-[-9px] left-[-9px] z-[1] h-[calc(100%+18px)] w-[calc(100%+18px)] bg-gradient-to-b from-[#f6faff] via-[#f6faff]/50 to-transparent" />
      <div className="border-border outline-border flex items-center justify-between rounded-[32px] border bg-gradient-to-b from-[#FCFCFC] to-[#e2eefe] px-8 py-4 outline outline-offset-8 max-md:col-span-1 max-md:flex-col">
        <div className="relative z-[2] max-md:order-2">
          <div className="text-accent w-fit rounded-lg bg-gradient-to-b from-[#3BBBF6] to-[#266DF0] px-6 py-1.5 text-center text-[15px] max-md:text-sm">
            {t("contractSigner")}
          </div>
          <p className="mt-5 text-4xl text-[#00326B] capitalize max-md:text-2xl">
            {deal?.contractSigner || "Contract Signer, Signer Role"}
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <InfoChip
              icon={<FileText className="size-[18px] stroke-[1.5px]" />}
              value={deal?.contractTerm}
              label={t("agreement")}
            />
            <InfoChip
              icon={<DollarSign className="size-[18px] stroke-[1.5px]" />}
              value={deal?.paymentTerms}
              label={t("invoice")}
            />
          </div>
        </div>
        <Image
          src="/images/signer.svg"
          alt="contract signer"
          className="relative z-[2] h-full w-1/3 max-md:order-1 max-md:w-1/2"
          width={100}
          height={100}
        />
      </div>
    </div>
  );
};

export default ContractSigner;
