import { sanityClient, urlFor } from "../../sanity";
import { GetStaticProps } from "next";
import { Post } from "../../typings";
import PortableText from "react-portable-text";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";

interface Props {
  post: Post;
}

interface FormInput {
  _id: string;
  name: string;
  email: string;
  comment: string;
}

const Post = ({ post }: Props) => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>();

  const onSubmit: SubmitHandler<FormInput> = async data => {
    await fetch("/api/createComment", {
      method: "POST",
      body: JSON.stringify(data),
    })
      .then(() => {
        console.log(data);
        setIsSubmitted(true);
        setTimeout(() => {
          setIsSubmitted(false);
        }, 3000);
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <>
      <img
        src={urlFor(post.mainImage).url()!}
        alt=""
        className=" w-full mt-[90px] h-[400px] object-cover lg:rounded-tl-full lg:rounded-br-full"
      />

      <article className="p-5">
        <div className="flex justify-center flex-col items-center lg:flex-row lg:gap-10">
          <h1 className="text-5xl md:text-6xl">{post.title}</h1>
          <div className="flex items-center space-x-5 my-5">
            <img
              src={urlFor(post.author.image).url()!}
              alt="Blog Post Author Profile"
              className="w-[75px] h-[75px] aspect-[1/2] object-cover rounded-full md:w-[100px] md:h-[100px]"
            />
            <div>
              <p>
                By{" "}
                <Link
                  href={`/Authors/${post.author.slug.current}`}
                  className="text-blue-600 hover:text-blue-800"
                >
                  {post.author.name}
                </Link>
              </p>
              <p>Published at {new Date(post._createdAt).toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-light italic my-10 md:text-3xl">
            {post.description}
          </h2>
          <PortableText
            dataset={process.env.NEXT_PUBLIC_SANITY_DATASET}
            projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}
            content={post.body}
            className="text-xl md:text-2xl"
            serializers={{}}
          />
        </div>
      </article>

      <hr className="my-10 border-4 bg-zinc-600" />

      <div className="flex flex-col max-w-3xl mx-auto">
        <input {...register("_id")} type="hidden" name="_id" value={post._id} />

        <h2 className="text-2xl md:text-3xl self-center">
          Leave a Comment Below
        </h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          action=""
          className="flex flex-col p-5 my-10 bg-emerald-400 rounded-lg items-center w-11/12 mx-auto"
        >
          <label htmlFor="" className="mb-5" />
          <span className="mr-3">Name</span>
          <input
            {...register("name", { required: true })}
            type="text"
            placeholder="Name"
            className="rounded-sm p-0.5 outline-none focus:ring-4 ring-emerald-700 transition-all duration-150 ease-in-out"
          />
          {errors.name && (
            <span className="text-red-700 mt-2">Name is required</span>
          )}

          <label htmlFor="" className="mb-5" />
          <span className="mr-3">Email</span>
          <input
            {...register("email", { required: true })}
            type="email"
            placeholder="Email"
            className="rounded-sm p-0.5 outline-none focus:ring-4 ring-emerald-700 transition-all duration-150 ease-in-out"
          />
          {errors.email && (
            <span className="text-red-700 mt-2">Email is required</span>
          )}

          <label htmlFor="" className="mb-5 flex flex-col" />
          <span className="mr-3">Comment</span>
          <textarea
            {...register("comment", { required: true })}
            placeholder="Comment"
            rows={8}
            className="rounded-md p-0.5 w-10/12 outline-none focus:ring-4 ring-emerald-700 transition-all duration-150 ease-in-out"
          />
          {errors.comment && (
            <span className="text-red-700 mt-2">Comment is required</span>
          )}

          <button
            type="submit"
            className="bg-emerald-600 hover:bg-emerald-800 text-zinc-50 p-2 w-full rounded-md transition-colors duration-150 ease-in-out mt-5 lg:w-1/3"
          >
            Submit
          </button>
        </form>

        {isSubmitted && (
          <h2 className="bg-green-500 p-2 rounded-md text-center text-lg font-bold mb-10 transition-transform animate-bounce duration-200 ease-linear">
            Comment Submitted, waiting for approval.
          </h2>
        )}
      </div>

      {/* Comments */}
      <div className="max-w-3xl mx-auto bg-emerald-100 p-5 rounded-lg mb-10">
        <h3 className="text-3xl lg:text-4xl text-center">Comments</h3>
        <hr />
        {post.comments.map(comment => (
          <div key={comment._id} className=" p-5 flex justify-center">
            <p className="text-zinc-900 text-xl">
              <span className="text-emerald-800">{comment.name}: </span>
              {comment.comment}
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Post;

export const getStaticPaths = async () => {
  const query = `*[_type == "post"] {
    _id,
    slug {
      current
    }
  }`;

  const posts = await sanityClient.fetch(query);

  const paths = posts.map((post: Post) => ({
    params: { slug: post.slug.current },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const query = `*[_type == "post" && slug.current == $slug][0] {
    _id,
    _createdAt,
    title,
    author-> {
      name, 
      image,
      slug
    },
    'comments': *[_type == "comment" && post._ref == ^._id && approved == true],
    description,
    mainImage,
    slug,
    body
}`;
  const post = await sanityClient.fetch(query, { slug: params?.slug });

  if (!post) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      post,
    },
    // revalidate: 3000, // 30 min to update cache
  };
};
