"use client";

import Logout from "@public/icons/Logout";
import { LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";

const LogoutButton = ({ text }: { text?: string }) => {
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
    <button
      className={cn(
        "flex items-center justify-center gap-2 stroke-[#EF4444] text-[#EF4444]",
        text && "bg-destructive/20 rounded-lg px-4 py-2",
        isLoading && "cursor-not-allowed opacity-50",
        !isLoading && "cursor-pointer",
      )}
      onClick={signOut}
      disabled={isLoading}
      type="button"
      aria-label="logout button">
      {text && <span className="ml-2 text-sm font-medium capitalize">{text}</span>}
      {isLoading ? (
        <LoaderCircle size={24} className="animate-spin" />
      ) : (
        <span className="size-6 max-2xl:size-5">
          <Logout />
        </span>
      )}
    </button>
  );
};

export default LogoutButton;
