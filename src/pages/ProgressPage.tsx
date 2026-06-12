// 进度页面
// 文件路径：src/pages/ProgressPage.tsx

import React from 'react';
import { NavBar, ProgressCircle, Tag } from 'antd-mobile';
import ThemeToggle from '@/components/ThemeToggle';
import './ProgressPage.css';

const ProgressPage: React.FC = () => {
  return (
    <div className="progress-page">
      <NavBar
        className="page-navbar"
        back={null}
        right={<ThemeToggle />}
      >
        我的进度
      </NavBar>

      <div className="progress-container">
        {/* 总训练时长 */}
        <div className="stats-card">
          <ProgressCircle
            percent={68}
            style={{
              '--size': '120px',
              '--fill-color': 'var(--color-primary)',
            } as any}
          >
            <span className="progress-text">68%</span>
          </ProgressCircle>
          <h3>本月训练完成度</h3>
          <p>已训练 15 天，继续努力！</p>
        </div>

        {/* 能力雷达图（简化版） */}
        <div className="ability-card">
          <h3>唱歌能力评估</h3>
          <div className="ability-items">
            <div className="ability-item">
              <span>音准</span>
              <div className="ability-bar">
                <div className="ability-bar__fill" style={{ width: '75%' }}></div>
              </div>
              <span>75</span>
            </div>
            <div className="ability-item">
              <span>节奏</span>
              <div className="ability-bar">
                <div className="ability-bar__fill" style={{ width: '82%' }}></div>
              </div>
              <span>82</span>
            </div>
            <div className="ability-item">
              <span>气息</span>
              <div className="ability-bar">
                <div className="ability-bar__fill" style={{ width: '68%' }}></div>
              </div>
              <span>68</span>
            </div>
            <div className="ability-item">
              <span>共鸣</span>
              <div className="ability-bar">
                <div className="ability-bar__fill" style={{ width: '70%' }}></div>
              </div>
              <span>70</span>
            </div>
          </div>
        </div>

        {/* 训练历史 */}
        <div className="history-card">
          <h3>最近训练</h3>
          <div className="history-list">
            <div className="history-item">
              <div className="history-info">
                <h4>沧海一声笑</h4>
                <p>2026-06-12 10:30</p>
              </div>
              <Tag color="success">88分</Tag>
            </div>
            <div className="history-item">
              <div className="history-info">
                <h4>月亮代表我的心</h4>
                <p>2026-06-11 15:20</p>
              </div>
              <Tag color="warning">72分</Tag>
            </div>
            <div className="history-item">
              <div className="history-info">
                <h4>稻香</h4>
                <p>2026-06-10 09:15</p>
              </div>
              <Tag color="success">91分</Tag>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressPage;
