import profileImage from "../assets/profile.png";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import ArrowOutwardOutlinedIcon from "@mui/icons-material/ArrowOutwardOutlined";
import { useTypingEffect } from "../hooks/useTypingEffect";

const Hero = () => {
  const name = "SAIKAT BISHAL";
  const typedName = useTypingEffect(name, 100, 500);

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
      <div className="absolute inset-0 bg-grid-pattern dark:bg-grid-pattern-dark animate-grid-beat opacity-[0.25] bg-[length:40px_40px]  dark:opacity-[0.1]" />

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left Side */}
        <div className="text-center lg:text-left animate-fade-in">

          {/* Badge */}
          <div className="mb-6">
            <span className="font-mono text-sm px-3 py-1 border border-gray-200 dark:border-gray-800 rounded text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-900">
              &gt; Architect_Mode_Active
            </span>
          </div>

          {/* Name with Typing Effect */}
          <h1
            className="font-sans text-gray-900 dark:text-white mb-6 tracking-tight"
            style={{
              fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
              fontWeight: 800,
              lineHeight: 1.1
            }}
          >
            {typedName}
            <span className="animate-pulse text-gray-400">_</span>
          </h1>

          <div className="mb-8 max-w-2xl mx-auto lg:mx-0">
            <div className="code-block text-left text-sm md:text-base text-gray-600 dark:text-gray-300">
              <p className="mb-2"><span className="text-gray-400">const</span> <span className="text-gray-900 dark:text-white">role</span> = <span className="text-gray-500">"Architect of invisible cities"</span>;</p>
              <p className="mb-2"><span className="text-gray-400">const</span> <span className="text-gray-900 dark:text-white">location</span> = <span className="text-gray-500">"Kolkata, India"</span>;</p>
              <p><span className="text-gray-400">const</span> <span className="text-gray-900 dark:text-white">mission</span> = <span className="text-gray-500">"Translating human intent into machine logic."</span>;</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <button
              onClick={handleScrollToProjects}
              className="group px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-medium rounded hover:bg-gray-800 dark:hover:bg-gray-100 transition-all hover:scale-105 duration-200 flex items-center justify-center gap-2"
            >
              View Artifacts
              <ArrowOutwardOutlinedIcon className="text-sm transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
            </button>

            <button
              onClick={handleScrollToContact}
              className="group px-6 py-3 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 font-medium rounded hover:bg-gray-50 dark:hover:bg-gray-800 transition-all hover:scale-105 duration-200 flex items-center justify-center gap-2"
            >
              Initiate Handshake
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
                alt="Saikat Bishal - Full Stack Developer"
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

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border border-gray-400 dark:border-gray-600 rounded-full flex justify-center">
          <div className="w-1 h-2 bg-gray-400 dark:bg-gray-600 rounded-full mt-2" />
        </div>
      </div>
    </section>

  );
};

export default Hero;
