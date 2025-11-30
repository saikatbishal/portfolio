import React from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface ThemeTransitionProps {
    isAnimating: boolean;
    isDarkMode: boolean;
    onAnimationComplete: () => void;
}

const ThemeTransition: React.FC<ThemeTransitionProps> = ({
    isAnimating,
    isDarkMode,
    onAnimationComplete,
}) => {
    return (
        <AnimatePresence>
            {isAnimating && (
                <>
                    {/* Expanding circle animation - lowest z-index to paint background */}
                    <motion.div
                        className="fixed z-100 pointer-events-none"
                        style={{
                            top: 0,
                            right: 0,
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            backgroundColor: isDarkMode ? '#0a0a0a' : '#ffffff',
                            transformOrigin: 'center',
                        }}
                        initial={{
                            scale: 0,
                            x: '-20px',
                            y: '20px',
                        }}
                        animate={{
                            scale: 80, // Increased scale to cover entire viewport
                            x: '-20px',
                            y: '20px',
                        }}
                        exit={{
                            opacity: 0,
                            transition: { duration: 0.1 }
                        }}
                        transition={{
                            duration: 1,
                            ease: [0.25, 0.46, 0.45, 0.94],
                        }}
                        onAnimationComplete={() => {
                            // Delay to allow for smooth transition
                            setTimeout(() => {
                                onAnimationComplete();
                            }, 100);
                        }}
                    />

                    {/* Blur overlay for content - higher z-index than circle */}
                    <motion.div
                        className="fixed inset-0 z-[5000]"
                        style={{
                            backdropFilter: 'blur(0px)',
                            pointerEvents: 'none',
                        }}
                        initial={{ backdropFilter: 'blur(0px)' }}
                        animate={{ backdropFilter: 'blur(4px)' }}
                        exit={{ backdropFilter: 'blur(0px)' }}
                        transition={{
                            duration: 0.4,
                            ease: 'easeInOut',
                        }}
                    />
                </>
            )}
        </AnimatePresence>
    );
};

export default ThemeTransition;