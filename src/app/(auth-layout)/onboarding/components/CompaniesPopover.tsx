import { cn } from "@/lib/utils";
import { useOnboardingStore } from "@/store/onboarding";
import { Brand } from "@/types/brands";
import { LoaderCircle } from "lucide-react";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import Image from "next/image";

const CompaniesPopover = ({
  companies,
  isLoading,
  setIsPopoverOpen,
}: {
  companies: Brand[] | undefined;
  isLoading: boolean;
  setIsPopoverOpen: (value: boolean) => void;
}) => {
  const t = useTranslations("auth");
  const { updateOnboardingState } = useOnboardingStore();
  const handleCompanySelect = (brand: Brand) => {
    updateOnboardingState("companyName", brand.name);
    setIsPopoverOpen(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "bg-background border-border absolute -bottom-[195px] left-0 z-[2] h-48 w-full overflow-auto rounded-lg border p-2",
        (isLoading || !companies || companies?.length === 0) && "flex items-center justify-center",
      )}>
      {isLoading && <LoaderCircle size={21} className="animate-spin" />}
      {(!companies || companies?.length === 0) && !isLoading && (
        <p className="text-foreground-secondary text-xs">{t("noResults")}</p>
      )}
      {companies && companies?.length > 0 && (
        <div className="flex flex-col gap-2">
          {companies?.map((brand) => (
            <button
              key={brand.brandId}
              onClick={() => handleCompanySelect(brand)}
              className="hover:bg-background-secondary flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 duration-300">
              <Image
                src={brand.icon}
                alt={brand.name}
                width={34}
                height={34}
                className="aspect-square w-8 rounded-xl object-cover"
              />
              <p className="text-sm font-medium capitalize">{brand.name}</p>
            </button>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default CompaniesPopover;
