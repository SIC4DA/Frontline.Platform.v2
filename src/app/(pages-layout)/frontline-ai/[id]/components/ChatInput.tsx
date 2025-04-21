"use client";

import { Send } from "lucide-react";
import { useTranslations } from "next-intl";

import VoiceToTextComponent from "./VoiceToTextComponent";

type ChatInputProps = {
  placeholder: string;
  isLoading?: boolean;
  input: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const ChatInput = ({ input, handleInputChange, isLoading, placeholder }: ChatInputProps) => {
  const t = useTranslations("frontlineAi");

  return (
    <div className="border-border flex items-center gap-4 rounded-3xl border bg-[#FAFAFA] px-5 py-3 max-md:gap-1 max-md:px-3">
      <VoiceToTextComponent handleInputChange={handleInputChange} />
      <input
        type="text"
        autoFocus
        value={input}
        onChange={handleInputChange}
        className="placeholder:text-foreground-secondary h-6 flex-grow resize-none text-sm focus:outline-none max-md:text-xs max-md:placeholder:text-xs"
        placeholder={placeholder}
        readOnly={isLoading}
      />
      <button
        type="submit"
        disabled={isLoading || !input}
        className="shadow-white-inset flex w-fit items-center gap-2 self-end rounded-xl bg-gradient-to-b from-[#3BBBF6] to-[#31B6F5] px-4 py-2 text-xs text-white duration-300 active:scale-95 max-md:rounded-full max-md:p-2">
        <Send className="size-[22px] max-md:size-5" />
        <span className="max-md:hidden">{t("send")}</span>
      </button>
    </div>
  );
};

export default ChatInput;
