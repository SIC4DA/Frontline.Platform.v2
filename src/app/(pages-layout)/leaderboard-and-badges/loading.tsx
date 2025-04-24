import React from "react";

import { Skeleton } from "@/components/ui/skeleton";

export default function LeaderboardPageLoading() {
  return (
    <section className="min-h-dvh px-8 py-3.5 max-md:px-5 max-sm:px-4 max-sm:pb-24">
      <div className="mb-10 max-xl:mb-24">
        <Skeleton className="mx-auto mb-5 h-28 w-[200px] rounded-lg" />
        <Skeleton className="mx-auto mb-5 h-[400px] w-full max-w-[500px] rounded-lg" />
      </div>
      <div className="flex flex-col gap-5">
        <Skeleton className="mb-5 h-20 w-full rounded-2xl" />
        <Skeleton className="mb-5 h-20 w-full rounded-2xl" />
        <Skeleton className="mb-5 h-20 w-full rounded-2xl" />
      </div>
    </section>
  );
}
