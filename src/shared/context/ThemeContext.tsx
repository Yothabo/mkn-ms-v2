import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>('light');
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('mkn-theme') as Theme;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
      setThemeState(savedTheme);
    } else if (prefersDark) {
      setThemeState('dark');
    } else {
      setThemeState('light');
    }
    setIsInitialized(true);
  }, []);

  // Apply theme to document and save to localStorage
  useEffect(() => {
    if (!isInitialized) return;

    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('mkn-theme', theme);
    
    // Add transition class temporarily
    document.documentElement.classList.add('theme-transition');
    const timeout = setTimeout(() => {
      document.documentElement.classList.remove('theme-transition');
    }, 300);

    return () => clearTimeout(timeout);
  }, [theme, isInitialized]);

  const setTheme = (newTheme: Theme) => {
    if (isInitialized) {
      setThemeState(newTheme);
    }
  };

  const toggleTheme = () => {
    if (isInitialized) {
      setThemeState(prev => prev === 'light' ? 'dark' : 'light');
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
