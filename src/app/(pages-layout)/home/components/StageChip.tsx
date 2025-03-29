const StageChip = ({ stage }: { stage: string }) => {
  return (
    <div className="text-primary bg-secondary/30 rounded px-5 py-1.5 font-medium text-xs">
      {stage}
    </div>
  );
};

export default StageChip;
