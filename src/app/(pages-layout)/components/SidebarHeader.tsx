// import { PanelLeft } from "lucide-react";
import Image from "next/image";

import { cn } from "@/lib/utils";
import { useSidebarStore } from "@/store/sidebar";

import PanelLeft from "../../../../public/icons/PanelLeft";

const SidebarHeader = ({ isSidebarActive }: { isSidebarActive: boolean }) => {
  const { toggle } = useSidebarStore();

  return (
    <div className={cn("mb-10 flex items-center justify-between gap-1", !isSidebarActive && "flex-col gap-5")}>
      <Image
        src={isSidebarActive ? "/images/frontline-logo.webp" : "/images/logo.webp"}
        alt="logo"
        width={isSidebarActive ? 135 : 30}
        height={30}
        className={cn(
          "aspect-auto",
          isSidebarActive && "w-[135px] max-2xl:w-[110px]",
          !isSidebarActive && "w-[30px] object-cover",
        )}
        priority
      />
      <button
        className="stroke-foreground-secondary w-[24px] max-2xl:w-[18px]"
        aria-label="toggle sidebar"
        onClick={() => {
          toggle();
        }}>
        <PanelLeft />
      </button>
    </div>
  );
};

export default SidebarHeader;
