import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="z-10 fixed top-0 w-full bg-zinc-50 shadow-md shadow-zinc-300 flex justify-between px-5 py-1 text-zinc-900">
      <div className="flex items-center space-x-10">
        <div className="">
          <Link href="/">
            <div className="flex items-center cursor-pointer group">
              <img
                src="/assets/images/logo-primary.svg"
                alt="Logo"
                className="w-[60px] lg:w-[70px] group-hover:scale-105 transition-transform duration-300 ease-in-out"
              />
              <h1 className="orbitron hidden text-5xl lg:block">
                AI
                <span className=" text-transparent bg-clip-text bg-gradient-to-bl from-emerald-900 via-emerald-600 to-emerald-900">
                  INSIDER
                </span>
              </h1>
            </div>
          </Link>
        </div>
        <div className="hidden md:inline-flex items-center space-x-10">
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/follow">Follow</Link>
        </div>
      </div>
      <div className="flex items-center space-x-5">
        <h3>Sign in</h3>
        <h3>Get Started</h3>
      </div>
    </nav>
  );
};

export default Navbar;
