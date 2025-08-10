import { Check, Link2 } from "lucide-react";
import { useTranslations } from "next-intl";
import React, { useState } from "react";

const CopyLinkButton = ({ link }: { link: string }) => {
  const t = useTranslations("deal");
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyLink = () => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(link);
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    }
  };

  return (
    <button
      onClick={handleCopyLink}
      className="text-primary-foreground flex items-center gap-2 rounded-md bg-[#369FEA] px-4 py-2 duration-300 hover:bg-[#369FEA]/90 active:scale-95 max-sm:w-full max-sm:justify-center">
      {isCopied ? <Check className="size-4" /> : <Link2 className="size-4" />}
      <span className="text-sm">{isCopied ? t("copied") : t("copyLink")}</span>
    </button>
  );
};

export default CopyLinkButton;
