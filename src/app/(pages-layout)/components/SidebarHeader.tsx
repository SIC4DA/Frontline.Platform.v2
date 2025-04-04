import { cn } from "@/lib/utils";
// import { PanelLeft } from "lucide-react";
import Image from "next/image";
import PanelLeft from "../../../../public/icons/PanelLeft";

const SidebarHeader = ({
  isSidebarActive,
  setIsSidebarActive,
}: {
  isSidebarActive: boolean;
  setIsSidebarActive: (isSidebarActive: boolean) => void;
}) => {
  return (
    <div
      className={cn(
        "mb-10 flex items-center justify-between gap-1",
        !isSidebarActive && "flex-col gap-5",
      )}
    >
      <Image
        src={
          isSidebarActive ? "/images/frontline-logo.webp" : "/images/logo.webp"
        }
        alt="logo"
        width={isSidebarActive ? 135 : 35}
        height={isSidebarActive ? 30 : 35}
        className={cn(
          "aspect-auto",
          isSidebarActive && "w-[135px]",
          !isSidebarActive && "w-[35px] object-cover",
        )}
        priority
      />
      <button
        className="stroke-foreground-secondary"
        onClick={() => setIsSidebarActive(!isSidebarActive)}
      >
        <PanelLeft />
      </button>
    </div>
  );
};

export default SidebarHeader;
