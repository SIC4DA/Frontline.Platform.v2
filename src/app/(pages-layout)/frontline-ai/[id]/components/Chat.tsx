"use client";

import useDebounce from "@/hooks/shared/useDebounce";
import type { Chat } from "@/types/chat";
import { useChat } from "@ai-sdk/react";
import ChatPlaceholder from "@public/icons/ChatPlaceholder";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useEffect } from "react";
import ChatInput from "./ChatInput";
import MessagesList from "./MessagesList";

const createMessage = async (chatId: string, message: unknown) => {
  await fetch("/api/chat/create-message", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      chatId,
      message,
    }),
  });
};

const Chat = ({ chatData }: { chatData: Chat }) => {
  const t = useTranslations("frontlineAi");

  const { messages, handleSubmit, input, handleInputChange, status } = useChat({
    initialMessages: chatData.messages,
    body: { chatId: chatData.id },
    onFinish: async (message) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { id, createdAt, ...messageData } = message;
      await createMessage(chatData.id, messageData);
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
        <div className="border-border flex items-center gap-4 rounded-3xl border bg-[#FAFAFA] px-5 py-3">
          <ChatInput
            placeholder={inputPlaceHolder}
            isLoading={status === "streaming"}
            input={input}
            handleInputChange={handleInputChange}
          />
        </div>
        <p className="text-foreground-secondary mt-5 text-center text-sm">
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
