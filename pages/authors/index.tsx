import { sanityClient, urlFor } from "../../sanity";
import { Author } from "../../typings";
import Link from "next/link";

//create a page for each author

interface Props {
  authors: [Author];
}

const Authors = ({ authors }: Props) => {
  console.log(authors);
  return (
    <>
      <div className="grid w-[500px] my-[150px] mx-auto p-10 gap-10 md:grid-cols-2 lg:grid-cols-4 md:w-full">
        {authors.map(author => (
          <Link
            key={author._id}
            href={`authors/${author.slug.current}`}
            className="group"
          >
            <div className="flex flex-col items-center">
              <img
                src={urlFor(author.image.asset).url()}
                alt="Author profile picture"
                className="object-cover lg:max-w-[250px] w-full aspect-square rounded-full group-hover:scale-105 transition-transform duration-300 ease-in-out"
              />
              <h1 className="flex justify-center text-3xl mt-8 group-hover:text-emerald-900">
                {author.name}
              </h1>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default Authors;

export const getStaticProps = async () => {
  const query = `*[_type == 'author'] {
        _id,
        name,
        image,
        slug
      }`;

  const authors = await sanityClient.fetch(query);

  return {
    props: {
      authors,
    },
  };
};
