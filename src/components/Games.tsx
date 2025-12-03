import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';

const Games: React.FC = () => {
    const { isDarkMode } = useTheme();

    return (
        <div className="min-h-screen pt-20 bg-white dark:bg-gray-950">
            <div className="max-w-6xl mx-auto px-6 py-12">
                {/* Header */}
                <div className="text-center mb-16">
                    <span className="font-mono text-sm text-gray-500 dark:text-gray-400 mb-4 inline-block">
                        // playground
                    </span>
                    <h1 className="text-3xl md:text-4xl font-bold font-sans mb-6 text-gray-900 dark:text-white">
                        Games Collection
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-400 font-sans">
                        Interactive games and fun projects built with modern web technologies
                    </p>
                </div>

                {/* Games Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                    {/* Coming Soon Cards */}
                    {[
                        { title: "Snake Game", tech: "HTML5 Canvas", status: "Coming Soon" },
                        { title: "Tic Tac Toe", tech: "React", status: "Coming Soon" },
                        { title: "Memory Match", tech: "TypeScript", status: "Coming Soon" },
                        { title: "Puzzle Slider", tech: "CSS Animations", status: "Coming Soon" },
                        { title: "Space Invaders", tech: "WebGL", status: "Coming Soon" },
                        { title: "Word Guessing", tech: "React Hooks", status: "Coming Soon" }
                    ].map((game, index) => (
                        <div
                            key={index}
                            className="border border-gray-200 dark:border-gray-800 p-6 bg-gray-50 dark:bg-gray-900 hover:border-gray-900 dark:hover:border-white transition-colors duration-300"
                        >
                            <div className="text-center">
                                <div className="text-4xl mb-4 grayscale">🎲</div>
                                <h3 className="text-xl font-bold font-mono mb-2 text-gray-900 dark:text-white">
                                    {game.title}
                                </h3>
                                <p className="text-sm font-mono mb-4 text-gray-500 dark:text-gray-400">
                                    Built with {game.tech}
                                </p>
                                <span className="px-3 py-1 text-xs font-mono border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                                    {game.status}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Back to Home */}
                <div className="text-center">
                    <Link
                        to="/"
                        className="inline-flex items-center px-6 py-3 border border-gray-900 dark:border-white text-gray-900 dark:text-white font-mono text-sm hover:bg-gray-900 hover:text-white dark:hover:bg-white dark:hover:text-gray-900 transition-all duration-300"
                    >
                        <span className="mr-2">←</span>
                        Back to Portfolio
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Games;