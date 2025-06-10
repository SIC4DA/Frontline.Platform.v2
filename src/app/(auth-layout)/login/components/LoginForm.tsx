"use client";

import { KeyRound, LoaderCircle, Mail } from "lucide-react";
import { useTranslations } from "next-intl";
import { useActionState } from "react";

import { loginAction } from "@/actions/login";
import FormError from "@/components/shared/FormError";
import { InputWithIcon } from "@/components/ui/InputWithIcon";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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
        <FormError errorMessage={state.errors?.form?.[0] || "An error occurred, please try again"} />
      )}

      <div className="flex flex-col gap-5">
        <div>
          <InputWithIcon
            type="email"
            name="email"
            defaultValue={state.email}
            startIcon={<Mail strokeWidth={1.5} className="text-foreground-secondary/90" size={21} />}
            placeholder={t("emailPlaceholder")}
            className={cn("h-10 text-sm", state.errors?.email && "border-error")}
          />
          {state.errors?.email && <p className="text-error mt-1 text-sm">{state.errors.email[0]}</p>}
        </div>
        <div>
          <InputWithIcon
            type="password"
            name="password"
            defaultValue={state.password}
            startIcon={<KeyRound strokeWidth={1.5} className="text-foreground-secondary/90" size={21} />}
            placeholder={t("passwordPlaceholder")}
            className={cn("h-10 text-sm", state.errors?.password && "border-error")}
          />
          {state.errors?.password && <p className="text-error mt-1 text-sm">{state.errors.password[0]}</p>}
        </div>
      </div>

      {/* Submit button */}
      <Button
        // size="lg"
        type="submit"
        variant="primary"
        disabled={isPending}
        className="mt-4 w-full text-base capitalize">
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
