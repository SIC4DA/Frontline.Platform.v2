"use client";

import dynamic from "next/dynamic";
import { useEffect, useMemo } from "react";

import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { updateSidebarState } from "@/services/sidebar";
import { useSidebarStore } from "@/store/sidebar";

import SidebarHeader from "./SidebarHeader";
import SidebarLinks from "./SidebarLinks";
import UserCard from "./UserCard";

const ChatHistory = dynamic(() => import("./ChatHistory"), {
  loading: () => <Skeleton className="h-12 w-full rounded-lg" />,
});

const Sidebar = ({ isSidebarActive }: { isSidebarActive: boolean }) => {
  const { setSidebarState } = useSidebarStore();
  const { isOpen, isUpdated } = useSidebarStore();

  const isSidebarOpen = useMemo(() => {
    if (isUpdated) return isOpen;

    return isSidebarActive;
  }, [isUpdated, isOpen, isSidebarActive]);

  useEffect(() => {
    updateSidebarState(isSidebarOpen ? "active" : "inactive");
    if (typeof window === "undefined") return;
    setSidebarState(isSidebarOpen);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSidebarOpen]);

  return (
    <aside
      className={cn(
        "fixed top-0 left-0 flex h-dvh w-[21.5%] min-w-[255px] flex-col justify-between gap-16 overflow-auto border-r border-[#F5F5F7] bg-[#FAFAFA] px-4 py-7 duration-300 max-sm:hidden",
        !isSidebarOpen && "w-[5.5%] min-w-[64px] px-0",
      )}>
      <div>
        <SidebarHeader isSidebarActive={isSidebarOpen} />
        <SidebarLinks isSidebarActive={isSidebarOpen} />
        {isSidebarOpen && <ChatHistory />}
      </div>
      <UserCard isSidebarActive={isSidebarOpen} />
    </aside>
  );
};

export default Sidebar;
