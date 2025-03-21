import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

const Loader = ({
  size = 200,
  className,
}: {
  size?: number;
  className?: string;
}) => {
  return (
    <div className={cn("animate-pulse", className)}>
      <Image
        src="/images/frontline-logo.webp"
        alt="logo"
        width={size}
        height={size}
        className="object-cover"
      />
    </div>
  );
};

export default Loader;
