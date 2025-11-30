import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTheme } from '../contexts/ThemeContext';

const ThemeToggle: React.FC = () => {
  const { toggleTheme, isDarkMode } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative group p-3 rounded-2xl transition-all duration-500 hover:scale-110 active:scale-95 overflow-hidden"
      style={{
        background: isDarkMode
          ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(147, 51, 234, 0.2))'
          : 'linear-gradient(135deg, rgba(251, 191, 36, 0.2), rgba(245, 158, 11, 0.2))',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: isDarkMode
          ? '1px solid rgba(59, 130, 246, 0.3)'
          : '1px solid rgba(251, 191, 36, 0.3)',
        boxShadow: isDarkMode
          ? '0 8px 32px rgba(59, 130, 246, 0.15)'
          : '0 8px 32px rgba(251, 191, 36, 0.15)',
      }}
      aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
    >
      {/* Animated background gradient */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: isDarkMode
            ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.3), rgba(147, 51, 234, 0.3))'
            : 'linear-gradient(135deg, rgba(251, 191, 36, 0.3), rgba(245, 158, 11, 0.3))',
        }}
      />

      {/* Animated Icon Container */}
      <div className="relative z-10 w-6 h-6 flex items-center justify-center">
        <AnimatePresence mode="wait" initial={false}>
          {isDarkMode ? (
            <motion.div
              key="sun"
              initial={{ scale: 0, rotate: 180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: -180 }}
              transition={{
                duration: 0.6,
                ease: "backInOut"
              }}
              className="absolute"
            >
              {/* Minimal Sun SVG */}
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Sun rays */}
                <motion.g
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  {Array.from({ length: 8 }).map((_, i) => (
                    <motion.line
                      key={i}
                      x1="12"
                      y1="1"
                      x2="12"
                      y2="3"
                      stroke="#f59e0b"
                      strokeWidth="2"
                      strokeLinecap="round"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        duration: 0.3,
                        delay: 0.4 + i * 0.05,
                        ease: "backOut"
                      }}
                      style={{
                        transformOrigin: "12px 12px",
                        transform: `rotate(${i * 45}deg)`,
                        filter: 'drop-shadow(0 0 4px rgba(245, 158, 11, 0.3))',
                      }}
                    />
                  ))}
                </motion.g>

                {/* Sun center circle */}
                <motion.circle
                  cx="12"
                  cy="12"
                  r="5"
                  stroke="#f59e0b"
                  strokeWidth="2"
                  fill="none"
                  initial={{ scale: 0, pathLength: 0 }}
                  animate={{ scale: 1, pathLength: 1 }}
                  transition={{
                    duration: 0.6,
                    ease: "backOut"
                  }}
                  style={{
                    filter: 'drop-shadow(0 0 8px rgba(245, 158, 11, 0.5))',
                  }}
                />
              </svg>
            </motion.div>
          ) : (
            <motion.div
              key="moon"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
              transition={{
                duration: 0.6,
                ease: "backInOut"
              }}
              className="absolute"
            >
              {/* Minimal Moon SVG */}
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <motion.path
                  d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
                  stroke="#64748b"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  style={{
                    filter: 'drop-shadow(0 0 8px rgba(100, 116, 139, 0.5))',
                  }}
                />
                {/* Moon craters */}
                <motion.circle
                  cx="16"
                  cy="8"
                  r="1"
                  fill="#64748b"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.8 }}
                />
                <motion.circle
                  cx="15"
                  cy="12"
                  r="0.5"
                  fill="#64748b"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.9 }}
                />
              </svg>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Ripple effect */}
      <div
        className="absolute inset-0 rounded-2xl scale-0 group-active:scale-100 transition-transform duration-200"
        style={{
          background: isDarkMode
            ? 'radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(251, 191, 36, 0.3) 0%, transparent 70%)',
        }}
      />

      {/* Glow effect */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"
        style={{
          background: isDarkMode
            ? 'radial-gradient(circle, rgba(59, 130, 246, 0.2) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(251, 191, 36, 0.2) 0%, transparent 70%)',
          filter: 'blur(10px)',
          transform: 'scale(1.2)',
        }}
      />
    </button>
  );
};

export default ThemeToggle;