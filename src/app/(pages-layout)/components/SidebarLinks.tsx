"use client";

import useDebounce from "@/hooks/shared/useDebounce";
import { cn } from "@/lib/utils";
import { Bolt, House, Star, WandSparkles } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  {
    label: "home",
    href: "/home",
    icon: <House />,
  },
  {
    label: "frontlineAI",
    href: "/frontline-ai",
    icon: <WandSparkles />,
  },
  {
    label: "leaderboardAndBadges",
    href: "/leaderboard-and-badges",
    icon: <Star />,
  },
  {
    label: "settings",
    href: "/settings",
    icon: <Bolt />,
  },
];

const SidebarLinks = ({ isSidebarActive }: { isSidebarActive: boolean }) => {
  const t = useTranslations("sidebar");
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href;
  const debouncedSidebarActivity = useDebounce(isSidebarActive, 100);

  return (
    <nav className="mb-14 flex flex-col gap-3">
      {links.map((link) => (
        <Link
          key={link.label}
          href={link.href}
          className={cn(
            "text-foreground-secondary hover:text-foreground flex items-center gap-4 px-4 py-2 text-sm font-medium duration-300",
            isActive(link.href) && "text-foreground",
            !isSidebarActive && "justify-center gap-0",
          )}
        >
          <span className="fill-foreground size-6">{link.icon}</span>
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
