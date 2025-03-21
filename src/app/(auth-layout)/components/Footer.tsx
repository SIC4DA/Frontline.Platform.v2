import { useTranslations } from "next-intl";
import Link from "next/link";
import React from "react";

function Footer() {
  const t = useTranslations("auth");

  return (
    <footer className="w-full">
      <p className="text-foreground-secondary max-w-[430px] mx-auto text-center font-light">
        <span>{t("proceedingAgreement")}</span>{" "}
        <Link className="underline capitalize" href="/terms-and-conditions">
          {t("termsAndConditions")}
        </Link>
      </p>
    </footer>
  );
}

export default Footer;
