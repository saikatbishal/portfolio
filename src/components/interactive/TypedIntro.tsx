import { ReactTyped } from "react-typed";

const TypedIntro = () => {
  return (
    <section className="py-16 bg-white dark:bg-gray-950 border-t border-gray-100 dark:border-gray-900">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <div className="mb-8">
          <span className="font-mono text-sm text-gray-500 dark:text-gray-400">
            // identity_matrix
          </span>
        </div>

        <h2 className="text-3xl md:text-4xl font-bold font-sans mb-8 text-gray-900 dark:text-white">
          I'm a{" "}
          <span className="font-mono text-gray-600 dark:text-gray-400">
            <ReactTyped
              strings={[
                "Architect",
                "Problem Solver",
                "Digital Craftsman",
                "Logic Weaver",
                "React Specialist",
                "JavaScript Expert"
              ]}
              typeSpeed={50}
              backSpeed={30}
              backDelay={2000}
              loop
              className="inline-block"
            />
          </span>
        </h2>

        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed font-sans">
          Weaving logic into experiences. I don't just write code; I compose digital symphonies.
        </p>
      </div>
    </section>
  );
};

export default TypedIntro;