"use client";

import useDebounce from "@/hooks/shared/useDebounce";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import House from "../../../../public/icons/House";
import MagicPen from "../../../../public/icons/MagicPen";
import Setting from "../../../../public/icons/Setting";
import Star from "../../../../public/icons/Star";

const links = [
  {
    label: "home",
    href: "/home",
    icon: <House />,
  },
  {
    label: "frontlineAI",
    href: "/frontline-ai",
    icon: <MagicPen />,
  },
  {
    label: "leaderboardAndBadges",
    href: "/leaderboard-and-badges",
    icon: <Star />,
  },
  {
    label: "settings",
    href: "/settings",
    icon: <Setting />,
  },
];

const SidebarLinks = ({ isSidebarActive }: { isSidebarActive: boolean }) => {
  const t = useTranslations("sidebar");
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href;
  const debouncedSidebarActivity = useDebounce(isSidebarActive, 100);

  return (
    <nav
      className={cn(
        "mb-14 flex flex-col gap-3",
        !isSidebarActive && "items-center",
      )}
    >
      {links.map((link) => (
        <Link
          key={link.label}
          href={link.href}
          className={cn(
            "text-foreground-secondary hover:text-foreground stroke-foreground-secondary hover:bg-background-secondary hover:stroke-foreground flex items-center gap-4 rounded-lg fill-none px-4 py-2 text-sm font-medium duration-300",
            isActive(link.href) &&
              "text-foreground bg-background-secondary w-fit",
            !isSidebarActive && "justify-center gap-0 px-3",
          )}
        >
          <span className="size-6">
            {React.cloneElement(link.icon, {
              isActive: isActive(link.href),
            })}
          </span>
          <p
            className={cn(
              "hidden whitespace-nowrap opacity-0 duration-300",
              isSidebarActive && "block",
              debouncedSidebarActivity && "opacity-100",
            )}
          >
            {t(link.label)}
          </p>
        </Link>
      ))}
    </nav>
  );
};

export default SidebarLinks;
