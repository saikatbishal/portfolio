import React, { createContext, useContext, useState } from "react";

// Define the shape of your context
interface ThemeContextType {
  isDarkMode: boolean;
  isAnimating: boolean;
  toggleTheme: () => void;
  handleAnimationComplete: () => void;
}

// Create the context with a default value (optional)
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({
  children,
}: {
  children: React.ReactElement;
}) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    // Check localStorage or system preference
    const saved = localStorage.getItem('theme');
    if (saved) {
      return saved === 'dark';
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  const toggleTheme = () => {
    setIsAnimating(true);

    // Start the animation and change theme after a slight delay
    setTimeout(() => {
      setIsDarkMode((prev) => {
        const newValue = !prev;
        localStorage.setItem('theme', newValue ? 'dark' : 'light');
        if (newValue) {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
        return newValue;
      });
    }, 500); // Change theme halfway through animation
  };

  const handleAnimationComplete = () => {
    setIsAnimating(false);
  };

  // Initialize theme on mount
  React.useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <ThemeContext.Provider value={{ isDarkMode, isAnimating, toggleTheme, handleAnimationComplete }}>
      {children}
    </ThemeContext.Provider>
  );
};
// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
