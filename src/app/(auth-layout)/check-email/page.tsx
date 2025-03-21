import { InputWithIcon } from "@/components/ui/InputWithIcon";
import { Mail } from "lucide-react";
import { useTranslations } from "next-intl";
import { redirect } from "next/navigation";

export default async function CheckEmailPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const t = useTranslations("auth");
  const { email } = await searchParams;

  if (!email) {
    return redirect("/register");
  }

  return (
    <section className="w-full max-w-[495px] flex-col flex-grow flex items-center justify-center">
      <h1 className="text-3xl mb-7">{t("checkEmail")}</h1>
      <p className="text-base font-light text-foreground-secondary/90 mb-16 text-center max-w-md">
        {t("checkEmailDescription")}
      </p>
      <InputWithIcon
        type="email"
        name="email"
        startIcon={
          <Mail
            strokeWidth={1.5}
            className="text-foreground-secondary/90"
            size={21}
          />
        }
        disabled
        value={email}
        className="h-11"
        wrapperClassName="w-full"
      />
    </section>
  );
}
