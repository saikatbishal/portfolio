import React from 'react';
import { skills } from '../data/skills';
import { motion } from 'framer-motion';

const skillCategories = {
    frontend: { name: "Frontend", color: "bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-300" },
    backend: { name: "Backend", color: "bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-300" },
    tools: { name: "Tools & DevOps", color: "bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-300" },
    design: { name: "Design", color: "bg-pink-100 dark:bg-pink-900/50 text-pink-600 dark:text-pink-300" },
};

const Skills: React.FC = () => {
    return (
        <section id="skills" className="py-20 bg-slate-50 dark:bg-slate-900/50">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100">
                        My Technical <span className="text-blue-600">Skills</span>
                    </h2>
                    <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        A collection of technologies I'm proficient in, categorized for clarity.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {Object.entries(skillCategories).map(([categoryKey, categoryValue]) => (
                        <motion.div
                            key={categoryKey}
                            className="bg-white dark:bg-slate-800/50 p-6 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            viewport={{ once: true }}
                        >
                            <h3 className={`text-xl font-semibold mb-4 ${categoryValue.color.split(' ')[1]}`}>
                                {categoryValue.name}
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {skills
                                    .filter((skill) => skill.category === categoryKey)
                                    .map((skill) => (
                                        <motion.div
                                            key={skill.name}
                                            className={`px-3 py-1 rounded-full text-sm font-medium ${categoryValue.color}`}
                                            whileHover={{ scale: 1.1, rotate: 2 }}
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
