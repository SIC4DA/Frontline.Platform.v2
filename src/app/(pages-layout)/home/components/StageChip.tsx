import { cn } from "@/lib/utils";
import { DealContributor } from "@/types/deal";

const StageChip = ({ stage }: { stage: DealContributor["stage"] }) => {
  const stages = {
    Prospecting: "text-primary bg-secondary/30",
    Discovery: "text-purple-500 bg-purple-500/30",
    Demo: "text-lime-500 bg-lime-500/30",
    Negotiation: "text-yellow-500 bg-yellow-500/30",
    Contracting: "text-yellow-600 bg-yellow-600/30",
    Closing: "text-green-500 bg-green-500/30",
  };

  return <div className={cn("rounded px-5 py-1.5 text-xs font-medium", stages[stage])}>{stage}</div>;
};

export default StageChip;
