import React from "react";
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
             bg-gradient-to-br from-[#FDF6FF] to-[#E8F4FF] 
             dark:from-[#1D1A25] dark:to-[#1A2330] pt-20 particle-section"
    >

      {/* Pastel Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute top-20 left-10 w-72 h-72 rounded-full animate-float
                 bg-gradient-to-br from-[#A5D8FF]/20 to-[#C8B6FF]/20 
                 dark:from-[#A5D8FF]/10 dark:to-[#C8B6FF]/10 blur-[40px]"
          style={{ animationDelay: "0s" }}
        />
        <div
          className="absolute bottom-20 right-10 w-96 h-96 rounded-full animate-float
                 bg-gradient-to-br from-[#C1F5D8]/20 to-[#FFCBDD]/20
                 dark:from-[#C1F5D8]/10 dark:to-[#FFCBDD]/10 blur-[40px]"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                 w-80 h-80 rounded-full animate-float
                 bg-gradient-to-br from-[#FFF4B5]/20 to-[#FFC7C2]/20 
                 dark:from-[#FFF4B5]/10 dark:to-[#FFC7C2]/10 blur-[60px]"
          style={{ animationDelay: "4s" }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left Side */}
        <div className="text-center lg:text-left animate-fade-in">

          {/* Badge */}
          <div className="mb-6">
            <span className="text-caption px-4 py-2 rounded-full 
                         bg-[#A5D8FF]/20 dark:bg-[#A5D8FF]/10 
                         text-[#7AB8E6] dark:text-[#A5D8FF] 
                         border border-[#A5D8FF]/30 backdrop-blur-md">
              👋 Hello, I'm
            </span>
          </div>

          {/* Name with Typing Effect */}
          <h2
            className=" text-2xl font-bold bg-gradient-to-r from-pink-400 via-blue-400 to-green-400 bg-clip-text text-transparent hover:scale-105 transition-transform inline-block mb-6"
            style={{
              fontSize: "clamp(2rem, 6vw, 4rem)",
              fontWeight: 700,
              lineHeight: 1.1
            }}
          >
            {typedName}
            <span className="animate-pulse">|</span>
          </h2>

          {/* Name - Gradient version (comment out the above if this works) */}
          {/* <h1
            className="text-display mb-6"
            style={{
              fontSize: "clamp(3rem, 8vw, 5rem)",
              fontWeight: 700,
              lineHeight: 1.1,
              background: "linear-gradient(to right, #3b82f6, #8b5cf6, #ec4899)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              color: "#2D3748" // Fallback color
            }}
          >
            {name.split("").map((ch, i) => (
              <span
                key={i}
                className="inline-block animate-fade-in"
                style={{ 
                  minWidth: ch === " " ? "0.3em" : "auto",
                  animationDelay: `${i * 50}ms`
                }}
              >
                {ch === " " ? "\u00A0" : ch}
              </span>
            ))}
          </h1> */}

          {/* Role */}
          <h2
            className="text-heading mb-8 animate-slide-up"
            style={{
              fontSize: "clamp(1.5rem, 4vw, 2.5rem)",
              fontWeight: 600,
              color: "#7A8095",
            }}
          >
            Full Stack Web Developer
          </h2>

          {/* Description */}
          <p
            className="text-body mb-10 max-w-2xl animate-slide-up"
            style={{
              fontSize: "1.25rem",
              color: "#8F96A6",
            }}
          >
            I craft beautiful, functional digital experiences with a love for clean
            code, soft aesthetics, and pleasant user interactions.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">

            {/* Primary Button – Pastel Blue */}
            <button
              onClick={handleScrollToProjects}
              className="btn group"
              style={{
                padding: "1rem 2rem",
                fontSize: "1.1rem",
                background: "#A5D8FF",
                color: "#1B2A41",
                borderRadius: "12px",
              }}
            >
              View My Work
              <KeyboardArrowRightOutlinedIcon
                className="transition-transform group-hover:translate-x-1"
              />
            </button>

            {/* Secondary Button – Pastel Lavender Outline */}
            <button
              onClick={handleScrollToContact}
              className="btn group"
              style={{
                padding: "1rem 2rem",
                fontSize: "1.1rem",
                borderRadius: "12px",
                border: "2px solid #C8B6FF",
                color: "#6E5AA8",
                background: "transparent",
              }}
            >
              Get In Touch
              <ArrowOutwardOutlinedIcon
                className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </button>
          </div>
        </div>

        {/* Right Side Image */}
        <div className="flex justify-center lg:justify-end animate-fade-in">
          <div className="relative">
            <div className="bg-white/60 dark:bg-[#222]/40 backdrop-blur-xl 
                        border border-white/30 dark:border-[#555]/20 
                        p-8 rounded-3xl">
              <img
                src={profileImage}
                alt="Saikat Bishal - Full Stack Developer"
                className="rounded-2xl transition-transform duration-300 hover:scale-110"
                width="400"
                height="400"
                loading="eager"
                decoding="sync"
                style={{
                  objectFit: "cover",
                  borderRadius: "16px",
                }}
              />
            </div>

            {/* Floating accents */}
            <div
              className="absolute -top-4 -right-4 w-20 h-20 rounded-full animate-float
                     bg-gradient-to-br from-[#A5D8FF] to-[#C8B6FF]"
            />
            <div
              className="absolute -bottom-6 -left-6 w-16 h-16 rounded-full animate-float
                     bg-gradient-to-br from-[#FFCBDD] to-[#FFF4B5]"
            />
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-[#C8B6FF] rounded-full flex justify-center">
          <div className="w-1 h-3 bg-[#A5D8FF] rounded-full mt-2" />
        </div>
      </div>
    </section>

  );
};

export default Hero;
