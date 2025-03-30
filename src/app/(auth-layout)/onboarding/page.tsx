import { getTranslations } from "next-intl/server";
import { redirect } from "next/navigation";
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
      <div className="border-border bg-background grid w-full grid-cols-2 rounded-xl border">
        <div className="px-18 py-14">
          <h1 className="mb-14 text-[22px] font-medium">{t("setupAccount")}</h1>
          <OnboardingForm email={email} token={token} />
        </div>
        <div className="bg-background-secondary border-border border-l"></div>
      </div>
    </section>
  );
}
