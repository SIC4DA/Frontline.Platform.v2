"use client";

import { RefObject, useState } from "react";

import { useOnboardingStore } from "@/store/onboarding";
import { Brand } from "@/types/brands";

import { useGet } from "../api/useGet";
import useClickedOutside from "../shared/useClickedOutside";
import useDebounce from "../shared/useDebounce";

const useCompanyName = (ref: RefObject<HTMLDivElement | null>) => {
  const { companyName } = useOnboardingStore();
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const debouncedValue = useDebounce<string>(companyName, 300);
  useClickedOutside(ref, () => {
    setIsPopoverOpen(false);
  });

  const { data, isLoading, error } = useGet<Brand[]>({
    endpoint: `https://api.brandfetch.io/v2/search/${debouncedValue}`,
    queryKey: ["brands", debouncedValue],
    queryOptions: {
      enabled: !!debouncedValue,
    },
  });

  return { data, isLoading, error, isPopoverOpen, setIsPopoverOpen };
};

export default useCompanyName;
