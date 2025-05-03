"use client";

import Logout from "@public/icons/Logout";
import { LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { authClient } from "@/lib/auth-client";

const LogoutButton = () => {
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
    <button className="stroke-[#EF4444] text-[#EF4444]" onClick={signOut} disabled={isLoading}>
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
