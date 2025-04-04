import { getTranslations } from "next-intl/server";
import { redirect } from "next/navigation";
import HomeCard from "./components/HomeCard";
import OnboardingForm from "./components/OnboardingForm";

export default async function OnboardingPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const t = await getTranslations("auth");
  const { email, token } = await searchParams;

  if (!email || !token) {
    return redirect("/register");
  }

  return (
    <section className="flex w-full max-w-[1294px] flex-grow items-center justify-center">
      <div className="border-border bg-background grid w-full grid-cols-2 rounded-xl border max-lg:grid-cols-1 max-lg:gap-x-0">
        <div className="px-18 py-14 max-lg:px-8 max-lg:py-8 max-sm:px-2">
          <h1 className="mb-14 text-[22px] font-medium max-sm:text-center">{t("setupAccount")}</h1>
          <OnboardingForm email={email} token={token} />
        </div>
        <div className="bg-background-secondary border-border relative overflow-hidden border-l max-lg:hidden">
          <HomeCard />
        </div>
      </div>
    </section>
  );
}
