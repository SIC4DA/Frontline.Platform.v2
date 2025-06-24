import React from "react";

import { Skeleton } from "@/components/ui/skeleton";

export default function DealLoading() {
  return (
    <section className="relative min-h-dvh max-w-full overflow-x-hidden overflow-y-clip bg-[#F6FAFF] px-8 py-16 max-md:px-5 max-sm:px-4 max-sm:pb-24">
      <Skeleton className="h-[88px] w-full max-w-10/12 rounded-full mx-auto" />
      <div className="mx-auto mt-[101px] mb-28 flex w-fit flex-col items-center">
        <Skeleton className="h-6 w-32" />
        <Skeleton className="mt-9 h-20 w-96" />
        <div className="mt-12 flex items-center justify-center gap-[42px]">
          <Skeleton className="h-20 w-20 rounded-3xl" />
          <Skeleton className="h-16 w-16 rounded-3xl" />
          <Skeleton className="h-20 w-20 rounded-3xl" />
        </div>
        <Skeleton className="mt-12 h-[580px] w-[520px] rounded-xl" />
      </div>
    </section>
  );
}
