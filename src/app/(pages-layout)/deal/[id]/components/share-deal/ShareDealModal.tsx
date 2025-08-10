"use client";

import { Link2, XIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

import CopyLinkButton from "./CopyLinkButton";

const ShareDealModal = () => {
  const t = useTranslations("deal");
  const { id } = useParams();

  const appUrl = process.env.NEXT_PUBLIC_APP_ORIGIN;

  return (
    <Dialog>
      <DialogTrigger asChild className="flex w-full items-center justify-end gap-2 max-2xl:gap-1">
        <Button
          aria-label="share deal modal trigger"
          variant="default"
          className="text-primary-foreground flex w-fit self-end justify-self-end rounded-full bg-[#369FEA] p-4 !px-6 duration-300 hover:bg-[#369FEA]/90 max-sm:!px-2">
          <Link2 className="size-[18px] max-2xl:size-4" />
          <span className="max-2xl:text-sm max-sm:hidden">{t("share")}</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="rounded-2xl px-6 py-6 sm:max-w-[589px]" aria-describedby="edit-user-modal">
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle className="text-lg font-medium capitalize">{t("share")}</DialogTitle>
          <DialogClose
            aria-label="Close"
            className="rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4">
            <XIcon className="size-5" />
          </DialogClose>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <div>
            <p className="text-foreground-secondary mb-2 text-sm">{t("privateLink")}</p>
            <div className="border-border flex items-center justify-between gap-2 overflow-hidden rounded-lg border-2 px-4 py-2 max-sm:flex-col">
              <p className="max-w-[300px] overflow-hidden text-sm font-medium text-ellipsis whitespace-nowrap max-sm:max-w-[220px]">{`${appUrl}/deal/${id}`}</p>
              <CopyLinkButton link={`${appUrl}/deal/${id}`} />
            </div>
          </div>
          <div>
            <p className="text-foreground-secondary mb-2 text-sm">{t("publicLink")}</p>
            <div className="border-border flex items-center justify-between gap-2 overflow-hidden rounded-lg border-2 px-4 py-2 max-sm:flex-col">
              <p className="max-w-[300px] overflow-hidden text-sm font-medium text-ellipsis whitespace-nowrap max-sm:max-w-[220px]">{`${appUrl}/deal/${id}`}</p>
              <CopyLinkButton link={`${appUrl}/deal/${id}`} />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShareDealModal;
