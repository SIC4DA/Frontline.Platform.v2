import { getTranslations } from "next-intl/server";
import Link from "next/link";

import ForgotPasswordForm from "./components/ForgotPasswordForm";

export default async function ForgotPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const t = await getTranslations("auth");
  const params = await searchParams;

  const rawError = params.error;
  const errorParam = Array.isArray(rawError) ? rawError[0] : rawError;

  let initialErrorMessage: string | undefined;

  if (errorParam === "missing-token") {
    initialErrorMessage = t("resetTokenMissing");
  }

  return (
    <section className="flex w-full max-w-[495px] flex-grow flex-col items-center justify-center">
      <h1 className="mb-4 text-2xl">{t("forgotPassword")}</h1>
      <p className="text-foreground-secondary/90 mb-10 text-center text-base">{t("forgotPasswordDescription")}</p>
      <ForgotPasswordForm initialErrorMessage={initialErrorMessage} />
      <p className="mt-8 text-sm">
        <Link className="text-primary underline" href="/login">
          {t("backToLogin")}
        </Link>
      </p>
    </section>
  );
}
