import type { NextPage } from "next";
import Head from "next/head";
import Header from "../components/Header";
import Image from "next/image";

const Home: NextPage = () => {
  return (
    <>
      <div className="max-w-7xl mx-auto">
        <Head>
          <title>Blog</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Header />

        <div className="flex justify-between items-center bg-purple-400  border-black p-8 lg:py-5 lg:rounded-lg">
          <div className="px-10 space-y-5">
            <h1 className="text-5xl max-w-xl md:text-6xl">
              <span className="underline decoration-4">Blog:</span> Your go-to
              source for the latest news and updates
            </h1>
            <h2 className="text-2xl md:text-3xl">
              Discover a world of endless content and endless possibilities!
            </h2>
          </div>

          <div>
            <Image
              src="/../public/assets/images/logo-secondary.webp"
              width={150}
              height={150}
              alt="logo"
              className="hidden rounded-sm md:block md:h-25 md:w-20 lg:h-80 lg:w-40 "
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
