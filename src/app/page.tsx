import { Button } from "@/components/ui/button";
import { Aperture } from "lucide-react";
import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations("HomePage");

  
  return (
    <div>
      <Aperture size={200} strokeWidth={2} stroke="white" fill="oklch(0.723 0.219 149.579)" />
      <Button>{t("title")}</Button>
    </div>
  );
}
