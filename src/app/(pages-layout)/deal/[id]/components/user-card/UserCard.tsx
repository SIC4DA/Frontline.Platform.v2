import { BadgeCheck, User } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import type { User as UserType } from "@/types/user";

import UserAnalytics from "./UserAnalytics";

const UserCard = ({ user }: { user: UserType | null }) => {
  const t = useTranslations("deal");

  return (
    <div className="relative z-[3] rounded-xl bg-gradient-to-b from-[#F5F5F5] to-[#D6E8FF]">
      <div className="relative h-36 w-full rounded-xl bg-gradient-to-b from-[#94dcff] to-transparent">
        <Image
          src={user?.image || "/images/company-placeholder.webp"}
          alt="user-image"
          className="absolute -bottom-12 left-5 rounded-full text-xs"
          width={77}
          height={77}
        />
      </div>
      <div className="mt-10 p-6">
        <div className="flex justify-between flex-wrap gap-2">
          <div>
            <div className="flex items-center gap-1">
              <p className="text-xl font-medium">{user?.name}</p>
              <BadgeCheck fill="#49adf4" className="size-[22px] max-2xl:size-[18px]" stroke="#dceafd" />
            </div>
            <p className="text-foreground-secondary mt-1 text-sm">@{user?.username}</p>
          </div>
          <div className="flex items-center gap-3">
            <Image src="/images/linkedin.webp" alt="linkedin" width={20} height={20} className="rounded" />
            <Image src="/images/teams.webp" alt="microsoft" width={20} height={20} className="rounded" />
          </div>
        </div>
        <div className="mt-6">
          <p className="flex items-center gap-1 text-[#2F2F2F]">
            <User className="size-4 fill-[#2F2F2F]" />
            <span className="text-sm capitalize">{user?.jobTitle}</span>
          </p>
          <p className="text-foreground-secondary mt-2 text-sm">{user?.bio}</p>
        </div>
        <UserAnalytics />
        <Button className="mt-9 w-full h-10" variant="primary">
          {t("connect")}
        </Button>
      </div>
    </div>
  );
};

export default UserCard;
