import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import ArrowOutwardOutlinedIcon from "@mui/icons-material/ArrowOutwardOutlined";
import { getYearsOfExperience } from "../utils/experience";
import { GITHUB_URL, LINKEDIN_URL, RESUME_FILENAME, RESUME_URL } from "../data/links";

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
        <div className="text-center lg:text-left">
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
            <p className="text-lg md:text-xl font-sans text-gray-800 dark:text-gray-200 mb-4">
              I build web apps that stay fast and consistent as they grow, from the Figma file to production.
            </p>
            <p className="text-sm font-sans text-gray-600 dark:text-gray-400">
              Senior Frontend Engineer · {getYearsOfExperience()}+ years · Previously Rifa.ai, Ramco Systems
            </p>
            <p className="mt-1 text-sm font-sans text-gray-600 dark:text-gray-400">
              Now building{" "}
              <button
                onClick={handleScrollToProjects}
                className="underline underline-offset-4 decoration-gray-400 hover:text-gray-900 dark:hover:text-white"
              >
                Platform
              </button>{" "}
              · Open to new roles, remote preferred · Kolkata (IST)
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
            <button onClick={handleScrollToProjects} className="btn btn-primary group">
              See work
              <ArrowOutwardOutlinedIcon className="text-sm transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </button>
            <button onClick={handleScrollToContact} className="btn btn-secondary group">
              Get in touch
              <KeyboardArrowRightOutlinedIcon className="transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>

          <p className="mt-6 text-sm font-sans text-gray-600 dark:text-gray-400 flex flex-wrap gap-x-4 gap-y-2 justify-center lg:justify-start">
            <a href={RESUME_URL} download={RESUME_FILENAME} className="underline underline-offset-4 decoration-gray-300 dark:decoration-gray-600 hover:text-gray-900 dark:hover:text-white">
              Résumé (PDF)
            </a>
            <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 decoration-gray-300 dark:decoration-gray-600 hover:text-gray-900 dark:hover:text-white">
              LinkedIn ↗
            </a>
            <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 decoration-gray-300 dark:decoration-gray-600 hover:text-gray-900 dark:hover:text-white">
              GitHub ↗
            </a>
          </p>
        </div>

        {/* Right Side Image */}
        <div className="flex justify-center lg:justify-end">
          <div className="relative group">
            <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-4 rounded-lg transition-transform duration-500 group-hover:rotate-2 group-hover:scale-[1.02]">
              <picture>
                <source
                  type="image/avif"
                  srcSet="/profile-400.avif 400w, /profile-800.avif 800w"
                  sizes="(min-width: 1024px) 400px, 80vw"
                />
                <img
                  src="/profile-800.webp"
                  srcSet="/profile-400.webp 400w, /profile-800.webp 800w"
                  sizes="(min-width: 1024px) 400px, 80vw"
                  alt="Saikat Bishal"
                  className="rounded"
                  width={400}
                  height={400}
                  fetchPriority="high"
                  decoding="async"
                  style={{
                    objectFit: "cover",
                  }}
                />
              </picture>
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
