import { useTranslations } from "next-intl";
import Image from "next/image";
import React from "react";

const DealSummary = ({
  userCompanyLogo,
  dealCompanyLogo,
}: {
  userCompanyLogo: string | null | undefined;
  dealCompanyLogo: string | null | undefined;
}) => {
  const t = useTranslations("deal");

  return (
    <div className="mt-[101px] mb-24">
      <p className="text-accent mx-auto flex w-fit items-center gap-2 text-[17px] tracking-[-4%] capitalize">
        <span className="h-2.5 w-2.5 rounded-full bg-[#AFF300]" />
        <span>{t("dealSummary")}</span>
      </p>
      <h1 className="text-accent mt-9 text-center text-[100px] font-light tracking-[-4px] capitalize max-2xl:text-7xl max-sm:text-5xl">
        {t("dealClosed")}!
      </h1>
      <div className="mt-16 flex items-center justify-center gap-[42px]">
        <div className="bg-background flex aspect-square w-20 items-center justify-center rounded-[22px]">
          <Image
            src={userCompanyLogo || ""}
            alt="User Company Logo"
            className="rounded-lg text-xs"
            width={41}
            height={41}
          />
        </div>
        <Image
          src="/images/handshake.png"
          alt="Deal Company Logo"
          width={70}
          height={70}
          draggable="false"
          className="select-none"
        />
        <div className="bg-background flex aspect-square w-20 items-center justify-center rounded-[22px]">
          <Image
            src={dealCompanyLogo || ""}
            alt="Deal Company Logo"
            className="rounded-lg text-xs"
            width={41}
            height={41}
          />
        </div>
      </div>
    </div>
  );
};

export default DealSummary;
