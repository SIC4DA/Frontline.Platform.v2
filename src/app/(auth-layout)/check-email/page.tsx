import { InputWithIcon } from "@/components/ui/InputWithIcon";
import { Mail } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { redirect } from "next/navigation";

export default async function CheckEmailPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const t = await getTranslations("auth");
  const { email } = await searchParams;

  if (!email) {
    return redirect("/register");
  }

  return (
    <section className="flex w-full max-w-[495px] flex-grow flex-col items-center justify-center">
      <h1 className="mb-7 text-3xl">{t("checkEmail")}</h1>
      <p className="text-foreground-secondary/90 mb-16 max-w-md text-center text-base">
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
