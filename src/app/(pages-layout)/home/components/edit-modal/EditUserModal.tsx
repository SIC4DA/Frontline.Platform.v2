"use client";

import FormError from "@/components/shared/FormError";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { User } from "@/types/user";
import { LoaderCircle, Pencil, XIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState } from "react";
import { editUserAction } from "../../actions/editUser";
import EditUserFields from "./EditUserFields";
import ImageModification from "./ImageModification";

const EditUserModal = ({ user }: { user: User }) => {
  const t = useTranslations("home");
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [state, formAction, isPending] = useActionState(editUserAction, {
    status: "idle",
    fullName: "",
    username: "",
    bio: "",
  });

  useEffect(() => {
    if (state.status === "success") {
      setIsOpen(false);
      router.refresh();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.status]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="default" className="flex self-end justify-self-end rounded-md p-4 max-2xl:p-3">
          <Pencil className="text-foreground size-[18px] max-2xl:size-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="p-0 sm:max-w-[589px]" aria-describedby="edit-user-modal">
        <DialogHeader className="border-border flex flex-row items-center justify-between border-b p-6">
          <DialogTitle className="text-base font-normal capitalize">{t("editInformation")}</DialogTitle>
          <DialogClose
            aria-label="Close"
            className="rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4">
            <XIcon />
          </DialogClose>
        </DialogHeader>
        <form action={formAction} id="edit-user-form" className="gap-4 p-6 pb-0">
          {state.errors?.form && (
            <FormError errorMessage={state.errors?.form?.[0] || "An error occurred, please try again"} />
          )}
          <ImageModification userImage={user.image} />
          <EditUserFields user={user} state={state} />
        </form>
        <DialogFooter className="grid grid-cols-2 gap-4 p-6">
          <DialogClose asChild>
            <Button variant="outline">{t("cancel")}</Button>
          </DialogClose>
          <Button form="edit-user-form" type="submit" variant="primary" disabled={isPending}>
            {isPending ? (
              <>
                <LoaderCircle size={21} className="mr-2 animate-spin" />
                {t("saving")}
              </>
            ) : (
              t("save")
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditUserModal;
