import { User } from "lucide-react";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import React from "react";

import type { User as UserType } from "@/types/user";

const Header = async ({ user }: { user: UserType | null }) => {
  const t = await getTranslations("deal");

  if (!user) return null;

  return (
    <div className="bg-background relative z-[1] mx-auto flex max-w-10/12 items-center justify-between rounded-full px-5 py-4 pr-[30px] max-sm:max-w-full max-sm:px-3">
      <div className="flex items-center gap-2">
        <Image
          src={user.image || ""}
          className="aspect-square w-14 rounded-full max-sm:w-10"
          alt="Avatar"
          width={52}
          height={52}
        />
        <div>
          <p className="text-lg max-md:text-base max-sm:text-sm">{user.name}</p>
          <p className="text-foreground-secondary flex items-center gap-1 text-sm max-md:text-xs">
            <span className="fill-foreground-secondary text-foreground-secondary">
              <User className="fill-foreground-secondary size-4 max-sm:size-3" />
            </span>
            <span className="max-sm:text-xs">{user?.jobTitle}</span>
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
