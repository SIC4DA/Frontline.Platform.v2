"use client";

import { LoaderCircle, Mail } from "lucide-react";
import { useTranslations } from "next-intl";
import { useActionState } from "react";

import { forgotPasswordAction } from "@/actions/forgot-password";
import FormError from "@/components/shared/FormError";
import { InputWithIcon } from "@/components/ui/InputWithIcon";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ForgotPasswordFormProps = {
  initialErrorMessage?: string;
};

function ForgotPasswordForm({ initialErrorMessage }: ForgotPasswordFormProps) {
  const t = useTranslations("auth");
  const [state, formAction, isPending] = useActionState(forgotPasswordAction, {
    status: "idle",
    email: "",
  });

  const formError = state.errors?.form?.[0] ?? initialErrorMessage;

  return (
    <form action={formAction} className="w-full">
      {formError && <FormError errorMessage={formError} />}

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
      </div>

      <Button type="submit" variant="primary" disabled={isPending} className="mt-4 w-full text-base capitalize">
        {isPending ? (
          <>
            <LoaderCircle size={21} className="animate-spin" />
            {t("sendingResetLink")}
          </>
        ) : (
          t("sendResetLink")
        )}
      </Button>
    </form>
  );
}

export default ForgotPasswordForm;
