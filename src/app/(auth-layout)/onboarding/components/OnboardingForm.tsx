"use client";

import { registerAction } from "@/actions/register";
import FormError from "@/components/shared/FormError";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { LoaderCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import { useActionState } from "react";
import ImageUploader from "./ImageUploader";

const formElements = [
  {
    label: "firstName",
    id: "firstName",
    placeholder: "firstNamePlaceholder",
    type: "text",
  },
  {
    label: "lastName",
    id: "lastName",
    placeholder: "lastNamePlaceholder",
    type: "text",
  },
  {
    label: "companyName",
    id: "companyName",
    placeholder: "companyNamePlaceholder",
    type: "text",
  },
  {
    label: "password",
    id: "password",
    placeholder: "passwordPlaceholder",
    type: "password",
  },
];

const OnboardingForm = ({ email, token }: { email: string; token: string }) => {
  const t = useTranslations("auth");
  const [state, formAction, isPending] = useActionState(registerAction, {
    status: "idle",
    firstName: "",
    lastName: "",
    companyName: "",
    password: "",
  });

  const actionWithEmail = (formData: FormData) => {
    formData.append("email", email);
    formData.append("token", token);
    return formAction(formData);
  };

  return (
    <form action={actionWithEmail} className="flex flex-col gap-8">
      {/* Form error message */}
      {state.errors?.form && (
        <FormError
          errorMessage={
            state.errors?.form?.[0] || "An error occurred, please try again"
          }
        />
      )}

      <ImageUploader formStatus={state.status} />

      <fieldset className="flex flex-col gap-5">
        {formElements.map((element) => (
          <div key={element.id}>
            <label className="mb-2 text-sm" htmlFor={element.id}>
              {t(element.label)}
            </label>
            <Input
              type={element.type}
              id={element.id}
              name={element.id}
              defaultValue={state[element.id as keyof typeof state] as string}
              placeholder={t(element.placeholder)}
              className={cn(
                "text-sm  placeholder:text-sm",
                state.errors?.[element.id as keyof typeof state.errors] &&
                  "border-error",
              )}
            />
            {state.errors?.[element.id as keyof typeof state.errors] && (
              <p className="mt-1 text-xs text-red-600">
                {
                  (
                    state.errors[
                      element.id as keyof typeof state.errors
                    ] as string[]
                  )?.[0]
                }
              </p>
            )}
          </div>
        ))}
      </fieldset>

      <Button
        className="capitalize"
        type="submit"
        variant="primary"
        disabled={isPending}
      >
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
