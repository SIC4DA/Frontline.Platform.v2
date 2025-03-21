"use client";

import { loginAction } from "@/actions/login";
import { Button } from "@/components/ui/button";
import { InputWithIcon } from "@/components/ui/InputWithIcon";
import { KeyRound, LoaderCircle, Mail } from "lucide-react";
import { useTranslations } from "next-intl";
import { useActionState } from "react";

function LoginForm() {
  const t = useTranslations("auth");
  const [state, formAction, isPending] = useActionState(loginAction, {
    status: "idle",
    email: "",
    password: "",
  });

  return (
    <form action={formAction} className="w-full">
      {/* Form error message */}
      {state.errors?.form && (
        <div className="rounded-md bg-red-50 p-4 mb-5">
          <p className="text-sm text-red-700">
            {state.errors.form[0] || "An error occurred, please try again"}
          </p>
        </div>
      )}

      <div className="flex flex-col gap-[26px]">
        <div>
          <InputWithIcon
            type="email"
            name="email"
            defaultValue={state.email}
            startIcon={
              <Mail
                strokeWidth={1.5}
                className="text-foreground-secondary/90"
                size={21}
              />
            }
            placeholder={t("emailPlaceholder")}
            className="h-11"
          />
          {state.errors?.email && (
            <p className="mt-1 text-sm text-red-600">{state.errors.email[0]}</p>
          )}
        </div>
        <div>
          <InputWithIcon
            type="password"
            name="password"
            defaultValue={state.password}
            startIcon={
              <KeyRound
                strokeWidth={1.5}
                className="text-foreground-secondary/90"
                size={21}
              />
            }
            placeholder={t("passwordPlaceholder")}
            className="h-11"
          />
          {state.errors?.password && (
            <p className="mt-1 text-sm text-red-600">
              {state.errors.password[0]}
            </p>
          )}
        </div>
      </div>

      {/* Submit button */}
      <Button
        size="lg"
        disabled={isPending}
        className="capitalize w-full mt-4 text-base"
      >
        {isPending ? (
          <>
            <LoaderCircle size={21} className="animate-spin" />
            {t("signingIn")}
          </>
        ) : (
          t("continue")
        )}
      </Button>
    </form>
  );
}

export default LoginForm;
