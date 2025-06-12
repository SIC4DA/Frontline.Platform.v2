import React from "react";

const UserCardWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative mx-auto mt-28 w-full max-w-[488px]">
      <div className="absolute top-[-16px] left-[-16px] z-[1] h-[calc(100%+32px)] w-[calc(100%+32px)] rounded-3xl bg-gradient-to-b from-[#FFF] to-transparent opacity-30" />
      <div className="absolute top-[-8px] left-[-8px] z-[2] h-[calc(100%+16px)] w-[calc(100%+16px)] rounded-2xl bg-gradient-to-b from-[#FFF] to-transparent opacity-50" />
      {children}
    </div>
  );
};

export default UserCardWrapper;
