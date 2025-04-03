import Image from "next/image";

import type { User } from "@/lib/auth.types";

const UserCover = ({ user }: { user: User }) => {
  return (
    <div className="relative h-[300px] w-full rounded-xl bg-gradient-to-b from-[#266DF0] to-[#89D9FF] duration-300 max-2xl:h-[220px]">
      <Image
        draggable={false}
        src={user.image ?? "/images/danny.jpg"}
        className="border-background absolute -bottom-14 left-7 aspect-square w-36 rounded-[47px] border-[5px] shadow-2xl duration-300 max-2xl:-bottom-10 max-2xl:w-24 max-2xl:rounded-[29px]"
        alt="user Image"
        width={144}
        height={144}
      />
    </div>
  );
};

export default UserCover;
