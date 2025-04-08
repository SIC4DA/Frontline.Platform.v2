import { cn } from "@/lib/utils";

const ConfidenceProgress = ({ confidence }: { confidence: number }) => {
  return (
    <div className="flex gap-[2px]">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className={cn("h-3 w-3 rounded bg-[#D9D9D9]", i < confidence && "bg-green-400")} />
      ))}
    </div>
  );
};

export default ConfidenceProgress;
