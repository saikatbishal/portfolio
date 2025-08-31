import React from 'react';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import { useTheme } from '../contexts/ThemeContext';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme, isDark } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative group p-3 rounded-2xl transition-all duration-500 hover:scale-110 active:scale-95 overflow-hidden"
      style={{
        background: isDark 
          ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(147, 51, 234, 0.2))' 
          : 'linear-gradient(135deg, rgba(251, 191, 36, 0.2), rgba(245, 158, 11, 0.2))',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: isDark 
          ? '1px solid rgba(59, 130, 246, 0.3)' 
          : '1px solid rgba(251, 191, 36, 0.3)',
        boxShadow: isDark 
          ? '0 8px 32px rgba(59, 130, 246, 0.15)' 
          : '0 8px 32px rgba(251, 191, 36, 0.15)',
      }}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      {/* Animated background gradient */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: isDark 
            ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.3), rgba(147, 51, 234, 0.3))' 
            : 'linear-gradient(135deg, rgba(251, 191, 36, 0.3), rgba(245, 158, 11, 0.3))',
        }}
      />
      
      {/* Rotating icon container */}
      <div 
        className="relative z-10 transition-all duration-700 ease-out"
        style={{
          transform: isDark ? 'rotate(180deg)' : 'rotate(0deg)',
        }}
      >
        {/* Sun Icon */}
        <div 
          className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${
            isDark ? 'opacity-0 scale-0 rotate-90' : 'opacity-100 scale-100 rotate-0'
          }`}
        >
          <LightModeOutlinedIcon 
            className="transition-all duration-500 group-hover:scale-110"
            style={{ 
              fontSize: '1.5rem',
              color: '#f59e0b',
              filter: 'drop-shadow(0 0 8px rgba(245, 158, 11, 0.5))',
            }} 
          />
        </div>
        
        {/* Moon Icon */}
        <div 
          className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${
            isDark ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-0 -rotate-90'
          }`}
        >
          <DarkModeOutlinedIcon 
            className="transition-all duration-500 group-hover:scale-110"
            style={{ 
              fontSize: '1.5rem',
              color: '#3b82f6',
              filter: 'drop-shadow(0 0 8px rgba(59, 130, 246, 0.5))',
            }} 
          />
        </div>
      </div>
      
      {/* Ripple effect */}
      <div 
        className="absolute inset-0 rounded-2xl scale-0 group-active:scale-100 transition-transform duration-200"
        style={{
          background: isDark 
            ? 'radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 70%)' 
            : 'radial-gradient(circle, rgba(251, 191, 36, 0.3) 0%, transparent 70%)',
        }}
      />
      
      {/* Glow effect */}
      <div 
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"
        style={{
          background: isDark 
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