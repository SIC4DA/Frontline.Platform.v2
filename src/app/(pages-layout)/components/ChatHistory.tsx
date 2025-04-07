"use client";

import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useState } from "react";

const ChatHistory = () => {
  const t = useTranslations("sidebar");
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="flex flex-col gap-3">
      <button
        className="flex items-center justify-between"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-sm font-medium text-[#4B5563] max-2xl:text-xs">
          {t("today")}
        </h3>
        <span>
          <ChevronDown
            style={{
              transform: isOpen
                ? "rotate(360deg) scale(1, -1)"
                : "rotate(0deg)",
            }}
            className="text-[#4B5563] duration-300"
            size={18}
          />
        </span>
      </button>
      <div
        className={cn(
          "max-h-0 overflow-hidden duration-300",
          isOpen && "max-h-96",
        )}
      >
        <div className="flex items-center gap-4 rounded-lg bg-[#F5F5F7] px-4 py-3">
          <Image
            src="/images/google.webp"
            alt="google"
            width={20}
            height={20}
            className="aspect-square size-5"
          />
          <p className="text-foreground text-sm max-2xl:text-xs">Google</p>
        </div>
      </div>
    </div>
  );
};

export default ChatHistory;
