import Image from "next/image";
import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <header className="px-5 w-full">
      <Link className="block w-fit mx-auto" href="/">
        <Image
          src="/images/frontline-logo.webp"
          alt="logo"
          width={185}
          height={50}
          className="object-cover"
        />
      </Link>
    </header>
  );
};

export default Header;
