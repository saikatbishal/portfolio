import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import TerminalHacker from './interactive/TerminalHacker';
import CSSDetective from './interactive/CSSDetective';
import TicTacToe from './interactive/TicTacToe';

const GAMES = [
    { id: 'terminal-hacker', glyph: '>_', title: 'Terminal Hacker', tagline: 'Guess the password from the clues.' },
    { id: 'css-detective', glyph: '{}', title: 'CSS Detective', tagline: 'Pick the CSS that fixes a broken layout.' },
    { id: 'tic-tac-toe', glyph: 'X O', title: 'Tic Tac Toe', tagline: 'Two players, one screen.' },
];

const Games: React.FC = () => {
    const [activeGame, setActiveGame] = useState<string | null>(null);
    const closeGame = () => setActiveGame(null);

    // While a game is open: Escape returns to the games list, and the page
    // behind the modal stops scrolling.
    useEffect(() => {
        if (!activeGame) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setActiveGame(null);
        };
        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        window.addEventListener('keydown', onKey);
        return () => {
            document.body.style.overflow = prevOverflow;
            window.removeEventListener('keydown', onKey);
        };
    }, [activeGame]);

    return (
        <div className="min-h-screen pt-20 bg-white dark:bg-gray-950">
            {/* Portalled to <body> so the modal (z-[1000]) sits outside the
                page's stacking contexts and above the fixed nav. */}
            {activeGame && createPortal(
                <>
                    {activeGame === 'terminal-hacker' && <TerminalHacker onClose={closeGame} />}
                    {activeGame === 'css-detective' && <CSSDetective onClose={closeGame} />}
                    {activeGame === 'tic-tac-toe' && <TicTacToe onClose={closeGame} />}
                </>,
                document.body
            )}
            <div className="max-w-6xl mx-auto px-6 py-12">
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-3xl md:text-4xl font-bold font-sans tracking-tight mb-4 text-gray-900 dark:text-white">
                        Games
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-400 font-sans">
                        Three small games I built for fun.
                    </p>
                </div>

                {/* Games Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                    {GAMES.map((game) => (
                        <button
                            key={game.id}
                            type="button"
                            onClick={() => setActiveGame(game.id)}
                            className="group text-center border border-gray-200 dark:border-gray-800 p-6 bg-white dark:bg-gray-900 hover:border-gray-900 dark:hover:border-white transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 dark:focus-visible:ring-white"
                        >
                            <div aria-hidden="true" className="text-4xl mb-4 font-mono text-gray-900 dark:text-white">{game.glyph}</div>
                            <h2 className="text-xl font-bold font-sans mb-2 text-gray-900 dark:text-white">
                                {game.title}
                            </h2>
                            <p className="font-sans mb-4 text-gray-600 dark:text-gray-400">
                                {game.tagline}
                            </p>
                            <span className="font-sans text-sm font-medium text-gray-900 dark:text-white underline underline-offset-4 decoration-gray-300 dark:decoration-gray-600 group-hover:decoration-gray-900 dark:group-hover:decoration-white">
                                Play
                            </span>
                        </button>
                    ))}
                </div>

                {/* Back to Home */}
                <div className="text-center">
                    <Link
                        to="/"
                        className="btn btn-secondary"
                    >
                        <span className="mr-2">←</span>
                        Back to the portfolio
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Games;
