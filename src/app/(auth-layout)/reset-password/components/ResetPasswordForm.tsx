"use client";

import { KeyRound, LoaderCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import { useActionState } from "react";

import { resetPasswordAction } from "@/actions/reset-password";
import FormError from "@/components/shared/FormError";
import { InputWithIcon } from "@/components/ui/InputWithIcon";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ResetPasswordFormProps = {
  token: string;
};

function ResetPasswordForm({ token }: ResetPasswordFormProps) {
  const t = useTranslations("auth");
  const [state, formAction, isPending] = useActionState(resetPasswordAction, {
    status: "idle",
    password: "",
    confirmPassword: "",
  });

  return (
    <form action={formAction} className="w-full">
      {state.errors?.form?.[0] && <FormError errorMessage={state.errors.form[0]} />}

      <input type="hidden" name="token" value={token} />

      <div className="flex flex-col gap-5">
        <div>
          <InputWithIcon
            type="password"
            name="password"
            defaultValue={state.password}
            startIcon={<KeyRound strokeWidth={1.5} className="text-foreground-secondary/90" size={21} />}
            placeholder={t("newPasswordPlaceholder")}
            className={cn("h-10 text-sm", state.errors?.password && "border-error")}
          />
          {state.errors?.password && <p className="text-error mt-1 text-sm">{state.errors.password[0]}</p>}
        </div>
        <div>
          <InputWithIcon
            type="password"
            name="confirmPassword"
            defaultValue={state.confirmPassword}
            startIcon={<KeyRound strokeWidth={1.5} className="text-foreground-secondary/90" size={21} />}
            placeholder={t("confirmPasswordPlaceholder")}
            className={cn("h-10 text-sm", state.errors?.confirmPassword && "border-error")}
          />
          {state.errors?.confirmPassword && (
            <p className="text-error mt-1 text-sm">{state.errors.confirmPassword[0]}</p>
          )}
        </div>
      </div>

      <Button type="submit" variant="primary" disabled={isPending} className="mt-4 w-full text-base capitalize">
        {isPending ? (
          <>
            <LoaderCircle size={21} className="animate-spin" />
            {t("resettingPassword")}
          </>
        ) : (
          t("resetPasswordButton")
        )}
      </Button>
    </form>
  );
}

export default ResetPasswordForm;
