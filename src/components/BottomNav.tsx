// 底部导航组件
// 文件路径：src/components/BottomNav.tsx

import React from 'react';
import { TabBar } from 'antd-mobile';
import { useNavigate, useLocation } from 'react-router-dom';
import './BottomNav.css';

const BottomNav: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const tabs = [
    {
      key: '/',
      title: '首页',
      icon: <div className="nav-icon">🏠</div>,
    },
    {
      key: '/songs',
      title: '歌曲库',
      icon: <div className="nav-icon">🎵</div>,
    },
    {
      key: '/training',
      title: '训练',
      icon: <div className="nav-icon">🎤</div>,
    },
    {
      key: '/progress',
      title: '进度',
      icon: <div className="nav-icon">📊</div>,
    },
    {
      key: '/profile',
      title: '我的',
      icon: <div className="nav-icon">👤</div>,
    },
  ];

  return (
    <div className="bottom-nav">
      <TabBar
        activeKey={location.pathname}
        onChange={key => navigate(key)}
      >
        {tabs.map(tab => (
          <TabBar.Item
            key={tab.key}
            title={tab.title}
            icon={tab.icon}
          />
        ))}
      </TabBar>
    </div>
  );
};

export default BottomNav;
