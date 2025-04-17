"use client";

import { Skeleton } from "@/components/ui/skeleton";
import useChatHistory from "@/hooks/chat/useChatHistory";
import HistoryTimeFrame from "./HistoryTimeFrame";

const ChatHistory = () => {
  const { isLoading, chatsHistory } = useChatHistory();

  if (isLoading) return <Skeleton className="h-10 w-full rounded-xl" />;

  return (
    <div className="flex flex-col gap-5">
      {chatsHistory?.map((timeFrame, i) => <HistoryTimeFrame key={i} timeframeData={timeFrame} />)}
    </div>
  );
};

export default ChatHistory;
