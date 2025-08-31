import React from 'react';
import { experiences } from '../data/experience';

const Experience: React.FC = () => {

  return (
    <section 
      id="experience" 
      className="py-20 relative min-h-screen bg-gradient-to-br from-slate-50 to-slate-200 dark:from-slate-900 dark:to-slate-800"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-80 h-80 rounded-full animate-float bg-gradient-to-br from-emerald-500/5 to-amber-500/5 dark:from-emerald-400/10 dark:to-amber-400/10 blur-[60px]" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-40 right-20 w-64 h-64 rounded-full animate-float bg-gradient-to-br from-blue-500/5 to-purple-500/5 dark:from-blue-400/10 dark:to-purple-400/10 blur-[40px]" style={{ animationDelay: '4s' }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-caption px-4 py-2 rounded-full bg-emerald-500/10 dark:bg-emerald-400/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 dark:border-emerald-400/30 backdrop-blur-md mb-4 inline-block">
            💼 Career Journey
          </span>
          
          <h2 
            className="text-display mb-6"
            style={{
              fontSize: 'clamp(2.5rem, 6vw, 4rem)',
              fontWeight: 700,
              marginBottom: 'var(--spacing-lg)',
            }}
          >
            Professional <span className="gradient-text">Experience</span>
          </h2>
          
          <p 
            className="text-body max-w-3xl mx-auto"
            style={{
              fontSize: '1.25rem',
              color: 'var(--text-secondary)',
            }}
          >
            A timeline of my professional journey, showcasing growth, achievements, 
            and the diverse projects I've contributed to across different organizations.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-600 via-purple-600 to-cyan-600 dark:from-blue-500 dark:via-purple-500 dark:to-cyan-500 rounded-full z-10" />

          {/* Experience Items */}
          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <div
                key={exp.id}
                className={`relative flex items-center animate-fade-in ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                {/* Timeline Dot */}
                <div 
                  className={`absolute left-8 md:left-1/2 transform md:-translate-x-1/2 w-6 h-6 rounded-full border-4 border-white dark:border-gray-800 z-20 shadow-lg ${
                    exp.type === 'work' 
                      ? 'bg-blue-600 dark:bg-blue-500' 
                      : 'bg-purple-600 dark:bg-purple-500'
                  }`}
                  style={{
                    boxShadow: exp.type === 'work' 
                      ? '0 0 0 4px rgba(59, 130, 246, 0.2), 0 4px 12px rgba(59, 130, 246, 0.3)' 
                      : '0 0 0 4px rgba(147, 51, 234, 0.2), 0 4px 12px rgba(147, 51, 234, 0.3)',
                  }}
                />

                {/* Content Card */}
                <div 
                  className={`ml-20 md:ml-0 md:w-5/12 ${
                    index % 2 === 0 ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'
                  }`}
                >
                  <div className="bg-white/25 dark:bg-gray-800/25 backdrop-blur-xl border border-white/20 dark:border-gray-700/20 p-6 rounded-2xl hover:scale-105 hover:bg-white/35 dark:hover:bg-gray-800/35 hover:border-white/30 dark:hover:border-gray-600/30 transition-all duration-300 hover:shadow-xl">
                    {/* Company & Duration */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2 sm:mb-0">
                        {exp.company}
                      </h3>
                      <span 
                        className={`px-3 py-1 rounded-full text-sm font-medium self-start ${
                          exp.type === 'work' 
                            ? 'bg-blue-500/10 dark:bg-blue-400/20 text-blue-600 dark:text-blue-400 border border-blue-500/20 dark:border-blue-400/30' 
                            : 'bg-purple-500/10 dark:bg-purple-400/20 text-purple-600 dark:text-purple-400 border border-purple-500/20 dark:border-purple-400/30'
                        }`}
                      >
                        {exp.duration}
                      </span>
                    </div>

                    {/* Position & Location */}
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
                          <span className="inline-block w-2 h-2 bg-cyan-500 dark:bg-cyan-400 rounded-full mr-3 mt-2 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 text-xs font-medium bg-cyan-500/10 dark:bg-cyan-400/20 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20 dark:border-cyan-400/30 rounded-full"
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