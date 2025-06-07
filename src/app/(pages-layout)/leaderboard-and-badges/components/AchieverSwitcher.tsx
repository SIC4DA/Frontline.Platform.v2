"use client";

// import { useTranslations } from "next-intl";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import React from "react";

import useLeaderboardSwitcher from "@/hooks/leaderboard/useLeaderboardSwitcher";
import type { UserWithClosedDeals } from "@/services/leaderboard";

import TopAchieverCard from "./TopAchieverCard";

const AchieverSwitcher = ({
  users,
  currentCompanyLogo,
}: {
  users: UserWithClosedDeals[];
  currentCompanyLogo: string | null | undefined;
}) => {
  // const t = useTranslations("leaderboard");
  const { handleNext, handlePrev, currentAchiever, isSwitching } = useLeaderboardSwitcher(users);

  return (
    <div className="mb-10 max-xl:mb-24">
      <div className="mx-auto mb-5 flex w-fit items-center gap-4 rounded-lg bg-[#F5F5F5] px-6 py-3">
        <Image
          className="w-8 rounded-lg object-cover"
          width={32}
          height={32}
          src={currentCompanyLogo ?? "/images/company-placeholder.webp"}
          alt="company logo"
        />
        <p className="text-sm">{currentAchiever.title}</p>
      </div>
      <div className="relative mx-auto w-full max-w-[500px] duration-300">
        <button
          type="button"
          onClick={handlePrev}
          disabled={isSwitching}
          className="border-border absolute top-1/2 -left-20 -translate-y-1/2 rounded-full border p-2 duration-300 hover:opacity-80 active:scale-90 max-xl:top-[unset] max-xl:-bottom-20 max-xl:left-10">
          <ChevronLeft size={22} />
        </button>
        <div
          style={{
            opacity: isSwitching ? 0 : 1,
            transition: "opacity 0.5s",
          }}>
          <TopAchieverCard topAchieverData={users[0]} />
        </div>
        <button
          type="button"
          onClick={handleNext}
          disabled={isSwitching}
          className="border-border absolute top-1/2 -right-20 -translate-y-1/2 rounded-full border p-2 duration-300 hover:opacity-80 active:scale-90 max-xl:top-[unset] max-xl:right-[unset] max-xl:-bottom-20 max-xl:left-[calc(100%-80px)]">
          <ChevronRight size={22} />
        </button>
      </div>
    </div>
  );
};

export default AchieverSwitcher;
