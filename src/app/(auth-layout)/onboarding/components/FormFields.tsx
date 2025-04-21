"use client";

import { useTranslations } from "next-intl";

import { RegisterActionState } from "@/actions/register";
import { InputWithIcon } from "@/components/ui/InputWithIcon";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useOnboardingStore } from "@/store/onboarding";

import CompanyAutoComplete from "./CompanyAutoComplete";

const formElements = [
  {
    label: "fullName",
    id: "fullName",
    placeholder: "fullNamePlaceholder",
    type: "text",
  },
  {
    label: "username",
    id: "username",
    placeholder: "usernamePlaceholder",
    type: "text",
  },
];

const FormFields = ({ state }: { state: RegisterActionState }) => {
  const t = useTranslations("auth");
  const { updateOnboardingState } = useOnboardingStore();

  return (
    <fieldset className="flex flex-col gap-5">
      {formElements.map((element) => {
        return (
          <div key={element.id}>
            <label className="mb-2 text-sm" htmlFor={element.id}>
              {t(element.label)}
            </label>
            <Input
              type={element.type}
              id={element.id}
              name={element.id}
              defaultValue={state[element.id as keyof typeof state] as string}
              onChange={(e) => updateOnboardingState(element.id, e.target.value)}
              placeholder={t(element.placeholder)}
              className={cn(
                "text-sm placeholder:text-sm",
                state.errors?.[element.id as keyof typeof state.errors] && "border-error",
              )}
            />
            {state.errors?.[element.id as keyof typeof state.errors] && (
              <p className="mt-1 text-xs text-red-600">
                {(state.errors[element.id as keyof typeof state.errors] as string[])?.[0]}
              </p>
            )}
          </div>
        );
      })}
      <CompanyAutoComplete state={state} />
      <div>
        <label className="mb-2 text-sm" htmlFor="password">
          {t("passwordPlaceholder")}
        </label>
        <InputWithIcon
          type="password"
          id="password"
          name="password"
          defaultValue={state.password as string}
          onChange={(e) => updateOnboardingState("password", e.target.value)}
          placeholder={t("passwordPlaceholder")}
          className={cn("h-10 text-sm", state.errors?.password && "border-error")}
        />
        {state.errors?.password && (
          <p className="mt-1 text-xs text-red-600">{(state.errors.password as string[])?.[0]}</p>
        )}
      </div>
    </fieldset>
  );
};

export default FormFields;
