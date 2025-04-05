"use client";

import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import ChatHistory from "./ChatHistory";
import SidebarHeader from "./SidebarHeader";
import SidebarLinks from "./SidebarLinks";
import UserCard from "./UserCard";

const Sidebar = ({
  isSidebarActive,
  updateSidebarState,
}: {
  isSidebarActive: boolean;
  updateSidebarState: (state: "active" | "inactive") => void;
}) => {
  const [isActive, setIsActive] = useState(isSidebarActive);

  useEffect(() => {
    updateSidebarState(isActive ? "active" : "inactive");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActive]);

  return (
    <aside
      className={cn(
        "sticky top-0 left-0 flex h-dvh w-[21.5%] min-w-[255px] flex-col justify-between border-r border-[#F5F5F7] bg-[#FAFAFA] px-4 py-7 duration-300 max-sm:hidden",
        !isActive && "w-[5.5%] min-w-[64px] px-0",
      )}
    >
      <div>
        <SidebarHeader
          isSidebarActive={isActive}
          setIsSidebarActive={setIsActive}
        />
        <SidebarLinks isSidebarActive={isActive} />
        {isActive && <ChatHistory />}
      </div>
      <UserCard isSidebarActive={isActive} />
    </aside>
  );
};

export default Sidebar;
