"use client";

import { LoaderCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import React, { useActionState } from "react";

import FormError from "@/components/shared/FormError";
import { Button } from "@/components/ui/button";
import type { User } from "@/types/user";

import { editUserAction } from "../actions/editUser";
import EditUserFields from "./EditUserFields";
import ImageModification from "./ImageModification";

const UserModificationForm = ({ user }: { user: User }) => {
  const t = useTranslations("home");
  const [state, formAction, isPending] = useActionState(editUserAction, {
    status: "idle",
    fullName: "",
    username: "",
    bio: "",
  });

  return (
    <form action={formAction} id="edit-user-form" className="gap-4 pb-0 max-w-xl">
      {state.errors?.form && (
        <FormError errorMessage={state.errors?.form?.[0] || "An error occurred, please try again"} />
      )}
      <ImageModification userImage={user.image} />
      <EditUserFields user={user} state={state} />
      <Button form="edit-user-form" type="submit" className="mt-4 min-w-[147px]" variant="primary" disabled={isPending}>
        {isPending ? (
          <>
            <LoaderCircle size={21} className="mr-2 animate-spin" />
            {t("updating")}
          </>
        ) : (
          t("update")
        )}
      </Button>
    </form>
  );
};

export default UserModificationForm;
