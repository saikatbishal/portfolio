import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTheme } from '../contexts/ThemeContext';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';

const ThemeToggle: React.FC = () => {
  const { toggleTheme, isDarkMode } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative group p-2 rounded-md transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:border-gray-900 dark:hover:border-white bg-white dark:bg-gray-950"
      aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
    >
      <div className="relative z-10 w-6 h-6 flex items-center justify-center text-gray-900 dark:text-white">
        <AnimatePresence mode="wait" initial={false}>
          {isDarkMode ? (
            <motion.div
              key="sun"
              initial={{ scale: 0, rotate: 90 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: -90 }}
              transition={{ duration: 0.2 }}
              className="absolute"
            >
              <LightModeOutlinedIcon style={{ fontSize: '1.2rem' }} />
            </motion.div>
          ) : (
            <motion.div
              key="moon"
              initial={{ scale: 0, rotate: -90 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 90 }}
              transition={{ duration: 0.2 }}
              className="absolute"
            >
              <DarkModeOutlinedIcon style={{ fontSize: '1.2rem' }} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </button>
  );
};

export default ThemeToggle;