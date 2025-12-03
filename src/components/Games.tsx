import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import TerminalHacker from './interactive/TerminalHacker';
import CSSDetective from './interactive/CSSDetective';

const Games: React.FC = () => {
    const [activeGame, setActiveGame] = useState<string | null>(null);

    return (
        <div className="min-h-screen pt-20 bg-white dark:bg-gray-950">
            {activeGame === 'terminal-hacker' && (
                <TerminalHacker onClose={() => setActiveGame(null)} />
            )}
            {activeGame === 'css-detective' && (
                <CSSDetective onClose={() => setActiveGame(null)} />
            )}
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
                    {/* Terminal Hacker - Playable */}
                    <div 
                        onClick={() => setActiveGame('terminal-hacker')}
                        className="group cursor-pointer border border-gray-200 dark:border-gray-800 p-6 bg-white dark:bg-gray-900 hover:border-green-500 dark:hover:border-green-500 transition-all duration-300 hover:shadow-[0_0_20px_-5px_rgba(34,197,94,0.3)] relative overflow-hidden"
                    >
                        <div className="absolute top-0 left-0 w-full h-1 bg-green-500 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
                        <div className="text-center">
                            <div className="text-4xl mb-4 font-mono text-green-600 dark:text-green-400 group-hover:scale-110 transition-transform duration-300">&gt;_</div>
                            <h3 className="text-xl font-bold font-mono mb-2 text-gray-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                                Terminal Hacker
                            </h3>
                            <p className="text-sm font-mono mb-4 text-gray-500 dark:text-gray-400">
                                System Breach Simulation
                            </p>
                            <span className="px-3 py-1 text-xs font-mono bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800 uppercase tracking-wider">
                                Play Now
                            </span>
                        </div>
                    </div>

                    {/* CSS Detective - Playable */}
                    <div 
                        onClick={() => setActiveGame('css-detective')}
                        className="group cursor-pointer border border-gray-200 dark:border-gray-800 p-6 bg-white dark:bg-gray-900 hover:border-blue-500 dark:hover:border-blue-500 transition-all duration-300 hover:shadow-[0_0_20px_-5px_rgba(59,130,246,0.3)] relative overflow-hidden"
                    >
                        <div className="absolute top-0 left-0 w-full h-1 bg-blue-500 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
                        <div className="text-center">
                            <div className="text-4xl mb-4 font-mono text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform duration-300">{"{}"}</div>
                            <h3 className="text-xl font-bold font-mono mb-2 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                CSS Detective
                            </h3>
                            <p className="text-sm font-mono mb-4 text-gray-500 dark:text-gray-400">
                                Fix Broken Layouts
                            </p>
                            <span className="px-3 py-1 text-xs font-mono bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-800 uppercase tracking-wider">
                                Play Now
                            </span>
                        </div>
                    </div>

                    {/* Coming Soon Cards */}
                    {[
                        { title: "Snake Game", tech: "HTML5 Canvas", status: "Coming Soon" },
                        { title: "Tic Tac Toe", tech: "React", status: "Coming Soon" },
                        { title: "Memory Match", tech: "TypeScript", status: "Coming Soon" },
                        { title: "Puzzle Slider", tech: "CSS Animations", status: "Coming Soon" },
                        { title: "Space Invaders", tech: "WebGL", status: "Coming Soon" }
                    ].map((game, index) => (
                        <div
                            key={index}
                            className="border border-gray-200 dark:border-gray-800 p-6 bg-gray-50 dark:bg-gray-900 hover:border-gray-900 dark:hover:border-white transition-colors duration-300 opacity-75 hover:opacity-100"
                        >
                            <div className="text-center">
                                <div className="text-4xl mb-4 grayscale opacity-50">🎲</div>
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