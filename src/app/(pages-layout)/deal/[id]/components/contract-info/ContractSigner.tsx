import { DollarSign, FileText } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";

const ContractSigner = ({ contractSigner }: { contractSigner: string | undefined | null }) => {
  const t = useTranslations("deal");

  return (
    <div className="border-border outline-border col-span-2 flex items-center justify-between rounded-xl border bg-gradient-to-b from-[#FCFCFC] to-[#e2eefe] px-8 py-4 outline outline-offset-8 max-md:col-span-1 max-md:flex-col">
      <div className="max-md:order-2">
        <div className="text-accent w-fit rounded-lg bg-gradient-to-b from-[#3BBBF6] to-[#266DF0] px-6 py-1.5 text-center text-[15px] max-md:text-sm">
          {t("contractSigner")}
        </div>
        <p className="mt-5 text-4xl text-[#00326B] capitalize max-md:text-2xl">
          {contractSigner || "Contract Signer, Signer Role"}
        </p>
        <div className="mt-9 flex flex-wrap items-center gap-3">
          <div className="bg-background flex items-center gap-2 rounded-lg px-3 py-2">
            <span className="text-foreground-secondary">
              <FileText className="size-[18px] stroke-[1.5px]" />
            </span>
            <div className="flex flex-wrap items-center gap-1 text-[13px] font-medium">
              <span>{1}</span>
              <span>{t("yearAgreement")}</span>
            </div>
          </div>
          <div className="bg-background flex items-center gap-2 rounded-lg px-3 py-2">
            <span className="text-foreground-secondary">
              <DollarSign className="size-[18px] stroke-[1.5px]" />
            </span>
            <p className="text-[13px] font-medium">{t("netInvoice", { value: "30 days" })}</p>
          </div>
        </div>
      </div>
      <Image
        src="/images/signer.svg"
        alt="contract signer"
        className="h-full w-1/3 max-md:order-1 max-md:w-1/2"
        width={100}
        height={100}
      />
    </div>
  );
};

export default ContractSigner;
