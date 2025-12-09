import React from "react";
import { education, skills } from "../data/skills";
import { useGSAPAnimations } from "../hooks/useGSAPAnimations";

const Education: React.FC = () => {
  useGSAPAnimations();

  const skillCategories = {
    frontend: { name: "Frontend" },
    backend: { name: "Backend" },
    tools: { name: "Tools & DevOps" },
    design: { name: "Design" },
  };

  return (
    <section
      id="education"
      className="py-20 relative min-h-screen bg-white dark:bg-gray-950 border-t border-gray-100 dark:border-gray-900"
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

          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto font-sans">
            The formal foundations I've built, and the modern tools I use to break them.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Education Section */}
          <div className="animate-fade-in">
            <h3 className="text-2xl font-bold font-mono text-gray-900 dark:text-white mb-8">
              The Theory
            </h3>

            <div className="space-y-6">
              {education.map((edu, index) => (
                <div
                  key={edu.id}
                  className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-6 hover:border-[#39ff14] dark:hover:border-[#39ff14] transition-all duration-300 hover:-translate-y-1 hover:shadow-md group"
                >
                  {/* Institution & Duration */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                    <h4 className="text-lg font-bold font-sans text-gray-900 dark:text-white group-hover:text-[#16a34a] dark:group-hover:text-[#39ff14] transition-colors duration-300 mb-2 sm:mb-0">
                      {edu.institution}
                    </h4>
                    <span className="font-mono text-xs text-gray-500 dark:text-gray-400 self-start">
                      [{edu.duration}]
                    </span>
                  </div>

                  {/* Degree & Field */}
                  <div className="mb-4">
                    <h5 className="text-md font-medium font-mono text-gray-800 dark:text-gray-200 mb-1">
                      {edu.degree} in {edu.field}
                    </h5>
                    <div className="flex items-center gap-4">
                      <p className="text-sm font-mono text-gray-500 dark:text-gray-500">
                        @ {edu.location}
                      </p>
                      {edu.gpa && (
                        <p className="text-sm font-mono font-bold text-gray-900 dark:text-white">
                          GPA: {edu.gpa}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Achievements */}
                  <ul className="space-y-2">
                    {edu.achievements.map((achievement, idx) => (
                      <li
                        key={idx}
                        className="flex items-start text-gray-600 dark:text-gray-400 text-sm font-sans leading-relaxed"
                      >
                        <span className="mr-3 mt-1.5 text-gray-400 dark:text-gray-600 text-xs">
                          &gt;
                        </span>
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Skills Section */}
          <div className="animate-fade-in">
            <h3 className="text-2xl font-bold font-mono text-gray-900 dark:text-white mb-8">
              The Instruments
            </h3>

            <div className="space-y-8">
              {Object.entries(skillCategories).map(([category, config]) => (
                <div
                  key={category}
                  className="bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 p-6"
                >
                  <h4 className="text-lg font-bold font-mono text-gray-900 dark:text-white mb-4 uppercase tracking-wider">
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
