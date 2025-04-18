"use client";

import { ChatHistory } from "@/types/chat";
import { useMemo } from "react";
import { useGet } from "../api/useGet";

export type TimeframeChats = {
  title: string;
  chats: ChatHistory[];
};

function categorizeChats(chats: ChatHistory[]): TimeframeChats[] {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const lastWeekStart = new Date(today);
  lastWeekStart.setDate(lastWeekStart.getDate() - 7);
  const lastYearStart = new Date(today);
  lastYearStart.setFullYear(lastYearStart.getFullYear() - 1);

  const result: TimeframeChats[] = [];

  // Ensure updatedAt is a Date object
  const processedChats = chats.map((chat) => ({
    ...chat,
    updatedAt: chat.updatedAt instanceof Date ? chat.updatedAt : new Date(chat.updatedAt),
  }));

  // Sort chats by updatedAt in descending order (newest first)
  const sortedChats = [...processedChats].sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime());

  const todayChats = sortedChats.filter((chat) => chat.updatedAt >= today);

  const yesterdayChats = sortedChats.filter((chat) => chat.updatedAt >= yesterday && chat.updatedAt < today);

  const lastWeekChats = sortedChats.filter((chat) => chat.updatedAt >= lastWeekStart && chat.updatedAt < yesterday);

  const lastYearChats = sortedChats.filter((chat) => chat.updatedAt >= lastYearStart && chat.updatedAt < lastWeekStart);

  // Only add timeframes that have chats
  if (todayChats.length > 0) {
    result.push({ title: "today", chats: todayChats });
  }

  if (yesterdayChats.length > 0) {
    result.push({ title: "yesterday", chats: yesterdayChats });
  }

  if (lastWeekChats.length > 0) {
    result.push({ title: "last7Days", chats: lastWeekChats });
  }

  if (lastYearChats.length > 0) {
    result.push({ title: "lastYear", chats: lastYearChats });
  }
  return result;
}
const useChatHistory = () => {
  const result = useGet<ChatHistory[]>({
    endpoint: "/api/chat/get-history",
    queryKey: ["chats"],
  });
  const chatsHistory = useMemo(() => {
    if (!result.data) return [];
    return categorizeChats(result.data || []);
  }, [result.data]);

  return { ...result, chatsHistory };
};

export default useChatHistory;
