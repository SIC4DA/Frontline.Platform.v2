"use client";

import { BadgeCheck } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";

import { useOnboardingStore } from "@/store/onboarding";

import Search from "../../../../../public/icons/Search";

const HomeCard = () => {
  const t = useTranslations("auth");
  const { fullName, username, profileImage } = useOnboardingStore();

  // Display fallback values if store values are empty
  const displayName = fullName || t("yourName");
  const displayUsername = username || t("yourUsername");

  return (
    <div className="absolute top-1/2 -right-28 -translate-y-1/2">
      <div className="relative h-[200px] w-[600px] rounded-xl bg-gradient-to-b from-[#266DF0] to-[#89D9FF]">
        <div className="border-background absolute -bottom-10 left-7 aspect-square w-24 overflow-hidden rounded-[29px] border-[5px] shadow-2xl duration-300">
          {profileImage ? (
            <Image src={profileImage} alt="Profile" width={96} height={96} className="h-full w-full object-cover" />
          ) : (
            <div className="h-full w-full bg-[#C4C4C4]" />
          )}
        </div>
      </div>
      <div className="mt-14 px-8">
        <div className="mb-3">
          <div className="flex items-center gap-1">
            <h1 className="-mt-0.5 text-lg font-medium capitalize">{displayName}</h1>
            <BadgeCheck fill="#49adf4" className="size-[18px]" stroke="#fff" />
          </div>
          <p className="text-foreground-secondary text-xs">@{displayUsername}</p>
        </div>
        <p className="text-sm">Hey there! I love frontline</p>
        <div className="mt-6 flex items-center gap-3 rounded-lg bg-[#F5F5F5] px-6 py-2">
          <label htmlFor="search-sales" className="stroke-foreground">
            <Search />
          </label>
          <input
            type="text"
            id="search-sales"
            disabled
            placeholder={t("searchPlaceholder")}
            className="placeholder:text-foreground-secondary text-foreground flex-grow bg-transparent py-1 text-sm focus:outline-0"
          />
        </div>
      </div>
    </div>
  );
};

export default HomeCard;
