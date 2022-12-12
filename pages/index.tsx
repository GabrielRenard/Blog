import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { sanityClient, urlFor } from "../sanity";
import { Post } from "../typings";
import Link from "next/link";
import author from "../sanity-blog/schemas/author";

interface Props {
  posts: [Post];
}

export const getServerSideProps = async () => {
  const query = `*[_type == "post"] {
    _id,
    title,
    author-> {
      name,
      image,
    },
    mainImage,
    description,
    slug,
  }`;

  const posts = await sanityClient.fetch(query);

  return {
    props: {
      posts,
    },
  };
};

const Home = ({ posts }: Props) => {
  console.log(posts);
  return (
    <>
      <div className="max-w-7xl mx-auto">
        <Head>
          <title>AI Insider</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <div className="mt-[105px] flex p-8 justify-between items-center bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-emerald-100 via-emerald-300 to-emerald-500 text-zinc-900 lg:rounded-lg">
          <div className="">
            <h1 className="mb-10 text-5xl max-w-xl md:text-6xl">
              Insights and Analysis from the World of Technology
            </h1>
            <h2 className="text-2xl md:text-3xl">
              Discover a world of endless content and endless possibilities!
            </h2>
          </div>

          <div>
            <Image
              src="/../public/assets/images/logo-secondary.png"
              width={150}
              height={150}
              alt="logo"
              className="hidden md:block md:h-25 md:w-25 lg:h-40 lg:w-40 "
            />
          </div>
        </div>
      </div>

      {/* Posts */}
      <div className="grid grid-cols-1 p-3 gap-3 sm:grid-cols-2 md:gap-5 md:p-4 lg:grid-cols-3">
        {posts.map(post => (
          <Link
            key={post._id}
            href={`/post/${post.slug.current}`}
            className="group"
          >
            <div className="overflow-hidden rounded-t-md">
              {post.mainImage && (
                <img
                  src={urlFor(post.mainImage).url()!}
                  alt="post image"
                  className="w-full aspect-[5/3] sm:aspect-[6/3] bg-blue-100 object-cover rounded-t-md group-hover:scale-105 group-hover:opacity-95 transition-all duration-300 ease-in-out"
                />
              )}
            </div>
            <div className="flex justify-between p-5 bg-emerald-200 rounded-b-md">
              <div className="">
                <p className="font-bold text-lg md:text-xl">{post.title}</p>
                <p className="lg:text-lg">{`By ${post.author.name}`}</p>
              </div>
              <img
                src={urlFor(post.author.image).url()!}
                alt="Author image"
                className="rounded-full w-12 h-12"
              />
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default Home;
