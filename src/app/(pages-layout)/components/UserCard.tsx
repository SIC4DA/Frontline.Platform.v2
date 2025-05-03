"use client";

import Image from "next/image";

import { useSession } from "@/hooks/api/useSession";
import { cn } from "@/lib/utils";

import LogoutButton from "./LogoutButton";

const UserCard = ({ isSidebarActive }: { isSidebarActive: boolean }) => {
  const { data } = useSession();

  return (
    <div className={cn("flex items-center justify-between duration-300", !isSidebarActive && "flex-col gap-5")}>
      <div className="flex items-center gap-2">
        <Image
          src={data?.user?.companyLogo ?? "/images/google.webp"}
          alt="google"
          width={32}
          height={32}
          className={cn("aspect-auto w-8 rounded-lg object-cover max-2xl:w-6", !isSidebarActive && "w-6")}
        />
        {isSidebarActive && (
          <div>
            <h4 className="text-sm font-medium max-2xl:text-xs">{data?.user.name}</h4>
            <p className="text-foreground-secondary text-xs max-2xl:text-[10px]">{data?.user.email}</p>
          </div>
        )}
      </div>
      {isSidebarActive && <LogoutButton />}
    </div>
  );
};

export default UserCard;
