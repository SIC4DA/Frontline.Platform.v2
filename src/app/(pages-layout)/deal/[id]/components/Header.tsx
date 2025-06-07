import { User } from "lucide-react";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import React from "react";

import type { User as UserType } from "@/types/user";

const Header = async ({ user }: { user: UserType | null }) => {
  const t = await getTranslations("deal");

  if (!user) return null;

  return (
    <div className="bg-background flex items-center justify-between rounded-full px-5 py-4 max-w-[1344px]">
      <div className="flex items-center gap-2">
        <Image src={user.image || ""} className="aspect-square w-14 rounded-full" alt="Avatar" width={52} height={52} />
        <div>
          <p className="text-lg max-md:text-base">{user.username}</p>
          <p className="text-foreground-secondary flex items-center gap-1 text-sm max-md:text-xs">
            <span className="fill-foreground-secondary text-foreground-secondary">
              <User className="fill-foreground-secondary size-4" />
            </span>
            <span>{user.companyName}</span>
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <p className="text-sm max-md:text-xs">{t("poweredBy")}</p>
        <Image src="/images/logo.webp" alt="Logo" width={38} height={35} />
      </div>
    </div>
  );
};

export default Header;
