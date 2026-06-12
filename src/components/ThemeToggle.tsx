// 暗色模式切换按钮组件
// 文件路径：src/components/ThemeToggle.tsx

import React from 'react';
import { useTheme } from '@/store/ThemeContext';
import './ThemeToggle.css';

const ThemeToggle: React.FC = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <button
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label={isDarkMode ? '切换到亮色模式' : '切换到暗色模式'}
      title={isDarkMode ? '切换到亮色模式' : '切换到暗色模式'}
    >
      <span className="theme-toggle__icon">
        {isDarkMode ? '☀️' : '🌙'}
      </span>
      <span className="theme-toggle__text">
        {isDarkMode ? '亮色' : '暗色'}
      </span>
    </button>
  );
};

export default ThemeToggle;
