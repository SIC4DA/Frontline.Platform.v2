import { cn } from "@/lib/utils";
import { PanelLeft } from "lucide-react";
import Image from "next/image";

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
      {isSidebarActive ? (
        <Image
          src="/images/frontline-logo.webp"
          alt="logo"
          width={135}
          height={30}
          className="aspect-auto w-[135px]"
          priority
        />
      ) : (
        <Image
          src="/images/logo.webp"
          alt="logo"
          width={35}
          height={35}
          className="aspect-auto w-[35px] object-cover"
          priority
        />
      )}
      <button onClick={() => setIsSidebarActive(!isSidebarActive)}>
        <PanelLeft size={22} className="text-foreground-secondary" />
      </button>
    </div>
  );
};

export default SidebarHeader;
