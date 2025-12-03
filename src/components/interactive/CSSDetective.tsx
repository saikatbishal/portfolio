import React, { useState,useEffect } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import { ALL_LEVELS } from '../../data/cssQuiz.tsx';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

interface Level {
    id: number;
    title: string;
    instruction: string;
    selector: string;
    htmlSnippet: string;
    RenderPreview: React.FC<{ style: React.CSSProperties }>;
    options: { id: string; code: string; style: React.CSSProperties }[];
    correctOptionId: string;
}

interface CSSDetectiveProps {
    onClose: () => void;
}

const CSSDetective: React.FC<CSSDetectiveProps> = ({ onClose }) => {
    const [gameLevels, setGameLevels] = useState<Level[]>([]);
    const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
    const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
    const [gameState, setGameState] = useState<'playing' | 'success' | 'error'>('playing');
    const [showConfetti, setShowConfetti] = useState(false);

    // Initialize game with random levels
    useEffect(() => {
        const shuffled = [...ALL_LEVELS].sort(() => 0.5 - Math.random());
        setGameLevels(shuffled.slice(0, 3));
    }, []);

    const currentLevel = gameLevels[currentLevelIndex];

    const handleOptionSelect = (optionId: string) => {
        if (gameState === 'success') return;
        setSelectedOptionId(optionId);
        setGameState('playing');
    };

    const checkSolution = () => {
        if (!selectedOptionId || !currentLevel) return;

        if (selectedOptionId === currentLevel.correctOptionId) {
            setGameState('success');
            setShowConfetti(true);
        } else {
            setGameState('error');
        }
    };

    const nextLevel = () => {
        if (currentLevelIndex < gameLevels.length - 1) {
            setCurrentLevelIndex(prev => prev + 1);
            setSelectedOptionId(null);
            setGameState('playing');
            setShowConfetti(false);
        } else {
            // Game Complete
            onClose();
        }
    };

    if (!currentLevel) return null;

    const currentStyle = currentLevel.options.find(opt => opt.id === selectedOptionId)?.style || {};

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <div className="w-full max-w-4xl bg-white dark:bg-gray-900 rounded-xl shadow-2xl overflow-hidden flex flex-col md:flex-row h-[80vh] md:h-[600px]">
                
                {/* Left Panel: Preview */}
                <div className="w-full md:w-1/2 bg-gray-50 dark:bg-black p-6 flex flex-col border-r border-gray-200 dark:border-gray-800">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-mono text-sm text-gray-500 uppercase tracking-wider">Live Preview</h3>
                        <div className="flex gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-500"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                            <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        </div>
                    </div>
                    
                    <div className="flex-1 relative border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden">
                        <currentLevel.RenderPreview style={currentStyle} />
                        
                        {gameState === 'success' && (
                            <div className="absolute inset-0 flex items-center justify-center bg-green-500/20 backdrop-blur-[2px] animate-in fade-in duration-300">
                                <div className="bg-white dark:bg-gray-900 p-4 rounded-full shadow-xl">
                                    <CheckCircleIcon className="text-green-500 !text-5xl" />
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="mt-4 p-3 bg-gray-100 dark:bg-gray-800 rounded font-mono text-xs text-gray-600 dark:text-gray-400 overflow-x-auto">
                        <pre>{currentLevel.htmlSnippet}</pre>
                    </div>
                </div>

                {/* Right Panel: Controls */}
                <div className="w-full md:w-1/2 p-6 flex flex-col bg-white dark:bg-gray-900 relative">
                    <button 
                        onClick={onClose}
                        className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                    >
                        <CloseIcon />
                    </button>

                    <div className="mb-6">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-xs font-bold rounded uppercase">
                                Level {currentLevelIndex + 1}/{gameLevels.length}
                            </span>
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                                {currentLevel.title}
                            </h2>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                            {currentLevel.instruction}
                        </p>
                    </div>

                    <div className="flex-1">
                        <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm text-gray-300 shadow-inner">
                            <div className="mb-2 text-gray-500">// Select the correct property to fix the layout</div>
                            <div className="text-purple-400">{currentLevel.selector} <span className="text-white">{'{'}</span></div>
                            
                            <div className="my-2 pl-4 space-y-2">
                                {currentLevel.options.map((option) => (
                                    <button
                                        key={option.id}
                                        onClick={() => handleOptionSelect(option.id)}
                                        className={`w-full text-left px-3 py-2 rounded transition-all duration-200 flex items-center gap-2 ${
                                            selectedOptionId === option.id
                                                ? gameState === 'error' && option.id !== currentLevel.correctOptionId
                                                    ? 'bg-red-900/30 text-red-400 border border-red-500/50'
                                                    : 'bg-blue-900/30 text-blue-400 border border-blue-500/50'
                                                : 'hover:bg-gray-800 text-gray-400 border border-transparent'
                                        }`}
                                    >
                                        <span className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                                            selectedOptionId === option.id 
                                                ? 'border-current' 
                                                : 'border-gray-600'
                                        }`}>
                                            {selectedOptionId === option.id && <div className="w-2 h-2 rounded-full bg-current" />}
                                        </span>
                                        {option.code}
                                    </button>
                                ))}
                            </div>

                            <div className="text-white">{'}'}</div>
                        </div>

                        {gameState === 'error' && (
                            <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm rounded flex items-center gap-2 animate-pulse">
                                <ErrorIcon fontSize="small" />
                                <span>Incorrect property. Try again!</span>
                            </div>
                        )}
                    </div>

                    <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-800">
                        {gameState === 'success' ? (
                            <button
                                onClick={nextLevel}
                                className="w-full py-3 bg-green-500 hover:bg-green-600 text-white font-bold rounded-lg shadow-lg shadow-green-500/30 flex items-center justify-center gap-2 transition-all transform hover:scale-[1.02]"
                            >
                                {currentLevelIndex === gameLevels.length - 1 ? 'Finish Game' : 'Next Level'}
                                <ArrowForwardIcon />
                            </button>
                        ) : (
                            <button
                                onClick={checkSolution}
                                disabled={!selectedOptionId}
                                className={`w-full py-3 font-bold rounded-lg flex items-center justify-center gap-2 transition-all ${
                                    selectedOptionId
                                        ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/30 transform hover:scale-[1.02]'
                                        : 'bg-gray-200 dark:bg-gray-800 text-gray-400 cursor-not-allowed'
                                }`}
                            >
                                Apply Fix
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CSSDetective;
