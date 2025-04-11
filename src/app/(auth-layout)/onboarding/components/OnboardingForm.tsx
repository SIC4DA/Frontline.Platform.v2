"use client";

import { registerAction } from "@/actions/register";
import FormError from "@/components/shared/FormError";
import { Button } from "@/components/ui/button";
import { useOnboardingStore } from "@/store/onboarding";
import { LoaderCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import { useActionState, useEffect } from "react";
import FormFields from "./FormFields";
import ImageUploader from "./ImageUploader";

const OnboardingForm = ({ email, token }: { email: string; token: string }) => {
  const t = useTranslations("auth");
  const { resetStore } = useOnboardingStore();
  const [state, formAction, isPending] = useActionState(registerAction, {
    status: "idle",
    fullName: "",
    username: "",
    companyName: "",
    password: "",
  });

  useEffect(() => {
    return () => {
      resetStore();
    };
  }, [resetStore]);

  const actionWithEmail = (formData: FormData) => {
    formData.append("email", email);
    formData.append("token", token);
    return formAction(formData);
  };

  return (
    <form action={actionWithEmail} className="flex flex-col gap-8">
      {/* Form error message */}
      {state.errors?.form && (
        <FormError errorMessage={state.errors?.form?.[0] || "An error occurred, please try again"} />
      )}

      <ImageUploader formStatus={state.status} />

      <FormFields state={state} />

      <Button className="capitalize" type="submit" variant="primary" disabled={isPending}>
        {isPending ? (
          <>
            <LoaderCircle size={21} className="mr-2 animate-spin" />
            {t("signingUp")}
          </>
        ) : (
          t("continue")
        )}
      </Button>
    </form>
  );
};

export default OnboardingForm;
