// 暗色模式管理 Hook
// 文件路径：src/hooks/useDarkMode.ts

import { useState, useEffect, useCallback } from 'react';

type Theme = 'light' | 'dark';

export function useDarkMode() {
  // 从 localStorage 读取初始主题，默认 light
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('ai-singing-theme');
    if (saved === 'dark' || saved === 'light') {
      return saved;
    }
    // 如果未保存，检查系统偏好
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  });

  // 切换主题
  const toggleTheme = useCallback(() => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  }, []);

  // 设置特定主题
  const setThemeMode = useCallback((mode: Theme) => {
    setTheme(mode);
  }, []);

  // 当 theme 变化时，更新 DOM 和 localStorage
  useEffect(() => {
    const root = document.documentElement;
    
    if (theme === 'dark') {
      root.setAttribute('data-theme', 'dark');
    } else {
      root.removeAttribute('data-theme');
    }
    
    localStorage.setItem('ai-singing-theme', theme);
  }, [theme]);

  // 监听系统主题变化
  useEffect(() => {
    if (!window.matchMedia) return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e: MediaQueryListEvent) => {
      // 只有当用户未手动设置主题时，才跟随系统
      const saved = localStorage.getItem('ai-singing-theme');
      if (!saved) {
        setTheme(e.matches ? 'dark' : 'light');
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return {
    theme,
    isDarkMode: theme === 'dark',
    toggleTheme,
    setThemeMode,
  };
}

export default useDarkMode;
