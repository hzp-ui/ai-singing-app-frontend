// 主题上下文
// 文件路径：src/store/ThemeContext.tsx

import React, { createContext, useContext, ReactNode } from 'react';
import useDarkMode, { Theme } from '@/hooks/useDarkMode';

interface ThemeContextType {
  theme: Theme;
  isDarkMode: boolean;
  toggleTheme: () => void;
  setThemeMode: (mode: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const { theme, isDarkMode, toggleTheme, setThemeMode } = useDarkMode();

  return (
    <ThemeContext.Provider value={{ theme, isDarkMode, toggleTheme, setThemeMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

export default ThemeContext;
