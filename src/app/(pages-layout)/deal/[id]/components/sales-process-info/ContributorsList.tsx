"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import React from "react";

import useContributorsSwitcher from "@/hooks/deal/useContributorsSwitcher";
import { Contributor } from "@/types/deal";

import ContributorCard from "./ContributorCard";

const ContributorsList = ({ contributors }: { contributors: Contributor[] }) => {
  const { handleNext, handlePrev, page, isNextVisible, isPrevVisible, direction } =
    useContributorsSwitcher(contributors);

  const variants = {
    enter: (dir: number) => ({ x: dir * 100, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir * -100, opacity: 0 }),
  };

  return (
    <div className="relative">
      {isPrevVisible && (
        <button
          onClick={handlePrev}
          className="absolute top-1/2 -left-14 -translate-y-1/2 rounded-md bg-[#39b5f5] p-1.5 duration-300 active:scale-95 max-lg:-left-7">
          <ChevronLeft className="size-4" stroke="#fff" strokeWidth={3} />
        </button>
      )}
      <AnimatePresence custom={direction} initial={false} mode="wait">
        <motion.div
          key={page}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ type: "spring", stiffness: 320, damping: 30 }}
          className="grid grid-cols-2 gap-12 max-lg:grid-cols-1">
          {contributors.slice((page - 1) * 2, page * 2).map((contributor, index) => (
            <ContributorCard key={`${contributor.name}-${index}-${contributor.title}`} contributor={contributor} />
          ))}
        </motion.div>
      </AnimatePresence>
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
