"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { LoaderCircle, LogOut } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const UserCard = ({ isSidebarActive }: { isSidebarActive: boolean }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

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
    <div
      className={cn(
        "flex items-center justify-between duration-300",
        !isSidebarActive && "flex-col gap-5",
      )}
    >
      <div className="flex items-center gap-2">
        <Image
          src="/images/google.webp"
          alt="google"
          width={32}
          height={32}
          className={cn(
            "aspect-auto w-8 object-cover",
            !isSidebarActive && "w-6",
          )}
        />
        {isSidebarActive && (
          <div>
            <h4 className="text-sm font-medium">John Doe</h4>
            <p className="text-foreground-secondary text-xs">
              john.doe@gmail.com
            </p>
          </div>
        )}
      </div>
      <button className="text-[#EF4444]" onClick={signOut} disabled={isLoading}>
        {isLoading ? (
          <LoaderCircle size={24} className="animate-spin" />
        ) : (
          <LogOut size={24} />
        )}
      </button>
    </div>
  );
};

export default UserCard;
