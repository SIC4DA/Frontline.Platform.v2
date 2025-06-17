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
    <div className="my-40">
      <p className="text-accent mx-auto flex w-fit items-center gap-2 capitalize">
        <span className="h-2.5 w-2.5 rounded-full bg-[#AFF300]" />
        <span>{t("dealSummary")}</span>
      </p>
      <h1 className="text-accent mt-5 text-center text-8xl font-light capitalize max-2xl:text-7xl max-sm:text-5xl">
        {t("dealClosed")}!
      </h1>
      <div className="mt-14 flex items-center justify-center gap-9">
        <div className="bg-background flex aspect-square w-20 items-center justify-center rounded-3xl">
          <Image
            src={userCompanyLogo || ""}
            alt="User Company Logo"
            className="rounded-lg text-xs"
            width={40}
            height={40}
          />
        </div>
        <div className="text-6xl">🤝</div>
        <div className="bg-background flex aspect-square w-20 items-center justify-center rounded-3xl">
          <Image
            src={dealCompanyLogo || ""}
            alt="Deal Company Logo"
            className="rounded-lg text-xs"
            width={40}
            height={40}
          />
        </div>
      </div>
    </div>
  );
};

export default DealSummary;
