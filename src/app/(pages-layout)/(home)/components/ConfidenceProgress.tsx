import { cn } from "@/lib/utils";
import type { DealContributors } from "@/types/deal";

const ConfidenceProgress = ({ stage }: { stage: DealContributors[number]["stage"] }) => {
  const confidenceProgress = {
    Prospecting: "bg-primary",
    Discovery: "bg-purple-500",
    Demo: "bg-lime-400",
    Negotiation: "bg-yellow-400",
    Contracting: "bg-green-500",
    Closing: "bg-green-600",
  };

  const stageIndex = Object.keys(confidenceProgress).indexOf(stage);

  return (
    <div className="flex gap-[2px]">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i.toString()}
          className={cn("size-3 rounded bg-[#D9D9D9]", i <= stageIndex && confidenceProgress[stage])}
        />
      ))}
    </div>
  );
};

export default ConfidenceProgress;
