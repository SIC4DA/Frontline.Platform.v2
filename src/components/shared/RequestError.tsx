import { TriangleAlert } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";

const RequestError = () => {
  const t = useTranslations("errors");

  return (
    <div className="mx-auto w-fit text-center capitalize">
      <TriangleAlert size={60} strokeWidth={1.5} className="mx-auto mb-2 text-red-500" />
      <p className="mb-5 max-w-[400px] text-xl dark:text-white">{t("requestError")}</p>
      <Link
        href="/home"
        className="bg-primary rounded-[12px] px-4 py-2 text-white duration-300 hover:opacity-85 active:scale-95">
        {t("backToHome")}
      </Link>
    </div>
  );
};

export default RequestError;
