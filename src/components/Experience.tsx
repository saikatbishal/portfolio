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
      className="py-20 relative min-h-screen bg-gradient-to-br from-rose-50 to-indigo-50 dark:from-slate-900 dark:to-slate-800"
    >
      {/* Floating Pastel Background Circles */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute top-20 left-10 w-80 h-80 rounded-full animate-float bg-gradient-to-br from-mint-400/20 to-rose-300/30 dark:from-mint-300/20 dark:to-rose-300/20 blur-[60px]"
          style={{ animationDelay: "2s" }}
        />
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
            className="text-display mb-6 text-4xl md:text-5xl font-bold"
          >
            Professional <span className="gradient-text">Experience</span>
          </h2>
          <p
            className="text-body max-w-3xl mx-auto text-lg md:text-xl text-gray-600 dark:text-gray-300"
          >
            A summary of my professional journey, showcasing growth,
            achievements, and the diverse projects I've contributed to.
          </p>
        </div>

        {/* Resume-Style Experience List */}
        <div className="space-y-10">
          {experiences.map((exp, index) => (
            <div
              key={exp.id}
              className="experience-item animate-fade-in bg-white/50 dark:bg-gray-800/40 backdrop-blur-2xl border border-white/40 dark:border-gray-700/50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="grid md:grid-cols-12 gap-6">
                {/* Left Side: Main Content */}
                <div className="md:col-span-8">
                  {/* Company & Position */}
                  <div className="mb-4">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                      <BusinessCenterOutlinedIcon className="text-rose-500 dark:text-rose-400" />
                      {exp.company}
                    </h3>
                    <h4 className="text-lg font-semibold text-rose-600 dark:text-rose-300 mt-1">
                      {exp.position}
                    </h4>
                  </div>

                  {/* Description */}
                  <ul className="space-y-3 text-gray-700 dark:text-gray-300 mb-6">
                    {exp.description.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span className="inline-block w-2 h-2 bg-sky-400 dark:bg-sky-300 rounded-full mt-2 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 text-xs font-medium bg-mint-200/40 dark:bg-mint-300/20 text-teal-700 dark:text-teal-300 border border-teal-200/50 dark:border-teal-300/30 rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right Side: Meta Info */}
                <div className="md:col-span-4 md:text-right md:border-l md:border-gray-200 dark:md:border-gray-700/50 md:pl-6">
                  <div className="flex items-center md:justify-end gap-3 text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                    <CalendarTodayOutlinedIcon style={{ fontSize: '1rem' }} />
                    <span>{exp.duration}</span>
                  </div>
                  <div className="flex items-center md:justify-end gap-3 text-sm text-gray-500 dark:text-gray-400">
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
