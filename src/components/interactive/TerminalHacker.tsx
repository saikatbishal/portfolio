import React, { useState, useEffect, useRef } from 'react';
import CloseIcon from '@mui/icons-material/Close';

interface TerminalHackerProps {
    onClose: () => void;
}

const WORDS = [
    "REACT", "BUILD", "CODE", "DEBUG", "STACK",
    "QUERY", "FETCH", "ASYNC", "AWAIT", "PROPS",
    "STATE", "HOOKS", "CONST", "CLASS", "WHILE"
];

// Filter words to ensure they are all the same length (5 letters here)
const GAME_WORDS = WORDS.filter(w => w.length === 5);

const TerminalHacker: React.FC<TerminalHackerProps> = ({ onClose }) => {
    const [password, setPassword] = useState("");
    const [options, setOptions] = useState<string[]>([]);
    const [attempts, setAttempts] = useState(4);
    const [logs, setLogs] = useState<string[]>([
        "ROBCO INDUSTRIES (TM) TERMLINK PROTOCOL",
        "ENTER PASSWORD NOW",
        "4 ATTEMPTS LEFT: ◼ ◼ ◼ ◼"
    ]);
    const [gameState, setGameState] = useState<'playing' | 'won' | 'lost'>('playing');
    const [hoveredWord, setHoveredWord] = useState<string | null>(null);
    const [showInstructions, setShowInstructions] = useState(true);

    // Initialize game
    useEffect(() => {
        const shuffle = (array: string[]) => [...array].sort(() => 0.5 - Math.random());
        const selected = shuffle(GAME_WORDS).slice(0, 8); // Pick 8 random words
        const target = selected[Math.floor(Math.random() * selected.length)];

        setOptions(selected);
        setPassword(target);
    }, []);

    const getLikeness = (guess: string, target: string) => {
        let likeness = 0;
        for (let i = 0; i < guess.length; i++) {
            if (guess[i] === target[i]) likeness++;
        }
        return likeness;
    };

    const handleGuess = (word: string) => {
        if (gameState !== 'playing' || showInstructions) return;

        const newLogs = [...logs];
        newLogs.push(`> ${word}`);

        if (word === password) {
            newLogs.push("> EXACT MATCH!");
            newLogs.push("> PLEASE WAIT WHILE SYSTEM IS ACCESSED.");
            newLogs.push("> ACCESS GRANTED.");
            setGameState('won');
        } else {
            const likeness = getLikeness(word, password);
            newLogs.push(`> ENTRY DENIED.`);
            newLogs.push(`> LIKENESS=${likeness}`);

            const newAttempts = attempts - 1;
            setAttempts(newAttempts);

            if (newAttempts === 0) {
                newLogs.push("> LOCKOUT IMMINENT.");
                newLogs.push("> TERMINAL LOCKED.");
                setGameState('lost');
            } else {
                const attemptsDisplay = Array(newAttempts).fill("◼").join(" ");
                newLogs.push(`> ${newAttempts} ATTEMPTS LEFT: ${attemptsDisplay}`);
            }
        }

        setLogs(newLogs);
    };

    const logsEndRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        logsEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [logs]);

    const isLost = gameState === 'lost';
    const theme = {
        text: isLost ? 'text-red-500' : 'text-green-500',
        border: isLost ? 'border-red-500' : 'border-green-500',
        borderDim: isLost ? 'border-red-500/30' : 'border-green-500/30',
        shadow: isLost ? 'shadow-[0_0_20px_rgba(239,68,68,0.3)]' : 'shadow-[0_0_20px_rgba(34,197,94,0.3)]',
        hoverText: isLost ? 'hover:text-red-300' : 'hover:text-green-300',
        bg: isLost ? 'bg-red-500' : 'bg-green-500',
        bgHover: isLost ? 'hover:bg-red-400' : 'hover:bg-green-400',
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4">
            <div className={`w-full max-w-2xl bg-black border-2 ${theme.border} ${theme.shadow} font-mono ${theme.text} p-6 relative overflow-hidden rounded-lg transition-colors duration-500`}>

                {/* CRT Scanline Effect */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 pointer-events-none bg-[length:100%_4px,3px_100%]" />

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className={`absolute top-4 right-4 ${theme.text} ${theme.hoverText} z-20`}
                >
                    <CloseIcon />
                </button>

                {/* Header */}
                <div className={`mb-6 border-b ${theme.borderDim} pb-2`}>
                    <h2 className="text-xl font-bold tracking-wider">TERMINAL_HACKER_V1.0</h2>
                    <p className="text-xs opacity-70">SECURE CONNECTION ESTABLISHED...</p>
                </div>

                {/* Instructions Overlay */}
                {showInstructions && (
                    <div className="absolute inset-0 z-30 bg-black/95 flex items-center justify-center p-8">
                        <div className={`border ${theme.border} p-6 max-w-md w-full text-center relative`}>
                            <h3 className="text-xl font-bold mb-4 tracking-widest border-b border-green-500/30 pb-2">
                                HOW TO PLAY
                            </h3>
                            <div className="text-left space-y-3 text-sm mb-8 opacity-90">
                                <p>1. Find the correct password to bypass security.</p>
                                <p>2. Click on a word to make a guess.</p>
                                <p>3. The terminal will return a <span className="font-bold">LIKENESS</span> score.</p>
                                <p>4. Likeness indicates how many letters are in the correct position.</p>
                                <p className="text-xs mt-4 opacity-70 italic">
                                    EXAMPLE: If password is "REACT" and you guess "REACH", Likeness = 4 (R,E,A,C are correct).
                                </p>
                            </div>
                            <button
                                onClick={() => setShowInstructions(false)}
                                className={`px-8 py-3 ${theme.bg} text-black font-bold hover:opacity-80 tracking-wider w-full transition-all`}
                            >
                                INITIALIZE HACK
                            </button>
                        </div>
                    </div>
                )}

                <div className="grid md:grid-cols-2 gap-8 relative z-20">
                    {/* Word Column */}
                    <div className="space-y-1">
                        {options.map((word, idx) => {
                            // Generate some fake hex addresses
                            const address = `0x${(0xF000 + idx * 16).toString(16).toUpperCase()}`;
                            return (
                                <div
                                    key={word}
                                    className="flex gap-4 cursor-pointer group"
                                    onMouseEnter={() => setHoveredWord(word)}
                                    onMouseLeave={() => setHoveredWord(null)}
                                    onClick={() => handleGuess(word)}
                                >
                                    <span className="opacity-50 select-none">{address}</span>
                                    <span className={`tracking-widest transition-colors ${hoveredWord === word && gameState === 'playing'
                                            ? `${theme.bg} text-black font-bold`
                                            : theme.hoverText
                                        }`}>
                                        {word}
                                    </span>
                                </div>
                            );
                        })}
                    </div>

                    {/* Logs Column */}
                    <div className={`h-64 md:h-auto overflow-y-auto font-mono text-sm border-l ${theme.borderDim} pl-4 flex flex-col`}>
                        {logs.map((log, i) => (
                            <div key={i} className="mb-1 break-words">
                                {log}
                            </div>
                        ))}
                        <div ref={logsEndRef} />
                        {gameState === 'playing' && (
                            <div className="animate-pulse mt-2">_</div>
                        )}

                        {gameState !== 'playing' && (
                            <div className={`mt-4 pt-4 border-t ${theme.borderDim}`}>
                                <button
                                    onClick={onClose}
                                    className={`px-4 py-2 ${theme.bg} text-black font-bold ${theme.bgHover} w-full`}
                                >
                                    {gameState === 'won' ? 'SYSTEM UNLOCKED - EXIT' : 'TERMINAL LOCKED - EXIT'}
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Footer Status */}
                <div className={`mt-6 pt-2 border-t ${theme.borderDim} flex justify-between text-xs opacity-70`}>
                    <span>STATUS: {gameState === 'playing' ? 'ACTIVE' : gameState === 'won' ? 'BYPASSED' : 'LOCKED'}</span>
                    <span>{hoveredWord ? `> ${hoveredWord}` : '> AWAITING INPUT'}</span>
                </div>
            </div>
        </div>
    );
};

export default TerminalHacker;
