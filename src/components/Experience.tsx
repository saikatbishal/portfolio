import React, { useEffect, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { experiences } from "../data/experience";
import { useGSAPAnimations } from "../hooks/useGSAPAnimations";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const Experience: React.FC = () => {
  useGSAPAnimations();
  // Details stay collapsed so the section scans as a list of wins, not a wall of bullets.
  const [openId, setOpenId] = useState<number | null>(null);

  // Opening or closing details changes the page height; move every scroll
  // trigger below this point to match.
  useEffect(() => {
    ScrollTrigger.refresh();
  }, [openId]);

  return (
    <section
      id="experience"
      className="py-20 relative bg-white dark:bg-gray-950 border-t border-gray-100 dark:border-gray-900"
    >
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-sans text-gray-900 dark:text-white tracking-tight">
            Experience
          </h2>
        </div>

        <ol className="relative border-l border-gray-200 dark:border-gray-800 ml-1.5 space-y-8">
          {experiences.map((exp, index) => {
            const isOpen = openId === exp.id;
            const detailsId = `exp-details-${exp.id}`;
            return (
              <li key={exp.id} className="experience-item relative pl-6 md:pl-8">
                <span
                  aria-hidden="true"
                  className={`absolute -left-[6px] top-2 w-3 h-3 rounded-full border-2 ${
                    index === 0
                      ? "bg-[#39ff14] border-[#16a34a]"
                      : "bg-white dark:bg-gray-950 border-gray-400 dark:border-gray-600"
                  }`}
                />

                {/* Role line */}
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-x-4 gap-y-1">
                  <h3 className="text-xl font-bold font-sans text-gray-900 dark:text-white">
                    {exp.company}
                    <span className="font-mono font-normal text-base text-gray-500 dark:text-gray-400">
                      {" "}· {exp.position}
                    </span>
                  </h3>
                  <span className="shrink-0 font-mono text-xs text-gray-500 dark:text-gray-400">
                    {exp.duration} · {exp.location}
                  </span>
                </div>

                {/* Wins at a glance */}
                <ul className="mt-3 flex flex-wrap gap-2">
                  {exp.highlights.map((h) => (
                    <li
                      key={h}
                      className="px-3 py-1 text-sm font-sans text-gray-800 dark:text-gray-200 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800"
                    >
                      {h}
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  onClick={() => setOpenId(isOpen ? null : exp.id)}
                  aria-expanded={isOpen}
                  aria-controls={detailsId}
                  className="mt-3 inline-flex items-center gap-1 font-mono text-xs text-gray-500 dark:text-gray-400 hover:text-[#16a34a] dark:hover:text-[#39ff14] transition-colors"
                >
                  {isOpen ? "Hide details" : `Show details (${exp.description.length})`}
                  <ExpandMoreIcon
                    style={{ fontSize: "1rem" }}
                    className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {isOpen && (
                  <div id={detailsId} className="mt-3">
                    <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400 font-sans">
                      {exp.description.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <span className="mt-1 text-xs text-gray-400 dark:text-gray-600 font-mono">&gt;</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {exp.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 text-xs font-mono text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-700"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
};

export default Experience;
