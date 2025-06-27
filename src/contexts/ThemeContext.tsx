
import React, { createContext, useContext, useEffect, useState } from 'react';

interface ThemeContextType {
  isDark: boolean;
  toggleTheme: () => void;
  setTheme: (theme: 'light' | 'dark') => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDark, setIsDark] = useState(() => {
    // Проверяем сначала localStorage, затем системные настройки
    const saved = localStorage.getItem('theme');
    if (saved) {
      return saved === 'dark';
    }
    // Проверяем системную тему
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    const applyTheme = () => {
      const root = document.documentElement;
      const body = document.body;
      
      // Очищаем предыдущие классы
      root.classList.remove('dark', 'light');
      body.classList.remove('dark', 'light');
      
      // Применяем новую тему
      if (isDark) {
        root.classList.add('dark');
        body.classList.add('dark');
        root.style.colorScheme = 'dark';
      } else {
        root.classList.add('light');
        body.classList.add('light');
        root.style.colorScheme = 'light';
      }
      
      // Сохраняем в localStorage
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
      
      console.log('Theme applied:', isDark ? 'dark' : 'light');
    };

    // Небольшая задержка для плавного переключения
    const timer = setTimeout(applyTheme, 10);
    
    return () => clearTimeout(timer);
  }, [isDark]);

  const toggleTheme = () => {
    console.log('Toggling theme from', isDark ? 'dark' : 'light', 'to', isDark ? 'light' : 'dark');
    setIsDark(prev => !prev);
  };

  const setTheme = (theme: 'light' | 'dark') => {
    console.log('Setting theme to:', theme);
    setIsDark(theme === 'dark');
  };

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
