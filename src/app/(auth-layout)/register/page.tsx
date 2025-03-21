import { useTranslations } from "next-intl";
import RegisterForm from "./components/RegisterForm";
import OauthOptions from "@/components/auth/OauthOptions";

export default function RegisterPage() {
  const t = useTranslations("auth");

  return (
    <section className="w-full max-w-[495px] flex-col flex-grow flex items-center justify-center">
      <h1 className="text-3xl mb-16">{t("signUp")}</h1>
      <RegisterForm />
      <OauthOptions />
    </section>
  );
}
