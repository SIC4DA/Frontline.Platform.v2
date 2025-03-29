import { User } from "better-auth";
import Image from "next/image";

const UserCover = ({ user }: { user: User }) => {
  return (
    <div className="relative h-[300px] w-full rounded-xl bg-gradient-to-b from-[#EB001B] to-[#F79E1B]">
      <Image
        draggable={false}
        src={user.image ?? "/images/danny.jpg"}
        className="border-background absolute -bottom-14 left-7 aspect-square w-36 rounded-[47px] border-[5px] shadow-2xl"
        alt="user Image"
        width={144}
        height={144}
      />
    </div>
  );
};

export default UserCover;
