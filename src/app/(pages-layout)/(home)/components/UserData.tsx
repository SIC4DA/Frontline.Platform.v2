import { BadgeCheck } from "lucide-react";
import { useTranslations } from "next-intl";

import type { User } from "@/types/user";

const UserData = ({ user }: { user: User }) => {
  const t = useTranslations("home");

  return (
    <div className="mt-20 w-full px-7 max-2xl:mt-14 max-md:px-4 max-sm:px-2">
      <div className="mt-6 max-2xl:mt-3">
        <div className="mb-2 flex items-center gap-1">
          <h1 className="-mt-0.5 text-2xl font-medium max-2xl:text-lg">{user.name}</h1>
          <BadgeCheck fill="#49adf4" className="size-[22px] max-2xl:size-[18px]" stroke="#fff" />
          <p className="text-foreground-secondary text-sm max-2xl:text-xs">@{user.username}</p>
        </div>
        <p className="max-2xl:text-sm">{user.bio || t("defaultBio")}</p>
      </div>
    </div>
  );
};

export default UserData;
