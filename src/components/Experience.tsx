import React from "react";
import { experiences } from "../data/experience";
import { useGSAPAnimations } from "../hooks/useGSAPAnimations";
import BusinessCenterOutlinedIcon from '@mui/icons-material/BusinessCenterOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';

const Experience: React.FC = () => {
  useGSAPAnimations();

  return (
    <section
      id="experience"
      className="py-20 relative min-h-screen bg-white dark:bg-gray-950 border-t border-gray-100 dark:border-gray-900"
    >
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="font-mono text-sm text-gray-500 dark:text-gray-400 mb-4 inline-block">
            // memory_logs
          </span>
          <h2 className="text-3xl md:text-4xl font-bold font-sans text-gray-900 dark:text-white tracking-tight mb-6">
            Chronicles
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto font-sans">
            A timeline of problems solved and systems built.
          </p>
        </div>

        {/* Resume-Style Experience List */}
        <div className="space-y-10">
          {experiences.map((exp, index) => (
            <div
              key={exp.id}
              className="experience-item group animate-fade-in bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-8 hover:border-[#39ff14] dark:hover:border-[#39ff14] transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="grid md:grid-cols-12 gap-6">
                {/* Left Side: Main Content */}
                <div className="md:col-span-8">
                  {/* Company & Position */}
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold font-sans text-gray-900 dark:text-white group-hover:text-[#16a34a] dark:group-hover:text-[#39ff14] transition-colors duration-300 flex items-center gap-3">
                      {exp.company}
                    </h3>
                    <h4 className="text-lg font-mono font-medium text-gray-600 dark:text-gray-400 mt-1">
                      {exp.position}
                    </h4>
                  </div>

                  {/* Description */}
                  <ul className="space-y-3 text-gray-600 dark:text-gray-400 mb-6 font-sans">
                    {exp.description.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span className="mt-1.5 text-xs text-gray-400 dark:text-gray-600 font-mono">&gt;</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 text-xs font-mono text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-950"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right Side: Meta Info */}
                <div className="md:col-span-4 md:text-right md:border-l md:border-gray-200 dark:md:border-gray-800 md:pl-6">
                  <div className="flex items-center md:justify-end gap-3 text-sm font-mono text-gray-500 dark:text-gray-400 mb-2">
                    <CalendarTodayOutlinedIcon style={{ fontSize: '1rem' }} />
                    <span>{exp.duration}</span>
                  </div>
                  <div className="flex items-center md:justify-end gap-3 text-sm font-mono text-gray-500 dark:text-gray-400">
                    <LocationOnOutlinedIcon style={{ fontSize: '1rem' }} />
                    <span>{exp.location}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
