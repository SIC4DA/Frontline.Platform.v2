"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

import { cn } from "@/lib/utils";

import House from "../../../../public/icons/House";
import MagicPen from "../../../../public/icons/MagicPen";
import Setting from "../../../../public/icons/Setting";
// import Star from "../../../../public/icons/Star";

const links = [
  {
    label: "home",
    href: "/",
    icon: <House />,
  },
  {
    label: "frontlineAI",
    href: "/frontline-ai",
    icon: <MagicPen />,
  },
  // {
  //   label: "leaderboardAndBadges",
  //   href: "/leaderboard-and-badges",
  //   icon: <Star />,
  // },
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

  return (
    <nav className={cn("mb-14 flex flex-col gap-3", !isSidebarActive && "items-center")}>
      {links.map((link) => (
        <Link
          key={link.label}
          href={link.href}
          className={cn(
            "text-foreground-secondary hover:text-foreground stroke-foreground-secondary hover:bg-background-secondary hover:stroke-foreground flex items-center gap-4 rounded-lg fill-none px-4 py-2 text-sm font-medium duration-300",
            isActive(link.href) && "text-foreground bg-background-secondary",
            !isSidebarActive && "w-fit justify-center gap-0 px-3",
          )}>
          <span>
            {React.cloneElement(link.icon, {
              isActive: isActive(link.href),
            })}
          </span>
          {isSidebarActive && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2, delay: 0.1 }}
              layout
              className="whitespace-nowrap duration-300">
              {t(link.label)}
            </motion.p>
          )}
        </Link>
      ))}
    </nav>
  );
};

export default SidebarLinks;
