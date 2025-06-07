import React from "react";

import { Skeleton } from "@/components/ui/skeleton";

export default function DealLoading() {
  return (
    <div>
      <Skeleton className="h-10 w-full" />
    </div>
  );
}
