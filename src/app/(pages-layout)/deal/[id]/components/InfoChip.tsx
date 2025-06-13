import React from "react";

const InfoChip = ({
  icon,
  value,
  label = "",
}: {
  icon: React.ReactNode;
  value: string | number | undefined | null;
  label?: string;
}) => {
  return (
    <div className="bg-background flex items-center gap-2 rounded-lg px-3 py-2">
      <span className="text-foreground-secondary">{icon}</span>
      <div className="flex flex-wrap items-center gap-1 text-[13px] font-medium capitalize">
        <span>{value ?? "-"}</span>
        <span>{label}</span>
      </div>
    </div>
  );
};

export default InfoChip;
