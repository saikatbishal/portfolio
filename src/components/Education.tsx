import React from "react";
import { education } from "../data/skills";
import { useGSAPAnimations } from "../hooks/useGSAPAnimations";

const Education: React.FC = () => {
  useGSAPAnimations();

  return (
    <section
      id="education"
      className="py-20 relative bg-white dark:bg-gray-950 border-t border-gray-100 dark:border-gray-900"
    >
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold font-sans text-gray-900 dark:text-white tracking-tight mb-8 text-center">
          Education
        </h2>

        <ol className="max-w-2xl mx-auto border-l border-gray-200 dark:border-gray-800 ml-1.5 space-y-6 animate-fade-in">
          {education.map((edu) => (
            <li key={edu.id} className="relative pl-6">
              <span
                aria-hidden="true"
                className="absolute -left-[6px] top-2 w-3 h-3 rounded-full border-2 bg-white dark:bg-gray-950 border-gray-400 dark:border-gray-600"
              />
              <p className="font-mono text-xs text-gray-500 dark:text-gray-400">
                {edu.duration}
              </p>
              <h3 className="font-sans font-bold text-gray-900 dark:text-white">
                {edu.institution}
              </h3>
              <p className="font-sans text-sm text-gray-600 dark:text-gray-400">
                {edu.degree} · {edu.field}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default Education;
