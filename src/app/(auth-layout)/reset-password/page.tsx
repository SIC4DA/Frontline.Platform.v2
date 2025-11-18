import { getTranslations } from "next-intl/server";
import { redirect } from "next/navigation";

import ResetPasswordForm from "./components/ResetPasswordForm";

export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const t = await getTranslations("auth");
  const params = await searchParams;

  const rawToken = params.token;

  const token = Array.isArray(rawToken) ? rawToken[0] : rawToken;

  if (!token) {
    return redirect("/forgot-password?error=missing-token");
  }

  return (
    <section className="flex w-full max-w-[495px] flex-grow flex-col items-center justify-center">
      <h1 className="mb-4 text-2xl">{t("resetPassword")}</h1>
      <p className="text-foreground-secondary/90 mb-10 text-center text-base">{t("resetPasswordDescription")}</p>
      <ResetPasswordForm token={token} />
    </section>
  );
}
