import { useTranslations } from "next-intl";

const FormError = ({ errorMessage }: { errorMessage: string }) => {
  const t = useTranslations("auth");

  return (
    <div className="bg-error/10 mb-5 items-center gap-5 rounded-[12px] px-10 py-3 shadow">
      <p className="text-error">
        {errorMessage} <br />
        {t("checkDetails")}
      </p>
    </div>
  );
};

export default FormError;
