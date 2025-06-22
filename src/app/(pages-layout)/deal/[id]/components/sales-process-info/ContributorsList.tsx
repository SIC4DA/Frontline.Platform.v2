"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";

import useContributorsSwitcher from "@/hooks/deal/useContributorsSwitcher";
import { Contributor } from "@/types/deal";

import ContributorCard from "./ContributorCard";

const ContributorsList = ({ contributors }: { contributors: Contributor[] }) => {
  const { handleNext, handlePrev, page, isNextVisible, isPrevVisible } =
    useContributorsSwitcher(contributors);

  return (
    <div className="relative grid grid-cols-2 gap-12 max-lg:grid-cols-1">
      {isPrevVisible && (
        <button
          onClick={handlePrev}
          className="absolute top-1/2 -left-14 -translate-y-1/2 rounded-md bg-[#39b5f5] p-1.5 duration-300 active:scale-95 max-lg:-left-7">
          <ChevronLeft className="size-4" stroke="#fff" strokeWidth={3} />
        </button>
      )}
      {contributors.slice((page - 1) * 2, page * 2).map((contributor) => (
        <ContributorCard key={contributor.name} contributor={contributor} />
      ))}
      {isNextVisible && (
        <button
          onClick={handleNext}
          className="absolute top-1/2 -right-14 -translate-y-1/2 rounded-md bg-[#39b5f5] p-1.5 duration-300 active:scale-95 max-lg:-right-7">
          <ChevronRight className="size-4" stroke="#fff" strokeWidth={3} />
        </button>
      )}
    </div>
  );
};

export default ContributorsList;
