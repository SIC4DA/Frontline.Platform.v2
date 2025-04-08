import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <header className="w-full px-5">
      <Link className="mx-auto block w-fit" href="/">
        <Image src="/images/frontline-logo.webp" alt="logo" width={165} height={50} className="object-cover" />
      </Link>
    </header>
  );
};

export default Header;
