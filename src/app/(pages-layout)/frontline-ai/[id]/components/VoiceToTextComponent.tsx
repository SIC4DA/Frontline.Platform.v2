import { AudioLines, Pause } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { useVoiceToText } from "react-speakup";

const VoiceToTextComponent = ({
  handleInputChange,
}: {
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  const t = useTranslations("frontlineAi");
  const [isListening, setIsListening] = useState(false);
  const { startListening, stopListening, transcript } = useVoiceToText();

  const toggleListening = () => {
    if (typeof window === "undefined" || !("SpeechRecognition" in window || "webkitSpeechRecognition" in window))
      return;

    if (isListening) {
      stopListening();
      setIsListening(false);
    } else {
      startListening();
      setIsListening(true);
    }
  };

  useEffect(() => {
    console.log("transcript", transcript);
    if (transcript) {
      handleInputChange({ target: { value: transcript } } as React.ChangeEvent<HTMLInputElement>);
    }
  }, [transcript]); // Add transcript as a dependency to the useEffect hook

  return (
    <>
      <button
        aria-label={t("toggleListening")}
        title={isListening ? t("stopListening") : t("startListening")}
        onClick={toggleListening}
        type="button"
        className="shadow-white-inset rounded-full bg-[#34B7F6] p-2">
        {isListening ? (
          <Pause className="size-[22px] text-white max-md:size-5" />
        ) : (
          <AudioLines className="size-[22px] text-white max-md:size-5" />
        )}
      </button>
    </>
  );
};

export default VoiceToTextComponent;
