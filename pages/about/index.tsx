const About = () => {
  return (
    <>
      <div className="flex flex-col max-w-md mx-auto mt-[150px] bg-gradient-to-b from-emerald-400 to-emerald-100 px-10 py-5 rounded-lg justify-center items-center">
        <h1 className="text-5xl mb-5">About</h1>
        <p className="text-2xl">
          This website was created as a project to demonstrate skills in
          Front-End Web Development{" "}
          <b>(NextJS, TypeScript, React, TailwindCSS) </b>
          coupled with <b>Sanity.io</b> CMS. <br /> <br />{" "}
          <em>
            All the data in the blogs were generated using Open AI's GPT-3.
            <br /> <br />
            The blog authors are fictitious.
          </em>
        </p>
      </div>
    </>
  );
};

export default About;
