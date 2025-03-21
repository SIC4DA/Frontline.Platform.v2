"use client";

import { InputWithIcon } from "@/components/ui/InputWithIcon";
import { LoaderCircle, Mail } from "lucide-react";
import React, { useActionState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { sendVerificationEmailAction } from "@/actions/send-verification-email";

const RegisterForm = () => {
  const t = useTranslations("auth");
  const [state, formAction, isPending] = useActionState(
    sendVerificationEmailAction,
    {
      status: "idle",
      email: "",
      errors: {},
    }
  );

  return (
    <form action={formAction} className="w-full">
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
      <Button
        disabled={isPending}
        size="lg"
        className="capitalize w-full mt-4 text-base"
      >
        {isPending ? (
          <>
            <LoaderCircle size={21} className="animate-spin" />
            {t("checkingEmail")}
          </>
        ) : (
          t("continue")
        )}
      </Button>
    </form>
  );
};

export default RegisterForm;
