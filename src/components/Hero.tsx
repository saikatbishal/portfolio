import profileImage from "../assets/profile.png";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import ArrowOutwardOutlinedIcon from "@mui/icons-material/ArrowOutwardOutlined";
import { getYearsOfExperience } from "../utils/experience";

const Hero = () => {
  const handleScrollToProjects = () => {
    const element = document.querySelector("#projects");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  const handleScrollToContact = () => {
    const element = document.querySelector("#contact");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center relative overflow-hidden 
             bg-white dark:bg-gray-950 pt-20"
    >
      {/* Minimalist Grid Background */}
      <div className="absolute inset-0 bg-grid-pattern dark:bg-grid-pattern-dark opacity-[0.25] bg-[length:40px_40px]  dark:opacity-[0.1]" />

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left Side */}
        <div className="text-center lg:text-left animate-fade-in">
          <h1
            className="font-sans text-gray-900 dark:text-white mb-6 tracking-tight"
            style={{
              fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
              fontWeight: 800,
              lineHeight: 1.1
            }}
          >
            Saikat Bishal
          </h1>

          <div className="mb-8 max-w-2xl mx-auto lg:mx-0">
            <p className="text-base md:text-lg font-sans text-gray-800 dark:text-gray-200 mb-3">
              I build component libraries and token pipelines that keep product UIs consistent, from Figma to production.
            </p>
            <p className="text-sm font-mono text-gray-600 dark:text-gray-400">
              React · TypeScript · {getYearsOfExperience()}+ years · 25+ component library and Figma-token migration at Rifa.ai
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <button
              onClick={handleScrollToProjects}
              className="group px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-medium rounded hover:bg-gray-800 dark:hover:bg-gray-100 transition-all hover:scale-105 duration-200 flex items-center justify-center gap-2"
            >
              See work
              <ArrowOutwardOutlinedIcon className="text-sm transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
            </button>

            <button
              onClick={handleScrollToContact}
              className="group px-6 py-3 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 font-medium rounded hover:bg-gray-50 dark:hover:bg-gray-800 transition-all hover:scale-105 duration-200 flex items-center justify-center gap-2"
            >
              Say Hello
              <KeyboardArrowRightOutlinedIcon className="transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>

        {/* Right Side Image */}
        <div className="flex justify-center lg:justify-end animate-fade-in">
          <div className="relative group">
            <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-4 rounded-lg transition-transform duration-500 group-hover:rotate-2 group-hover:scale-[1.02]">
              <img
                src={profileImage}
                alt="Saikat Bishal"
                className="rounded grayscale hover:grayscale-0 transition-all duration-500"
                width="400"
                height="400"
                loading="eager"
                decoding="sync"
                style={{
                  objectFit: "cover",
                }}
              />
            </div>

            {/* Minimalist accents */}
            <div className="absolute -top-4 -right-4 w-24 h-24 border border-gray-200 dark:border-gray-800 -z-10 transition-transform duration-500 group-hover:translate-x-2 group-hover:-translate-y-2" />
            <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-gray-100 dark:bg-gray-800 -z-10 transition-transform duration-500 group-hover:-translate-x-2 group-hover:translate-y-2" />
          </div>
        </div>
      </div>
    </section>

  );
};

export default Hero;
