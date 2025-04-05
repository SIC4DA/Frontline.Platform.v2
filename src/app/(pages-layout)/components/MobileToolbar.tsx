"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
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

const MobileToolbar = () => {
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href;

  return (
    <div className="bg-background border-border fixed bottom-0 left-0 hidden w-full justify-between border-t px-10 py-4 max-sm:flex">
      {links.map((link) => (
        <Link
          key={link.label}
          href={link.href}
          title={link.label}
          className={cn(
            "hover:bg-background-secondary stroke-foreground-secondary rounded-lg p-3",
            isActive(link.href) &&
              "bg-background-secondary text-foreground stroke-foreground",
          )}
        >
          <span>{link.icon}</span>
        </Link>
      ))}
    </div>
  );
};

export default MobileToolbar;
