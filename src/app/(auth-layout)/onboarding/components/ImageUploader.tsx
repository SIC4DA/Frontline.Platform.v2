"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { FileUp } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect, useState } from "react";

interface ImageUploaderProps {
  formStatus?: "idle" | "success" | "error";
}

const ImageUploader = ({ formStatus }: ImageUploaderProps) => {
  const t = useTranslations("auth");
  const [image, setImage] = useState<string | null>(null);
  const [isSizeErrorVisible, setIsSizeErrorVisible] = useState(false);

  useEffect(() => {
    if (formStatus !== "idle") {
      setImage(null);
    }
  }, [formStatus]);

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
        setImage(result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="grid grid-cols-[auto_1fr] items-center gap-5">
      <div className="h-16 w-16 overflow-hidden rounded-full">
        {image ? (
          <Image
            src={image}
            alt="Profile"
            width={64}
            height={64}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="border-border h-full w-full rounded-full bg-gradient-to-br from-[#4080F4] to-[#AFF300]" />
        )}
      </div>
      <div className="flex flex-col gap-3">
        <p className="text-[16px] font-medium">{t("pfp")}</p>
        <div className="flex items-center gap-3">
          <input
            type="file"
            onChange={handleFileChange}
            accept="image/*"
            id="file-input"
            name="profileImage"
            hidden
          />
          {/* Hidden input to store the base64 image data */}
          <input type="hidden" name="profileImage" value={image || ""} />
          <Button
            variant="outline"
            type="button"
            asChild
            className="h-11 cursor-pointer rounded-xl"
          >
            <label htmlFor="file-input">
              <FileUp size={16} />
              <span>{t("uploadPhoto")}</span>
            </label>
          </Button>
          <Button
            variant="outline"
            disabled={!image}
            type="button"
            className="h-11 rounded-xl border-red-500 text-red-500 capitalize hover:text-red-500"
            onClick={() => setImage(null)}
          >
            {t("remove")}
          </Button>
        </div>
        <p
          className={cn(
            "text-foreground-secondary text-xs font-light",
            isSizeErrorVisible && "font-medium text-red-500",
          )}
        >
          {t("uploadPhotoInstructions")}
        </p>
      </div>
    </div>
  );
};

export default ImageUploader;
