"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { FileUp } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState, useEffect } from "react";

interface ImageUploaderProps {
  defaultValue?: string;
}

const ImageUploader = ({ defaultValue }: ImageUploaderProps) => {
  const t = useTranslations("auth");
  const [image, setImage] = useState<string | null>(defaultValue || null);
  const [isSizeErrorVisible, setIsSizeErrorVisible] = useState(false);

  console.log(typeof defaultValue);

  useEffect(() => {
    if (defaultValue) {
      setImage(defaultValue);
    }
  }, [defaultValue]);

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
      <div className="w-16 h-16 rounded-full overflow-hidden">
        {image ? (
          <img
            src={image}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full rounded-full bg-gradient-to-br from-[#4080F4] to-[#AFF300] border-border" />
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
            className="h-11 rounded-xl"
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
            className="text-red-500 border-red-500 h-11 capitalize rounded-xl hover:text-red-500"
            onClick={() => setImage(null)}
          >
            {t("remove")}
          </Button>
        </div>
        <p
          className={cn(
            "text-xs text-foreground-secondary font-light",
            isSizeErrorVisible && "text-red-500"
          )}
        >
          {t("uploadPhotoInstructions")}
        </p>
      </div>
    </div>
  );
};

export default ImageUploader;
