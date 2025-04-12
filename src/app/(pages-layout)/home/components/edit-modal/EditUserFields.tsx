"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { User } from "@/lib/auth.types";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { EditUserState } from "../../actions/editUser";

const EditUserFields = ({ user, state }: { user: User; state: EditUserState }) => {
  const t = useTranslations("home");
  const [bio, setBio] = useState<string>("");

  return (
    <fieldset className="mt-8 grid grid-cols-2 gap-4">
      <div>
        <label className="mb-2 text-sm" htmlFor="fullName">
          {t("fullName")}
        </label>
        <Input
          type="text"
          id="fullName"
          name="fullName"
          defaultValue={user.name || ""}
          placeholder={t("fullNamePlaceholder")}
          className={cn("h-10 !text-sm placeholder:text-sm", state.errors?.fullName && "border-error")}
        />
        {state.errors?.fullName && (
          <p className="mt-1 text-xs text-red-600">{(state.errors.fullName as string[])?.[0]}</p>
        )}
      </div>
      <div>
        <label className="mb-2 text-sm" htmlFor="username">
          {t("username")}
        </label>
        <Input
          type="text"
          id="username"
          name="username"
          defaultValue={user.username || ""}
          placeholder={t("usernamePlaceholder")}
          className={cn("h-10 !text-sm placeholder:text-sm", state.errors?.username && "border-error")}
        />
        {state.errors?.username && (
          <p className="mt-1 text-xs text-red-600">{(state.errors.username as string[])?.[0]}</p>
        )}
      </div>
      <div className="col-span-2">
        <label className="mb-2 text-sm" htmlFor="bio">
          {t("bio")}
        </label>
        <div className="relative">
          <Textarea
            id="bio"
            name="bio"
            maxLength={150}
            value={bio}
            defaultValue={user.bio || ""}
            onChange={(e) => setBio(e.target.value)}
            placeholder={t("bioPlaceholder")}
            className={cn(
              "h-28 resize-none rounded-[12px] !text-sm placeholder:text-sm",
              state.errors?.bio && "border-error",
            )}
          />
          <span className="text-foreground-secondary absolute right-4 bottom-3 text-xs">
            {bio.length}/{150}
          </span>
        </div>
        {state.errors?.bio && <p className="mt-1 text-xs text-red-600">{(state.errors.bio as string[])?.[0]}</p>}
      </div>
    </fieldset>
  );
};

export default EditUserFields;
