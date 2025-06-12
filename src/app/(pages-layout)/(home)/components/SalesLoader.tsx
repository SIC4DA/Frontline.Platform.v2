import { Skeleton } from "@/components/ui/skeleton";

const SalesLoader = () => {
  return (
    <div>
      <Skeleton className="mb-5 h-12 w-full" />
      <div
        style={{
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        }}
        className="grid gap-4">
        <Skeleton className="h-72 rounded-lg" />
        <Skeleton className="h-72 rounded-lg" />
        <Skeleton className="h-72 rounded-lg" />
      </div>
    </div>
  );
};

export default SalesLoader;
