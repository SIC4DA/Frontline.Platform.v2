"use client";

import { TimeframeChats } from "@/hooks/chat/useChatHistory";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const HistoryTimeFrame = ({ timeframeData }: { timeframeData: TimeframeChats }) => {
  const t = useTranslations("sidebar");
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="flex flex-col gap-3">
      <button className="flex items-center justify-between" onClick={() => setIsOpen(!isOpen)}>
        <h3 className="text-sm font-medium text-[#4B5563] max-2xl:text-xs">{t(timeframeData.title)}</h3>
        <span>
          <ChevronDown
            style={{
              transform: isOpen ? "rotate(360deg) scale(1, -1)" : "rotate(0deg)",
            }}
            className="text-[#4B5563] duration-300"
            size={18}
          />
        </span>
      </button>
      <div className={cn("flex max-h-0 flex-col gap-2 overflow-hidden duration-300", isOpen && "max-h-96")}>
        {timeframeData.chats.map((chat) => (
          <Link
            key={chat.id}
            href={`/frontline-ai/${chat.id}`}
            className="flex items-center gap-4 rounded-lg px-4 py-3 duration-300 hover:bg-[#F5F5F7]">
            <Image
              src={chat.deal.companyLogo || "/images/google.webp"}
              alt="google"
              width={20}
              height={20}
              className="aspect-square size-5 rounded"
            />
            <p className="text-foreground text-sm max-2xl:text-xs">{chat.deal.companyName}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HistoryTimeFrame;
