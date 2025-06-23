"use client";

import { useState } from "react";

import { Contributor } from "@/types/deal";

const useContributorsSwitcher = (contributors: Contributor[]) => {
  const pagesCount = Math.ceil(contributors.length / 2);
  const [page, setPage] = useState<number>(1);
  const [direction, setDirection] = useState<1 | -1>(1);

  const handleNext = () => {
    setDirection(1);
    setPage((prev) => Math.min(prev + 1, pagesCount));
  };

  const handlePrev = () => {
    setDirection(-1);
    setPage((prev) => Math.max(prev - 1, 1));
  };

  const isNextVisible = page < pagesCount;
  const isPrevVisible = page > 1;

  return { handleNext, handlePrev, page, isNextVisible, isPrevVisible, direction };
};

export default useContributorsSwitcher;
