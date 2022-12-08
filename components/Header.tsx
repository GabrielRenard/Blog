import React from "react";
import Link from "next/link";
import Image from "next/image";
import Logo from "../public/assets/images/logo_primary.svg";

const Header = () => {
  return (
    <header className="flex justify-between p-3 max-w-7xl mx-auto">
      <div className="flex items-center space-x-10">
        <div className="w-fit">
          <Link href="/">
            <Image
              src="/../public/assets/images/logo-primary.webp"
              width={125}
              height={125}
              alt="logo"
            ></Image>
          </Link>
        </div>
        <div className="hidden md:inline-flex items-center space-x-5">
          <h3>About</h3>
          <h3>Contact</h3>
          <h3>Follow</h3>
        </div>
      </div>
      <div className="flex items-center space-x-5">
        <h3>Sign in</h3>
        <h3>Get Started</h3>
      </div>
    </header>
  );
};

export default Header;
