"use client";

import { FileUp } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useState } from "react";

import { Button } from "@/components/ui/button";

const ImageModification = ({ userImage }: { userImage: string | null | undefined }) => {
  const t = useTranslations("home");
  const [image, setImage] = useState<string | null | undefined>(userImage);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setImage(result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex items-center gap-6">
      <div className="size-[68px] overflow-hidden rounded-full">
        {image ? (
          <Image src={image} alt="Profile" width={56} height={56} className="h-full w-full object-cover" />
        ) : (
          <div className="border-border h-full w-full rounded-full bg-gradient-to-b from-[#3BBBF6] to-[#266DF0]" />
        )}
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <input type="file" onChange={handleFileChange} accept="image/*" id="file-input" name="profileImage" hidden />
        {/* Hidden input to store the base64 image data */}
        <input type="hidden" name="profileImage" value={image || ""} />
        <Button variant="outline" type="button" asChild className="h-11 cursor-pointer rounded-[12px] text-sm">
          <label htmlFor="file-input">
            <FileUp size={16} />
            <span>{t("uploadPhoto")}</span>
          </label>
        </Button>
        <Button
          variant="outline"
          disabled={!image}
          type="button"
          className="h-11 rounded-[12px] border-red-500 text-sm text-red-500 capitalize hover:text-red-500"
          onClick={() => setImage(null)}>
          {t("remove")}
        </Button>
      </div>
    </div>
  );
};

export default ImageModification;
