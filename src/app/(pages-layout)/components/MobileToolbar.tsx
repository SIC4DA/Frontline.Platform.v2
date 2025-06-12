"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

import { cn } from "@/lib/utils";

import House from "../../../../public/icons/House";
import MagicPen from "../../../../public/icons/MagicPen";
import Setting from "../../../../public/icons/Setting";
import Star from "../../../../public/icons/Star";

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

const MobileToolbar = () => {
  const pathname = usePathname();
  const isActive = (href: string) => pathname.includes(href);

  return (
    <div className="bg-background border-border fixed bottom-0 left-0 z-40 hidden w-full justify-between border-t px-10 py-4 max-sm:flex">
      {links.map((link) => (
        <Link
          key={link.label}
          href={link.href}
          title={link.label}
          className={cn(
            "stroke-foreground-secondary hover:bg-background-secondary rounded-lg fill-none p-3",
            isActive(link.href) && "bg-background-secondary",
          )}>
          <span className="size-6">
            {React.cloneElement(link.icon, {
              isActive: isActive(link.href),
            })}
          </span>
        </Link>
      ))}
    </div>
  );
};

export default MobileToolbar;
