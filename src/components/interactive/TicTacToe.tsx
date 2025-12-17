import React, { useState, useEffect, useCallback } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

interface TicTacToeProps {
    onClose: () => void;
}

type Player = 'X' | 'O' | null;
type Board = Player[];

const TicTacToe: React.FC<TicTacToeProps> = ({ onClose }) => {
    const [board, setBoard] = useState<Board>(Array(9).fill(null));
    const [isXNext, setIsXNext] = useState(true);
    const [winner, setWinner] = useState<Player>(null);
    const [winningLine, setWinningLine] = useState<number[]>([]);
    const [scores, setScores] = useState({ X: 0, O: 0, draws: 0 });
    const [gameOver, setGameOver] = useState(false);

    const winPatterns = React.useMemo(() => [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]              // Diagonals
    ], []);

    const calculateWinner = useCallback((squares: Board): { winner: Player; line: number[] } | null => {
        for (const pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return { winner: squares[a], line: pattern };
            }
        }
        // Check for draw
        if (squares.every(square => square !== null)) {
            return { winner: null, line: [] };
        }
        return null;
    }, [winPatterns]);

    useEffect(() => {
        const result = calculateWinner(board);
        if (result) {
            setWinner(result.winner);
            setWinningLine(result.line);
            setGameOver(true);
            if (result.winner) {
                setScores(prev => ({
                    ...prev,
                    [result.winner as 'X' | 'O']: prev[result.winner as 'X' | 'O'] + 1
                }));
            } else {
                setScores(prev => ({ ...prev, draws: prev.draws + 1 }));
            }
        }
    }, [board, calculateWinner]);

    const handleClick = (index: number) => {
        if (board[index] || winner || gameOver) return;

        const newBoard = [...board];
        newBoard[index] = isXNext ? 'X' : 'O';
        setBoard(newBoard);
        setIsXNext(!isXNext);
    };

    const resetGame = () => {
        setBoard(Array(9).fill(null));
        setIsXNext(true);
        setWinner(null);
        setWinningLine([]);
        setGameOver(false);
    };

    const resetScores = () => {
        setScores({ X: 0, O: 0, draws: 0 });
        resetGame();
    };

    const renderSquare = (index: number) => {
        const value = board[index];
        const isWinningSquare = winningLine.includes(index);

        return (
            <button
                onClick={() => handleClick(index)}
                className={`
          aspect-square w-full border-2 font-bold text-4xl md:text-5xl font-mono
          transition-all duration-200 
          ${!value && !gameOver ? 'hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer' : 'cursor-not-allowed'}
          ${isWinningSquare ? 'bg-green-100 dark:bg-green-900/30 border-green-500 dark:border-green-500' : 'border-gray-300 dark:border-gray-700'}
          ${value === 'X' ? 'text-blue-600 dark:text-blue-400' : 'text-red-600 dark:text-red-400'}
        `}
                disabled={!!value || gameOver}
            >
                {value}
            </button>
        );
    };

    const currentPlayer = isXNext ? 'X' : 'O';
    const statusMessage = winner
        ? winner === 'X' || winner === 'O'
            ? `🎉 Player ${winner} Wins!`
            : "🤝 It's a Draw!"
        : `Player ${currentPlayer}'s Turn`;

    return (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-gray-900 border-2 border-gray-300 dark:border-gray-700 max-w-2xl w-full rounded-lg shadow-2xl overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-600 to-red-600 p-6 relative">
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-white hover:bg-white/20 p-2 rounded-full transition-all"
                        aria-label="Close"
                    >
                        <CloseIcon />
                    </button>
                    <h2 className="text-3xl font-bold font-mono text-white text-center mb-2">
                        Tic Tac Toe
                    </h2>
                    <p className="text-white/90 text-center font-mono text-sm">
                        2 Player Classic Battle
                    </p>
                </div>

                {/* Game Content */}
                <div className="p-6 md:p-8">
                    {/* Scoreboard */}
                    <div className="grid grid-cols-3 gap-4 mb-6">
                        <div className="text-center p-4 border-2 border-blue-500 dark:border-blue-500 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 font-mono">
                                {scores.X}
                            </div>
                            <div className="text-sm text-blue-600 dark:text-blue-400 font-mono mt-1">
                                Player X
                            </div>
                        </div>
                        <div className="text-center p-4 border-2 border-gray-300 dark:border-gray-700 rounded-lg">
                            <div className="text-3xl font-bold text-gray-600 dark:text-gray-400 font-mono">
                                {scores.draws}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400 font-mono mt-1">
                                Draws
                            </div>
                        </div>
                        <div className="text-center p-4 border-2 border-red-500 dark:border-red-500 rounded-lg bg-red-50 dark:bg-red-900/20">
                            <div className="text-3xl font-bold text-red-600 dark:text-red-400 font-mono">
                                {scores.O}
                            </div>
                            <div className="text-sm text-red-600 dark:text-red-400 font-mono mt-1">
                                Player O
                            </div>
                        </div>
                    </div>

                    {/* Status Message */}
                    <div className={`
            text-center text-xl md:text-2xl font-bold font-mono mb-6 p-4 rounded-lg
            ${winner ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white'}
          `}>
                        {statusMessage}
                    </div>

                    {/* Game Board */}
                    <div className="grid grid-cols-3 gap-2 md:gap-3 max-w-md mx-auto mb-6">
                        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map(index => renderSquare(index))}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-4 justify-center flex-wrap">
                        <button
                            onClick={resetGame}
                            className="px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-mono text-sm hover:bg-gray-700 dark:hover:bg-gray-200 transition-all duration-300 flex items-center gap-2"
                        >
                            <RestartAltIcon />
                            New Game
                        </button>
                        <button
                            onClick={resetScores}
                            className="px-6 py-3 border-2 border-gray-900 dark:border-white text-gray-900 dark:text-white font-mono text-sm hover:bg-gray-900 hover:text-white dark:hover:bg-white dark:hover:text-gray-900 transition-all duration-300"
                        >
                            Reset Scores
                        </button>
                    </div>

                    {/* Game Instructions */}
                    <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                        <h4 className="font-mono font-bold text-sm text-gray-900 dark:text-white mb-2">
                            How to Play:
                        </h4>
                        <ul className="text-sm text-gray-600 dark:text-gray-400 font-mono space-y-1">
                            <li>• Players take turns marking spaces (X and O)</li>
                            <li>• First to get 3 in a row (horizontal, vertical, diagonal) wins</li>
                            <li>• If all 9 squares are filled with no winner, it's a draw</li>
                            <li>• Click "New Game" to play again or "Reset Scores" to start fresh</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TicTacToe;
