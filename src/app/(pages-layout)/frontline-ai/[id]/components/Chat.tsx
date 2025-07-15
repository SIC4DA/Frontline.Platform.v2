"use client";

import { useChat } from "@ai-sdk/react";
import ChatPlaceholder from "@public/icons/ChatPlaceholder";
import { useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useEffect } from "react";

import useDebounce from "@/hooks/shared/useDebounce";
import { getChat, updateChatMessages } from "@/services/chat";
import { generateDealByAI } from "@/services/deal";
import type { Chat } from "@/types/chat";

import ChatInput from "./ChatInput";
import MessagesList from "./MessagesList";

const Chat = ({ chatData }: { chatData: Chat }) => {
  const t = useTranslations("frontlineAi");
  const queryClient = useQueryClient();

  const { messages, handleSubmit, input, handleInputChange, status } = useChat({
    initialMessages: chatData.messages,
    body: { chatId: chatData.id },
    onFinish: async (message) => {
      const chat = await getChat(chatData.id);
      if (!chat) return;

      chat.messages.push(message);

      await Promise.all([updateChatMessages(chatData.id, chat.messages), generateDealByAI(chat.id, chat.messages)]);
    },
  });
  const debouncedMessages = useDebounce(messages, 100);

  const inputPlaceHolder =
    messages.length > 0 ? (status === "streaming" ? "Loading..." : t("enterYourMessage")) : t("chatPlaceholder");

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (typeof window !== "undefined") {
      timeout = setTimeout(() => {
        window.scrollTo({
          top: document.body.scrollHeight,
          behavior: "smooth",
        });
      }, 200);
    }

    return () => clearTimeout(timeout);
  }, [chatData.id, debouncedMessages]);

  useEffect(() => {
    return () => {
      queryClient.refetchQueries({
        queryKey: ["chats"],
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {messages.length > 0 ? (
        <MessagesList messages={messages} />
      ) : (
        <div className="mx-auto w-fit">
          <ChatPlaceholder />
        </div>
      )}
      <form onSubmit={handleSubmit} className="bg-background sticky bottom-5 mx-auto w-full max-w-[1000px]">
        <ChatInput
          placeholder={inputPlaceHolder}
          isLoading={status === "streaming"}
          input={input}
          handleInputChange={handleInputChange}
        />
        <p className="text-foreground-secondary mt-5 text-center text-sm max-sm:hidden">
          {t("pleaseDoubleCheck")}
          {"  "}
          <Link className="text-foreground underline" href="/terms-of-services">
            {t("tos")}
          </Link>
        </p>
      </form>
    </>
  );
};

export default Chat;
