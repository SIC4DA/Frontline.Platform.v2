import { getTranslations } from "next-intl/server";
import { redirect } from "next/navigation";
import OnboardingForm from "./components/OnboardingForm";

export default async function OnboardingPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const t = await getTranslations("auth");
  const { email } = await searchParams;

  if (!email || typeof email !== "string") {
    return redirect("/register");
  }

  return (
    <section className="w-full max-w-[1294px] flex-grow flex items-center justify-center">
      <div className="border border-border bg-background rounded-xl w-full  grid grid-cols-2">
        <div className="px-20 py-16">
          <h1 className="text-2xl mb-14 font-medium">{t("setupAccount")}</h1>
          <OnboardingForm email={email} />
        </div>
        <div className="bg-background-secondary border-l border-border"></div>
      </div>
    </section>
  );
}
