import { useTranslations } from "next-intl";
import Link from "next/link";

import OauthOptions from "@/components/auth/OauthOptions";

import LoginForm from "./components/LoginForm";

export default function LoginPage() {
  const t = useTranslations("auth");

  return (
    <section className="flex w-full max-w-[495px] flex-grow flex-col items-center justify-center">
      <h1 className="mb-16 text-2xl">{t("welcomeBack")}</h1>
      <LoginForm />
      <OauthOptions />
      <p className="mt-8 text-sm">
        {t("noAccount")}
        <Link className="text-primary ms-1.5 underline" href="/register">
          {t("signUp")}
        </Link>
      </p>
    </section>
  );
}
