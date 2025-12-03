import React from 'react';
import { skills } from '../data/skills';
import { motion } from 'framer-motion';

const skillCategories = {
    frontend: { name: "Frontend", color: "text-gray-900 dark:text-white" },
    backend: { name: "Backend", color: "text-gray-900 dark:text-white" },
    tools: { name: "Tools & DevOps", color: "text-gray-900 dark:text-white" },
    design: { name: "Design", color: "text-gray-900 dark:text-white" },
};

const Skills: React.FC = () => {
    return (
        <section id="skills" className="py-20 bg-white dark:bg-gray-950 border-t border-gray-100 dark:border-gray-900">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <span className="font-mono text-sm text-gray-500 dark:text-gray-400 mb-4 inline-block">
                        // stack
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold font-sans text-gray-900 dark:text-white tracking-tight">
                        Technical Skills
                    </h2>
                    <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto font-sans">
                        Technologies and tools I work with.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {Object.entries(skillCategories).map(([categoryKey, categoryValue]) => (
                        <motion.div
                            key={categoryKey}
                            className="bg-gray-50 dark:bg-gray-900 p-6 border border-gray-200 dark:border-gray-800"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            viewport={{ once: true }}
                        >
                            <h3 className={`text-lg font-bold font-mono mb-6 uppercase tracking-wider ${categoryValue.color}`}>
                                {categoryValue.name}
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {skills
                                    .filter((skill) => skill.category === categoryKey)
                                    .map((skill) => (
                                        <motion.div
                                            key={skill.name}
                                            className="px-3 py-1.5 text-sm font-mono text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 hover:border-gray-900 dark:hover:border-gray-500 transition-colors cursor-default"
                                            whileHover={{ y: -2 }}
                                            transition={{ type: 'spring', stiffness: 300 }}
                                        >
                                            {skill.name}
                                        </motion.div>
                                    ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;
