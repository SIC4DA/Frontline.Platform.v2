import React from "react";

import type { User as UserType } from "@/types/user";

import UserCard from "./UserCard";

const UserCardWrapper = ({ user }: { user: UserType | null }) => {
  return (
    <div className="relative mx-auto mt-28 w-full max-w-[488px]">
      <div className="absolute top-[-16px] left-[-16px] z-[1] h-[calc(100%+32px)] w-[calc(100%+32px)] rounded-3xl bg-gradient-to-b from-[#FFF] to-transparent opacity-30" />
      <div className="absolute top-[-8px] left-[-8px] z-[2] h-[calc(100%+16px)] w-[calc(100%+16px)] rounded-2xl bg-gradient-to-b from-[#FFF] to-transparent opacity-50" />
      <UserCard user={user} />
    </div>
  );
};

export default UserCardWrapper;
