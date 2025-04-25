import React from "react";

import { Skeleton } from "@/components/ui/skeleton";

export default function UserProfilePageLoading() {
  return (
    <section className="px-8 py-3.5 max-sm:px-1">
      <Skeleton className="relative h-[300px] w-full rounded-xl">
        <Skeleton className="border-background absolute -bottom-14 left-7 aspect-square w-36 rounded-[47px] border-[5px] shadow-2xl" />
      </Skeleton>
      <div className="mt-20">
        <Skeleton className="mb-2 h-6 w-28" />
        <Skeleton className="h-6 w-56" />
      </div>
    </section>
  );
}
