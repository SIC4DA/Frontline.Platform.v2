"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";
import ChatHistory from "./ChatHistory";
import SidebarHeader from "./SidebarHeader";
import SidebarLinks from "./SidebarLinks";
import UserCard from "./UserCard";

const Sidebar = () => {
  const [isActive, setIsActive] = useState(true);

  return (
    <aside
      className={cn(
        "sticky top-0 left-0 flex h-dvh w-[350px] flex-col justify-between border-r border-[#F5F5F7] bg-[#FAFAFA] px-4 py-7 duration-300",
        !isActive && "w-[64px] px-0",
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
