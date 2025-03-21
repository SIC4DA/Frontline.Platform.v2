import { useTranslations } from "next-intl";
import LoginForm from "./components/LoginForm";
import OauthOptions from "@/components/auth/OauthOptions";

export default function LoginPage() {
  const t = useTranslations("auth");

  return (
    <section className="w-full max-w-[495px] flex-col flex-grow flex items-center justify-center">
      <h1 className="text-3xl mb-16">{t("welcomeBack")}</h1>
      <LoginForm />
      <OauthOptions />
    </section>
  );
}
