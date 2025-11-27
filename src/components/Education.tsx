import React from "react";
import { education, skills } from "../data/skills";
import { useGSAPAnimations } from "../hooks/useGSAPAnimations";

const Education: React.FC = () => {
  useGSAPAnimations();

  const skillCategories = {
    frontend: { name: "Frontend", color: "#6366f1" }, // Indigo color
    backend: { name: "Backend", color: "#8b5cf6" }, // Purple color
    tools: { name: "Tools & DevOps", color: "#06b6d4" }, // Cyan color
    design: { name: "Design", color: "#10b981" }, // Emerald color
  };

  return (
    <section
      id="education"
      className="py-20 relative min-h-screen bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute top-32 right-16 w-72 h-72 rounded-full animate-float bg-gradient-to-br from-amber-500/5 to-red-500/5 dark:from-amber-400/10 dark:to-red-400/10 blur-[50px]"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute bottom-20 left-16 w-64 h-64 rounded-full animate-float bg-gradient-to-br from-cyan-500/5 to-emerald-500/5 dark:from-cyan-400/10 dark:to-emerald-400/10 blur-[40px]"
          style={{ animationDelay: "3s" }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-caption px-4 py-2 rounded-full bg-amber-500/10 dark:bg-amber-400/20 text-amber-600 dark:text-amber-400 border border-amber-500/20 dark:border-amber-400/30 backdrop-blur-md mb-4 inline-block">
            🎓 Learning & Growth
          </span>

          <h2
            className="text-display mb-6"
            style={{
              fontSize: "clamp(2.5rem, 6vw, 4rem)",
              fontWeight: 700,
              marginBottom: "var(--spacing-lg)",
            }}
          >
            Education & <span className="gradient-text">Skills</span>
          </h2>

          <p
            className="text-body max-w-3xl mx-auto"
            style={{
              fontSize: "1.25rem",
              color: "var(--text-secondary)",
            }}
          >
            My academic background and technical expertise that form the
            foundation of my professional capabilities and continuous learning
            journey.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Education Section */}
          <div className="animate-fade-in">
            <h3
              className="text-heading mb-8"
              style={{
                fontSize: "2rem",
                fontWeight: 600,
                color: "var(--text-primary)",
              }}
            >
              Academic Background
            </h3>

            <div className="space-y-6">
              {education.map((edu, index) => (
                <div
                  key={edu.id}
                  className="bg-white/25 dark:bg-gray-800/25 backdrop-blur-xl border border-white/20 dark:border-gray-700/20 p-6 rounded-2xl hover:scale-105 hover:bg-white/35 dark:hover:bg-gray-800/35 hover:border-white/30 dark:hover:border-gray-600/30 transition-all duration-300 hover:shadow-xl animate-fade-in"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  {/* Institution & Duration */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                    <h4 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2 sm:mb-0">
                      {edu.institution}
                    </h4>
                    <span className="px-3 py-1 rounded-full text-sm font-medium bg-amber-500/10 dark:bg-amber-400/20 text-amber-600 dark:text-amber-400 border border-amber-500/20 dark:border-amber-400/30 self-start">
                      {edu.duration}
                    </span>
                  </div>

                  {/* Degree & Field */}
                  <div className="mb-3">
                    <h5 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-1">
                      {edu.degree} in {edu.field}
                    </h5>
                    <div className="flex items-center gap-4">
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        📍 {edu.location}
                      </p>
                      {edu.gpa && (
                        <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
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
                        className="flex items-start text-gray-700 dark:text-gray-300 text-sm leading-relaxed"
                      >
                        <span className="inline-block w-2 h-2 bg-amber-500 dark:bg-amber-400 rounded-full mr-3 mt-2 flex-shrink-0" />
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Skills Section */}
          <div className="animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <h3
              className="text-heading mb-8"
              style={{
                fontSize: "2rem",
                fontWeight: 600,
                color: "var(--text-primary)",
              }}
            >
              Technical Skills
            </h3>

            <div className="space-y-8">
              {Object.entries(skillCategories).map(([category, config]) => (
                <div
                  key={category}
                  className="bg-white/25 dark:bg-gray-800/25 backdrop-blur-xl border border-white/20 dark:border-gray-700/20 p-6 rounded-2xl"
                >
                  <h4
                    className="text-xl font-semibold mb-4"
                    style={{ color: config.color }}
                  >
                    {config.name}
                  </h4>

                  <div className="space-y-4">
                    {skills
                      .filter((skill) => skill.category === category)
                      .map((skill, skillIndex) => (
                        <div key={skill.name} className="skill-item">
                          <div className="flex justify-between items-center mb-2">
                            <span
                              className="text-sm font-medium"
                              style={{ color: "var(--text-primary)" }}
                            >
                              {skill.name}
                            </span>
                            <span
                              className="text-sm font-semibold"
                              style={{ color: "var(--text-secondary)" }}
                            >
                              {skill.level}%
                            </span>
                          </div>

                          {/* Progress Bar */}
                          <div className="w-full h-3 rounded-full overflow-hidden" style={{ backgroundColor: "var(--border)" }}>
                            <div
                              className="h-full rounded-full transition-all duration-1000 ease-out skill-progress"
                              style={{
                                width: `${skill.level}%`,
                                background: `linear-gradient(90deg, ${config.color}, ${config.color}99)`,
                                boxShadow: `0 2px 4px ${config.color}40`,
                                animationDelay: `${skillIndex * 0.1}s`,
                              }}
                            />
                          </div>
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
