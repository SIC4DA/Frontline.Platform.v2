import { BadgeCheck, Pencil } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { User } from "@/lib/auth.types";

const UserData = ({ user }: { user: User }) => {
  return (
    <div className="mt-4 w-full px-7 max-sm:px-2">
      <Button
        variant="default"
        className="flex self-end justify-self-end rounded-md p-4"
      >
        <Pencil size={50} className="text-foreground" />
      </Button>
      <div className="mt-6">
        <div className="mb-2 flex items-center gap-1">
          <h1 className="-mt-0.5 text-2xl font-semibold">{user.name}</h1>
          <BadgeCheck fill="#49adf4" size={22} stroke="#fff" />
        </div>
        <p>Growth Partner & Friend and yeah iam the founder of frontline</p>
      </div>
    </div>
  );
};

export default UserData;
