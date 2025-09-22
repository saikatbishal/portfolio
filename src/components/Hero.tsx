import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import profileImage from "../assets/saikatbishal-portfolio_image.jpeg";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import ArrowOutwardOutlinedIcon from "@mui/icons-material/ArrowOutwardOutlined";
// Remove the custom hook for now for clarity

const Hero = () => {
  const name = "SAIKAT BISHAL";
  // Array ref for each character span
  const heroSpans = useRef([]);

  useEffect(() => {
    // Clean out refs on each render (important for React strict mode)
    heroSpans.current = heroSpans.current.slice(0, name.length);

    // Animate all character spans
    gsap.to(heroSpans.current, {
  y: 0,
  opacity: 1,
  visibility: "visible",
  duration: 1,
  ease: "power3.out",
  stagger: 0.07,
  delay: 0.7,
  autoAlpha: 1 // Animate both opacity & visibility
});


  }, [name]);

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
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-slate-50 to-slate-200 dark:from-slate-900 dark:to-slate-800 pt-20 particle-section"
    >
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute top-20 left-10 w-72 h-72 rounded-full animate-float bg-gradient-to-br from-blue-500/10 to-purple-500/10 dark:from-blue-400/20 dark:to-purple-400/20 blur-[40px]"
          style={{ animationDelay: "0s" }}
        />
        <div
          className="absolute bottom-20 right-10 w-96 h-96 rounded-full animate-float bg-gradient-to-br from-cyan-500/10 to-emerald-500/10 dark:from-cyan-400/20 dark:to-emerald-400/20 blur-[40px]"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full animate-float bg-gradient-to-br from-amber-500/10 to-red-500/10 dark:from-amber-400/20 dark:to-red-400/20 blur-[60px]"
          style={{ animationDelay: "4s" }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Content */}
        <div className="text-center lg:text-left animate-fade-in">
          <div className="mb-6">
            <span className="text-caption px-4 py-2 rounded-full bg-blue-500/10 dark:bg-blue-400/20 text-blue-600 dark:text-blue-400 border border-blue-500/20 dark:border-blue-400/30 backdrop-blur-md">
              👋 Hello, I'm
            </span>
          </div>
          <h1
            className="text-display mb-6 animate-slide-up"
            style={{
              fontSize: "clamp(3rem, 8vw, 5rem)",
              fontWeight: 700,
              lineHeight: 1.1,
              marginBottom: "var(--spacing-lg)",
            }}
          >
            <div className="gradient-text">
              {name.split("").map((ch, i) => (
                <span
                  className="text"
                  key={i}
                  ref={el => heroSpans.current[i] = el}
                  style={{
                    display: "inline-block",
                    // Allows GSAP to animate vertically
                  }}
                >
                  {ch}
                </span>
              ))}
            </div>
          </h1>

          <h2
            className="text-heading mb-8 animate-slide-up"
            style={{
              fontSize: "clamp(1.5rem, 4vw, 2.5rem)",
              fontWeight: 600,
              color: "var(--text-secondary)",
              marginBottom: "var(--spacing-xl)",
              animationDelay: "0.2s",
            }}
          >
            Full Stack Web Developer
          </h2>

          <p
            className="text-body mb-10 max-w-2xl animate-slide-up"
            style={{
              fontSize: "1.25rem",
              color: "var(--text-secondary)",
              marginBottom: "var(--spacing-2xl)",
              animationDelay: "0.4s",
            }}
          >
            I craft beautiful, functional digital experiences that solve
            real-world problems. Passionate about clean code, innovative design,
            and creating meaningful user interactions.
          </p>

          <div
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-slide-up"
            style={{ animationDelay: "0.6s" }}
          >
            <button
              onClick={handleScrollToProjects}
              className="btn btn-primary group"
              style={{
                padding: "1rem 2rem",
                fontSize: "1.1rem",
                borderRadius: "var(--radius-md)",
              }}
            >
              View My Work
              <KeyboardArrowRightOutlinedIcon
                className="transition-transform group-hover:translate-x-1"
                style={{ fontSize: "1.25rem" }}
              />
            </button>

            <button
              onClick={handleScrollToContact}
              className="btn btn-secondary group"
              style={{
                padding: "1rem 2rem",
                fontSize: "1.1rem",
                borderRadius: "var(--radius-md)",
              }}
            >
              Get In Touch
              <ArrowOutwardOutlinedIcon
                className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                style={{ fontSize: "1.25rem" }}
              />
            </button>
          </div>
        </div>

        {/* Profile Image */}
        <div
          className="flex justify-center lg:justify-end animate-fade-in"
          style={{ animationDelay: "0.8s" }}
        >
          <div className="relative">
            {/* Glassmorphism frame */}
            <div className="bg-white/25 dark:bg-gray-800/25 backdrop-blur-xl border border-white/20 dark:border-gray-700/20 p-8 rounded-3xl">
              <img
                src={profileImage}
                alt="Saikat Bishal - Full Stack Web Developer"
                className="rounded-2xl transition-transform duration-300 ease-in-out hover:scale-110 cursor-pointer"
                style={{
                  width: "400px",
                  height: "400px",
                  objectFit: "cover",
                  borderRadius: "var(--radius-lg)",
                }}
              />
            </div>
            {/* Floating accent elements */}
            <div
              className="absolute -top-4 -right-4 w-20 h-20 rounded-full animate-float bg-gradient-to-br from-cyan-500 to-emerald-500 dark:from-cyan-400 dark:to-emerald-400"
              style={{ animationDelay: "1s" }}
            />
            <div
              className="absolute -bottom-6 -left-6 w-16 h-16 rounded-full animate-float bg-gradient-to-br from-amber-500 to-red-500 dark:from-amber-400 dark:to-red-400"
              style={{ animationDelay: "3s" }}
            />
          </div>
        </div>
      </div>
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-gray-400 dark:border-gray-500 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-blue-600 dark:bg-blue-400 rounded-full mt-2" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
