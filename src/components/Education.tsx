import React from "react";
import { education, skills } from "../data/skills";
import { useGSAPAnimations } from "../hooks/useGSAPAnimations";

const Education: React.FC = () => {
  useGSAPAnimations();

  const skillCategories = {
    design: { name: "Design Systems" },
    frontend: { name: "Frontend" },
    backend: { name: "Backend" },
    tools: { name: "Tools & DevOps" },
  };

  return (
    <section
      id="education"
      className="py-20 relative bg-white dark:bg-gray-950 border-t border-gray-100 dark:border-gray-900"
    >
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="font-mono text-sm text-gray-500 dark:text-gray-400 mb-4 inline-block">
            // downloading_consciousness...
          </span>

          <h2 className="text-3xl md:text-4xl font-bold font-sans text-gray-900 dark:text-white tracking-tight mb-6">
            Theory & Practice
          </h2>

        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Education Section */}
          <div className="animate-fade-in">
            <h3 className="text-2xl font-bold font-mono text-gray-900 dark:text-white mb-8">
              The Theory
            </h3>

            <ol className="border-l border-gray-200 dark:border-gray-800 ml-1.5 space-y-6">
              {education.map((edu) => (
                <li key={edu.id} className="relative pl-6">
                  <span
                    aria-hidden="true"
                    className="absolute -left-[6px] top-2 w-3 h-3 rounded-full border-2 bg-white dark:bg-gray-950 border-gray-400 dark:border-gray-600"
                  />
                  <p className="font-mono text-xs text-gray-500 dark:text-gray-400">
                    {edu.duration}
                  </p>
                  <h4 className="font-sans font-bold text-gray-900 dark:text-white">
                    {edu.institution}
                  </h4>
                  <p className="font-sans text-sm text-gray-600 dark:text-gray-400">
                    {edu.degree} · {edu.field}
                  </p>
                </li>
              ))}
            </ol>
          </div>

          {/* Skills Section */}
          <div className="animate-fade-in">
            <h3 className="text-2xl font-bold font-mono text-gray-900 dark:text-white mb-8">
              The Instruments
            </h3>

            <div className="space-y-4">
              {Object.entries(skillCategories).map(([category, config]) => (
                <div
                  key={category}
                  className="bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 p-4"
                >
                  <h4 className="text-sm font-bold font-mono text-gray-900 dark:text-white mb-3 uppercase tracking-wider">
                    {config.name}
                  </h4>

                  <div className="flex flex-wrap gap-2">
                    {skills
                      .filter((skill) => skill.category === category)
                      .map((skill) => (
                        <div
                          key={skill.name}
                          className="skill-item px-3 py-1.5 border border-gray-200 dark:border-gray-700 text-sm font-mono text-gray-600 dark:text-gray-400 hover:border-[#39ff14] dark:hover:border-[#39ff14] hover:text-gray-900 dark:hover:text-white transition-all duration-200 hover:scale-105 cursor-default"
                        >
                          {skill.name}
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
