"use client";

import { useState } from "react";



import { Contributor } from "@/types/deal";





const useContributorsSwitcher = (contributors: Contributor[]) => {
  const pagesCount = Math.ceil(contributors.length / 2);
  const [page, setPage] = useState<number>(1);


  const handleNext = () => setPage((prev) => prev + 1);
  const handlePrev = () => setPage((prev) => prev - 1);

  const isNextVisible = page < pagesCount;
  const isPrevVisible = page > 1;

  return { handleNext, handlePrev, page, isNextVisible, isPrevVisible };
};

export default useContributorsSwitcher;