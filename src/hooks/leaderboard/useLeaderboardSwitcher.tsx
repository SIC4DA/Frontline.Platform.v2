import { useTranslations } from "next-intl";
import { useState } from "react";

import { UserWithClosedDeals } from "@/services/leaderboard";

const getUserWithMostClosedDeals = (users: UserWithClosedDeals[]) => {
  return users.sort((a, b) => b.dealsCount - a.dealsCount)[0];
};

const getUserWithMostRevenue = (users: UserWithClosedDeals[]) => {
  return users.sort((a, b) => b.totalContractValue - a.totalContractValue)[0];
};

const getUserWithMostConversionRate = (users: UserWithClosedDeals[]) => {
  return users.sort((a, b) => b.conversionRate - a.conversionRate)[0];
};

const useLeaderboardSwitcher = (users: UserWithClosedDeals[]) => {
  const t = useTranslations("leaderboard");
  const [index, setIndex] = useState<number>(0);
  const [isSwitching, setIsSwitching] = useState<boolean>(false);

  const options = [
    {
      title: t("bestSalesPerson"),
      achiever: getUserWithMostRevenue(users),
    },
    {
      title: t("biggestClosedDeal"),
      achiever: getUserWithMostClosedDeals(users),
    },
    {
      title: t("largestConversionRate"),
      achiever: getUserWithMostConversionRate(users),
    },
  ];

  const switchAchiever = (index: number) => {
    setIsSwitching(true);
    setIndex(index);
    setTimeout(() => {
      setIsSwitching(false);
    }, 300);
  };

  const handleNext = () => {
    switchAchiever(index === 2 ? 0 : index + 1);
  };

  const handlePrev = () => {
    switchAchiever(index === 0 ? 2 : index - 1);
  };

  const currentAchiever = options[index];

  return { handleNext, handlePrev, currentAchiever, isSwitching };
};

export default useLeaderboardSwitcher;
