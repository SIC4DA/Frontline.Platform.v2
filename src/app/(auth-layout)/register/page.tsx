import OauthOptions from "@/components/auth/OauthOptions";
import { getTranslations } from "next-intl/server";
import RegisterForm from "./components/RegisterForm";

export default async function RegisterPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const t = await getTranslations("auth");
  const { error } = await searchParams;

  return (
    <section className="flex w-full max-w-[495px] flex-grow flex-col items-center justify-center">
      <h1 className="mb-16 text-3xl">{t("signUp")}</h1>
      <RegisterForm formError={error} />
      <OauthOptions />
    </section>
  );
}
