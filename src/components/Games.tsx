import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';

const Games: React.FC = () => {
    const { isDarkMode } = useTheme();

    return (
        <div className={`min-h-screen pt-20 ${isDarkMode ? 'bg-gradient-to-br from-gray-900 to-gray-800' : 'bg-gradient-to-br from-gray-50 to-gray-100'
            }`}>
            <div className="max-w-6xl mx-auto px-6 py-12">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className={`text-5xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'
                        }`}>
                        🎮 Games Collection
                    </h1>
                    <p className={`text-xl ${isDarkMode ? 'text-gray-300' : 'text-gray-600'
                        }`}>
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
                            className={`rounded-2xl p-6 transition-all hover:scale-105 hover:shadow-xl ${isDarkMode
                                    ? 'bg-gray-800/80 border border-gray-700/50 hover:bg-gray-700/80'
                                    : 'bg-white/80 border border-gray-200/50 hover:bg-gray-50/80'
                                }`}
                            style={{
                                backdropFilter: 'blur(10px)',
                                WebkitBackdropFilter: 'blur(10px)',
                            }}
                        >
                            <div className="text-center">
                                <div className="text-4xl mb-4">🎲</div>
                                <h3 className={`text-xl font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'
                                    }`}>
                                    {game.title}
                                </h3>
                                <p className={`text-sm mb-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'
                                    }`}>
                                    Built with {game.tech}
                                </p>
                                <span className={`px-4 py-2 rounded-full text-sm font-medium ${isDarkMode
                                        ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30'
                                        : 'bg-orange-100 text-orange-700 border border-orange-200'
                                    }`}>
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
                        className={`inline-flex items-center px-8 py-4 rounded-2xl font-medium transition-all hover:scale-105 ${isDarkMode
                                ? 'bg-gradient-to-r from-pink-500 to-blue-500 text-white hover:shadow-lg hover:shadow-pink-500/25'
                                : 'bg-gradient-to-r from-pink-400 to-blue-400 text-white hover:shadow-lg hover:shadow-pink-400/25'
                            }`}
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