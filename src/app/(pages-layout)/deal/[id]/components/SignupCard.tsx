import { useTranslations } from "next-intl";
import Image from "next/image";
import React from "react";

import { Button } from "@/components/ui/button";

const SignupCard = () => {
  const t = useTranslations("deal");

  return (
    <div className="relative mt-40 rounded-[32px] bg-gradient-to-b from-[#F6FAFF] to-[#D3E6FF] p-6">
      <Image
        src="/images/compass.svg"
        alt="Compass image"
        className="absolute top-1/6 right-1/5 z-[1]"
        width={70}
        height={70}
        draggable={false}
        loading="lazy"
      />
      <Image
        src="/images/doc.svg"
        alt="Doc image"
        className="absolute top-1/16 left-1/5 z-[1]"
        width={80}
        height={80}
        draggable={false}
        loading="lazy"
      />
      <Image
        src="/images/cube.svg"
        alt="Cube image"
        className="absolute bottom-1/4 left-1/4 z-[1]"
        width={50}
        height={50}
        draggable={false}
        loading="lazy"
      />
      <div className="relative z-[2] my-24 flex flex-col gap-5">
        <h4 className="mx-auto max-w-lg text-center text-4xl leading-10 font-medium text-[#00326B]">{t("signup")}</h4>
        <Button variant="primary" className="mx-auto h-10 w-fit px-10">
          {t("getStarted")}
        </Button>
      </div>
    </div>
  );
};

export default SignupCard;
