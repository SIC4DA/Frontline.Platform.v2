import { useTranslations } from "next-intl";
import { useRef } from "react";

import { RegisterActionState } from "@/actions/register";
import { Input } from "@/components/ui/input";
import useCompanyName from "@/hooks/auth/useCompanyName";
import { cn } from "@/lib/utils";
import { useOnboardingStore } from "@/store/onboarding";

import CompaniesPopover from "./CompaniesPopover";

const CompanyAutoComplete = ({ state }: { state: RegisterActionState }) => {
  const t = useTranslations("auth");
  const { updateOnboardingState, companyName } = useOnboardingStore();
  const ref = useRef<HTMLDivElement>(null);
  const { data, isLoading, isPopoverOpen, setIsPopoverOpen } = useCompanyName(ref);

  const companyLogo = data?.find((company) => company.name === companyName)?.icon || "";

  return (
    <div ref={ref} className="relative">
      <div>
        <label className="mb-2 text-sm" htmlFor="companyName">
          {t("companyName")}
        </label>
        <Input
          type="text"
          id="companyName"
          name="companyName"
          value={companyName}
          onFocus={() => setIsPopoverOpen(true)}
          onChange={(e) => updateOnboardingState("companyName", e.target.value)}
          placeholder={t("companyNamePlaceholder")}
          className={cn("h-10 text-sm", state.errors?.companyName && "border-error")}
        />
        <input type="hidden" name="companyLogo" value={companyLogo} />
        {state.errors?.companyName && <p className="mt-1 text-xs text-red-600">{state.errors.companyName?.[0]}</p>}
      </div>
      {isPopoverOpen && <CompaniesPopover companies={data} isLoading={isLoading} setIsPopoverOpen={setIsPopoverOpen} />}
    </div>
  );
};

export default CompanyAutoComplete;
