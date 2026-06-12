// 个人中心页面
// 文件路径：src/pages/ProfilePage.tsx

import React from 'react';
import { NavBar, Switch, Toast } from 'antd-mobile';
import ThemeToggle from '@/components/ThemeToggle';
import './ProfilePage.css';

const ProfilePage: React.FC = () => {
  const [largeText, setLargeText] = React.useState(false);
  const [reduceMotion, setReduceMotion] = React.useState(false);

  const handleLargeTextChange = (checked: boolean) => {
    setLargeText(checked);
    if (checked) {
      document.documentElement.classList.add('large-text-mode');
    } else {
      document.documentElement.classList.remove('large-text-mode');
    }
    Toast.show(checked ? '已开启大字体模式' : '已关闭大字体模式');
  };

  const handleReduceMotionChange = (checked: boolean) => {
    setReduceMotion(checked);
    Toast.show(checked ? '已减弱动画效果' : '已恢复动画效果');
  };

  return (
    <div className="profile-page">
      <NavBar
        className="page-navbar"
        back={null}
        right={<ThemeToggle />}
      >
        个人中心
      </NavBar>

      <div className="profile-container">
        {/* 用户信息 */}
        <div className="user-card">
          <div className="user-avatar">👤</div>
          <h2 className="user-name">唱歌爱好者</h2>
          <p className="user-level">入门级歌手</p>
        </div>

        {/* 统计数据 */}
        <div className="stats-grid">
          <div className="stat-item">
            <div className="stat-value">15</div>
            <div className="stat-label">训练天数</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">8</div>
            <div className="stat-label">已学歌曲</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">72</div>
            <div className="stat-label">平均分数</div>
          </div>
        </div>

        {/* 设置选项 */}
        <div className="settings-card">
          <h3>无障碍设置</h3>
          
          <div className="setting-item">
            <span>大字体模式</span>
            <Switch
              checked={largeText}
              onChange={handleLargeTextChange}
            />
          </div>
          
          <div className="setting-item">
            <span>减弱动画</span>
            <Switch
              checked={reduceMotion}
              onChange={handleReduceMotionChange}
            />
          </div>
          
          <div className="setting-item">
            <span>暗色模式</span>
            <ThemeToggle />
          </div>
        </div>

        {/* 其他设置 */}
        <div className="other-settings">
          <h3>其他设置</h3>
          
          <div className="setting-item">
            <span>通知提醒</span>
            <Switch defaultChecked />
          </div>
          
          <div className="setting-item">
            <span>音频质量</span>
            <span className="setting-value">高品质</span>
          </div>
          
          <div className="setting-item">
            <span>清除缓存</span>
            <span className="setting-value">23.5 MB</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
