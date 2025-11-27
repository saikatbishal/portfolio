import React from "react";
import { experiences } from "../data/experience";
import { useGSAPAnimations } from "../hooks/useGSAPAnimations";

const Experience: React.FC = () => {
  useGSAPAnimations();

  return (
    <section
      id="experience"
      className="py-20 relative min-h-screen bg-gradient-to-br from-rose-50 to-indigo-50 dark:from-slate-900 dark:to-slate-800"
    >
      {/* Floating Pastel Background Circles */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Mint + Peach Blob */}
        <div
          className="absolute top-20 left-10 w-80 h-80 rounded-full animate-float bg-gradient-to-br from-mint-400/20 to-rose-300/30 dark:from-mint-300/20 dark:to-rose-300/20 blur-[60px]"
          style={{ animationDelay: "2s" }}
        />

        {/* Lavender + Baby Blue Blob */}
        <div
          className="absolute bottom-40 right-20 w-64 h-64 rounded-full animate-float bg-gradient-to-br from-purple-300/20 to-sky-300/20 dark:from-purple-300/20 dark:to-sky-300/20 blur-[40px]"
          style={{ animationDelay: "4s" }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-caption px-4 py-2 rounded-full 
            bg-rose-300/20 dark:bg-rose-300/30 
            text-rose-500 dark:text-rose-300 
            border border-rose-300/30 dark:border-rose-400/20 
            backdrop-blur-md mb-4 inline-block">
            💼 Career Journey
          </span>

          <h2
            className="text-display mb-6"
            style={{
              fontSize: "clamp(2.5rem, 6vw, 4rem)",
              fontWeight: 700,
            }}
          >
            Professional{" "}
            <span className="gradient-text">Experience</span>
          </h2>

          <p
            className="text-body max-w-3xl mx-auto"
            style={{
              fontSize: "1.25rem",
              color: "var(--text-secondary)",
            }}
          >
            A timeline of my professional journey, showcasing growth,
            achievements, and the diverse projects I've contributed to.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Pastel Timeline Line */}
          <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-1 
            bg-gradient-to-b from-pink-300 via-purple-300 to-sky-300 
            dark:from-pink-400 dark:via-purple-400 dark:to-sky-400
            rounded-full z-10" />

          {/* Experience Items */}
          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <div
                key={exp.id}
                className={`experience-item relative flex items-center animate-fade-in ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                {/* Dot */}
                <div
                  className={`absolute left-8 md:left-1/2 transform md:-translate-x-1/2 
                  w-6 h-6 rounded-full border-4 border-white dark:border-gray-800 shadow-lg 
                  ${
                    exp.type === "work"
                      ? "bg-purple-300 dark:bg-purple-400"
                      : "bg-pink-300 dark:bg-pink-400"
                  }`}
                  style={{
                    boxShadow:
                      exp.type === "work"
                        ? "0 0 0 4px rgba(216, 180, 254, 0.3), 0 4px 12px rgba(216, 180, 254, 0.4)"
                        : "0 0 0 4px rgba(249, 168, 212, 0.3), 0 4px 12px rgba(249, 168, 212, 0.4)",
                  }}
                />

                {/* Card */}
                <div
                  className={`ml-20 md:ml-0 md:w-5/12 ${
                    index % 2 === 0
                      ? "md:mr-auto md:pr-8"
                      : "md:ml-auto md:pl-8"
                  }`}
                >
                  <div
                    className="bg-white/40 dark:bg-gray-800/30 
                  backdrop-blur-xl border border-white/40 dark:border-gray-700/40 
                  p-6 rounded-2xl hover:scale-105 
                  hover:bg-white/50 dark:hover:bg-gray-800/40 
                  hover:shadow-xl transition-all duration-300"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2 sm:mb-0">
                        {exp.company}
                      </h3>

                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium self-start ${
                          exp.type === "work"
                            ? "bg-purple-300/20 dark:bg-purple-400/20 text-purple-600 dark:text-purple-300 border border-purple-300/30 dark:border-purple-400/20"
                            : "bg-pink-300/20 dark:bg-pink-400/20 text-pink-600 dark:text-pink-300 border border-pink-300/30 dark:border-pink-400/20"
                        }`}
                      >
                        {exp.duration}
                      </span>
                    </div>

                    {/* Position */}
                    <div className="mb-4">
                      <h4 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-1">
                        {exp.position}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        📍 {exp.location}
                      </p>
                    </div>

                    {/* Description */}
                    <ul className="space-y-2 mb-4">
                      {exp.description.map((item, idx) => (
                        <li
                          key={idx}
                          className="flex items-start text-gray-700 dark:text-gray-300 text-sm leading-relaxed"
                        >
                          <span className="inline-block w-2 h-2 bg-sky-300 dark:bg-sky-400 rounded-full mr-3 mt-2 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 text-xs font-medium 
                          bg-mint-200/30 dark:bg-mint-300/20 
                          text-teal-700 dark:text-teal-300 
                          border border-teal-200/40 dark:border-teal-300/20 rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
