import { cn } from "@/lib/utils";

const ConfidenceProgress = ({ confidence }: { confidence: number }) => {
  const confidenceProgress = {
    0: "bg-primary",
    1: "bg-purple-500",
    2: "bg-lime-400",
    3: "bg-green-400",
    4: "bg-green-500",
    5: "bg-green-600",
    6: "bg-green-600",
  };

  return (
    <div className="flex gap-[2px]">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className={cn(
            "h-3 w-3 rounded bg-[#D9D9D9]",
            i < confidence && confidenceProgress[confidence as keyof typeof confidenceProgress],
          )}
        />
      ))}
    </div>
  );
};

export default ConfidenceProgress;
