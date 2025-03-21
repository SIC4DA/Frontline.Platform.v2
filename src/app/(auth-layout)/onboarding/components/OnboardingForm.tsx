"use client";

import { registerAction } from "@/actions/register";
import { useTranslations } from "next-intl";
import ImageUploader from "./ImageUploader";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useActionState } from "react";
import { LoaderCircle } from "lucide-react";

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

const OnboardingForm = ({ email }: { email: string }) => {
  const t = useTranslations("auth");
  const [state, formAction, isPending] = useActionState(registerAction, {
    status: "idle",
    firstName: "",
    lastName: "",
    companyName: "",
    password: "",
    profileImage: "",
  });

  const actionWithEmail = (formData: FormData) => {
    formData.append("email", email);
    return formAction(formData);
  };

  return (
    <form action={actionWithEmail} className="flex flex-col gap-10">
      {/* Form error message */}
      {state.errors?.form && (
        <div className="rounded-md bg-red-50 p-4">
          <p className="text-sm text-red-700">
            {state.errors.form[0] || "An error occurred, please try again"}
          </p>
        </div>
      )}

      <ImageUploader defaultValue={state.profileImage} />

      <fieldset className="flex flex-col gap-6">
        {formElements.map((element) => (
          <div key={element.id}>
            <label className="text-sm mb-2" htmlFor={element.id}>
              {t(element.label)}
            </label>
            <Input
              type={element.type}
              id={element.id}
              name={element.id}
              defaultValue={state[element.id as keyof typeof state] as string}
              placeholder={t(element.placeholder)}
              className="text-sm"
            />
            {state.errors?.[element.id as keyof typeof state.errors] && (
              <p className="mt-1 text-sm text-red-600">
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
        size="lg"
        className="capitalize"
        type="submit"
        disabled={isPending}
      >
        {isPending ? (
          <>
            <LoaderCircle size={21} className="animate-spin mr-2" />
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
