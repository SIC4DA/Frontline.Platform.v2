import { useTranslations } from "next-intl";
import Link from "next/link";

function Footer() {
  const t = useTranslations("auth");

  return (
    <footer className="w-full">
      <p className="text-foreground-secondary mx-auto max-w-[430px] text-center">
        <span>{t("proceedingAgreement")}</span>{" "}
        <Link className="capitalize underline" href="/terms-and-conditions">
          {t("termsAndConditions")}
        </Link>
      </p>
    </footer>
  );
}

export default Footer;
