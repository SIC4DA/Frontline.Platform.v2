"use client";

import { useState } from "react";

import { Contributor } from "@/types/deal";

const useContributorsSwitcher = (contributors: Contributor[]) => {
  const pagesCount = Math.ceil(contributors.length / 2);
  const [page, setPage] = useState<number>(1);
  const [isSwitching, setIsSwitching] = useState<boolean>(false);

  const switchAchiever = (index: number) => {
    setIsSwitching(true);
    setPage(index);
    setTimeout(() => {
      setIsSwitching(false);
    }, 300);
  };

  const handleNext = () => switchAchiever(page + 1);

  const handlePrev = () => switchAchiever(page - 1);

  const isNextVisible = page < pagesCount;
  const isPrevVisible = page > 1;

  return { handleNext, handlePrev, page, isSwitching, isNextVisible, isPrevVisible };
};

export default useContributorsSwitcher;
