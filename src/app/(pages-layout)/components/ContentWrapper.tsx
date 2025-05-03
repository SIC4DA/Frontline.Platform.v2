"use client";

import { cn } from "@/lib/utils";
import { useSidebarStore } from "@/store/sidebar";

const ContentWrapper = ({ children, isMarginVisible }: { children: React.ReactNode; isMarginVisible: boolean }) => {
  const { isOpen } = useSidebarStore();

  return (
    <div
      className={cn(
        "duration-300 max-sm:ml-0",
        isOpen ? "ml-[clamp(255px,21.5%,21.5%)]" : "ml-[clamp(64px,5.5%,5.5%)]",
        !isMarginVisible && "ml-0",
      )}>
      {children}
    </div>
  );
};

export default ContentWrapper;
