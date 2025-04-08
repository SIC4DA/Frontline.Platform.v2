import { BadgeCheck, Pencil } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { User } from "@/lib/auth.types";

const UserData = ({ user }: { user: User }) => {
  return (
    <div className="mt-4 w-full px-7 max-md:px-4 max-sm:px-2">
      <Button variant="default" className="flex self-end justify-self-end rounded-md p-4 max-2xl:p-3">
        <Pencil
          // size={50}
          className="text-foreground size-[18px] max-2xl:size-4"
        />
      </Button>
      <div className="mt-6 max-2xl:mt-3">
        <div className="mb-2 flex items-center gap-1">
          <h1 className="-mt-0.5 text-2xl font-medium max-2xl:text-lg">{user.name}</h1>
          <BadgeCheck
            fill="#49adf4"
            className="size-[22px] max-2xl:size-[18px]"
            // size={22}
            stroke="#fff"
          />
          <p className="text-foreground-secondary text-sm max-2xl:text-xs">@{user.username}</p>
        </div>
        <p className="max-2xl:text-sm">Growth Partner & Friend and yeah iam the founder of frontline</p>
      </div>
    </div>
  );
};

export default UserData;
