"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useOnboardingStore } from "@/store/onboarding";
import { FileUp } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect, useState } from "react";

interface ImageUploaderProps {
  formStatus?: "idle" | "success" | "error";
}

const ImageUploader = ({ formStatus }: ImageUploaderProps) => {
  const t = useTranslations("auth");
  const [isSizeErrorVisible, setIsSizeErrorVisible] = useState(false);
  const { profileImage, setOnboardingState } = useOnboardingStore();

  useEffect(() => {
    if (formStatus !== "idle") {
      setOnboardingState({ profileImage: null });
    }
  }, [formStatus, setOnboardingState]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 1000000) {
        setIsSizeErrorVisible(true);
        return;
      } else {
        setIsSizeErrorVisible(false);
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setOnboardingState({ profileImage: result });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="grid grid-cols-[auto_1fr] items-center gap-5">
      <div className="h-14 w-14 overflow-hidden rounded-full">
        {profileImage ? (
          <Image src={profileImage} alt="Profile" width={56} height={56} className="h-full w-full object-cover" />
        ) : (
          <div className="border-border h-full w-full rounded-full bg-gradient-to-b from-[#3BBBF6] to-[#266DF0]" />
        )}
      </div>
      <div className="flex flex-col gap-3">
        <p className="text-sm font-medium">{t("pfp")}</p>
        <div className="flex flex-wrap items-center gap-2">
          <input type="file" onChange={handleFileChange} accept="image/*" id="file-input" name="profileImage" hidden />
          {/* Hidden input to store the base64 image data */}
          <input type="hidden" name="profileImage" value={profileImage || ""} />
          <Button variant="outline" type="button" asChild className="h-10 cursor-pointer rounded-[12px] text-sm">
            <label htmlFor="file-input">
              <FileUp size={16} />
              <span>{t("uploadPhoto")}</span>
            </label>
          </Button>
          <Button
            variant="outline"
            disabled={!profileImage}
            type="button"
            className="h-10 rounded-[12px] border-red-500 text-sm text-red-500 capitalize hover:text-red-500"
            onClick={() => setOnboardingState({ profileImage: null })}>
            {t("remove")}
          </Button>
        </div>
        <p className={cn("text-foreground-secondary text-xs", isSizeErrorVisible && "font-medium text-red-500")}>
          {t("uploadPhotoInstructions")}
        </p>
      </div>
    </div>
  );
};

export default ImageUploader;
