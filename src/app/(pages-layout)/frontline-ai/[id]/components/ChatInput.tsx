import { AudioLines, Send } from "lucide-react";
import { useTranslations } from "next-intl";

const ChatInput = ({
  input,
  handleInputChange,
}: {
  input: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => void;
}) => {
  const t = useTranslations("frontlineAi");


  return (
    <>
      <button type="button" className="shadow-white-inset rounded-full bg-[#34B7F6] p-2">
        <AudioLines className="text-white" />
      </button>
      <input
        type="text"
        autoFocus
        value={input}
        onChange={handleInputChange}
        className="placeholder:text-foreground-secondary h-6 flex-grow resize-none focus:outline-none"
        placeholder={t("chatPlaceholder")}
      />
      <button
        type="button"
        className="shadow-white-inset flex w-fit items-center gap-2 self-end rounded-xl bg-gradient-to-b from-[#3BBBF6] to-[#31B6F5] px-4 py-2 text-xs text-white duration-300 active:scale-95">
        <Send size={22} />
        <span>{t("send")}</span>
      </button>
    </>
  );
};

export default ChatInput;
