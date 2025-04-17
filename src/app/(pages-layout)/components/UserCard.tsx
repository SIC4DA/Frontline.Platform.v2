"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

import { useSession } from "@/hooks/api/useSession";
import { cn } from "@/lib/utils";
import { LoaderCircle } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import Logout from "../../../../public/icons/Logout";

const UserCard = ({ isSidebarActive }: { isSidebarActive: boolean }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { data } = useSession();

  const signOut = async () => {
    setIsLoading(true);
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login");
        },
      },
    });
    setIsLoading(false);
  };

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
      {isSidebarActive && (
        <button className="stroke-[#EF4444] text-[#EF4444]" onClick={signOut} disabled={isLoading}>
          {isLoading ? (
            <LoaderCircle size={24} className="animate-spin" />
          ) : (
            <span className="size-6 max-2xl:size-5">
              <Logout />
            </span>
          )}
        </button>
      )}
    </div>
  );
};

export default UserCard;
