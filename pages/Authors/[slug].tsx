import { sanityClient, urlFor } from "../../sanity";
import { Author } from "../../typings";
import { GetStaticProps } from "next";
import Post from "../post/[slug]";

interface Props {
  author: Author;
}

const Author = ({ author }: Props) => {
  console.log(author);
  return (
    <>
      <div className="grid justify-items-center mt-[100px]">
        <img
          src={urlFor(author.image.asset).url()}
          alt={`${author.name}'s profile picture`}
          className="w-80 h-80 object-cover rounded-full"
          height={""}
          width={""}
        />
        <h1 className="text-3xl my-5">{author.name}</h1>
        <p className="max-w-4xl text-xl p-10">
          {author.bio.map(item => item.children[0].text)}
        </p>
      </div>
    </>
  );
};

export default Author;

export const getStaticPaths = async () => {
  const query = `*[_type == "author"] {
    _id,
    slug {
      current
    }
  }`;

  const authors = await sanityClient.fetch(query);

  const paths = authors.map((author: Author) => ({
    params: { slug: author.slug.current },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const query = `*[_type == "author" && slug.current == $slug][0] {
    _id,
    name,
    image,
    posts[]-> {
      title,
    },
    bio,
    slug
}`;
  const author = await sanityClient.fetch(query, { slug: params?.slug });

  if (!author) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      author,
    },
  };
};
