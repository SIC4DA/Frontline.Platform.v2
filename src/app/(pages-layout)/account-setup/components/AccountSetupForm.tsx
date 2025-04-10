"use client";

import CompanyAutoComplete from "@/app/(auth-layout)/onboarding/components/CompanyAutoComplete";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { LoaderCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import { useActionState } from "react";
import { accountSetupAction } from "../actions/accountSetup";

const AccountSetupForm = () => {
  const t = useTranslations("auth");
  const [state, formAction, isPending] = useActionState(accountSetupAction, {
    status: "idle",
    username: "",
    companyName: "",
  });

  return (
    <form action={formAction} className="bg-background border-border w-full rounded-lg border p-10 max-md:px-4">
      <h2 className="mb-16 text-lg font-medium max-sm:text-center">{t("letsSetupYourAccount")}</h2>
      <fieldset className="mb-16 flex flex-col gap-5">
        <div>
          <label className="mb-2 text-sm" htmlFor="username">
            {t("username")}
          </label>
          <Input
            type="text"
            id="username"
            name="username"
            defaultValue={state.username}
            placeholder={t("usernamePlaceholder")}
            className={cn("h-10 text-sm", state.errors?.username && "border-error")}
          />
          {state.errors?.username && (
            <p className="mt-1 text-xs text-red-600">{(state.errors.username as string[])?.[0]}</p>
          )}
        </div>
        <CompanyAutoComplete state={state} />
      </fieldset>
      <Button className="w-full capitalize" type="submit" variant="primary" disabled={isPending}>
        {isPending ? (
          <>
            <LoaderCircle size={21} className="mr-2 animate-spin" />
            {t("settingUp")}
          </>
        ) : (
          t("continue")
        )}
      </Button>
    </form>
  );
};

export default AccountSetupForm;
