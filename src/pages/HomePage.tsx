import React from 'react';
import { Button, TabBar } from 'antd-mobile';
import { HouseFill, MusicNoteFill, MicrophoneFill, ChartLineUpFill, UserFill } from '@phosphor-icons/react';

const HomePage: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState('home');

  return (
    <div className="home-page">
      <section className="hero-section">
        <h1 className="hero-section__greeting">早上好，张阿姨 👋</h1>
        <p className="hero-section__subtitle">今天想唱什么？</p>
        <Button 
          color="primary" 
          size="large" 
          className="start-training-btn"
        >
          开始训练
        </Button>
      </section>

      <section className="feature-nav">
        <h2>功能导航</h2>
        <div className="feature-nav__grid">
          <div className="feature-card">
            <MusicNoteFill size={48} color="var(--color-primary)" />
            <span>歌曲库</span>
          </div>
          <div className="feature-card">
            <MicrophoneFill size={48} color="var(--color-primary)" />
            <span>音准训练</span>
          </div>
          <div className="feature-card">
            <ChartLineUpFill size={48} color="var(--color-primary)" />
            <span>节奏训练</span>
          </div>
          <div className="feature-card">
            <ChartLineUpFill size={48} color="var(--color-primary)" />
            <span>进度</span>
          </div>
        </div>
      </section>

      <section className="recommended-songs">
        <h2>推荐歌曲</h2>
        <div className="song-list">
          <div className="song-card">
            <div className="song-cover">封面</div>
            <div className="song-info">
              <div className="song-title">月亮代表我的心</div>
              <div className="song-artist">邓丽君 · 经典</div>
              <Button size="small" color="primary">▶ 开始演唱</Button>
            </div>
          </div>
        </div>
      </section>

      <section className="today-progress">
        <h2>今日进度</h2>
        <div className="progress-grid">
          <div className="kpi-card">
            <div className="kpi-value">45</div>
            <div className="kpi-unit">分钟</div>
            <div className="kpi-label">今日练习</div>
          </div>
          <div className="kpi-card">
            <div className="kpi-value">3</div>
            <div className="kpi-unit">首歌</div>
            <div className="kpi-label">已学</div>
          </div>
        </div>
      </section>

      <TabBar 
        activeKey={activeTab} 
        onChange={setActiveTab}
        className="bottom-tabbar"
      >
        <TabBar.Item 
          key="home" 
          icon={<HouseFill size={32} />} 
          title="首页" 
        />
        <TabBar.Item 
          key="songs" 
          icon={<MusicNoteFill size={32} />} 
          title="歌曲库" 
        />
        <TabBar.Item 
          key="training" 
          icon={<MicrophoneFill size={32} />} 
          title="训练" 
        />
        <TabBar.Item 
          key="progress" 
          icon={<ChartLineUpFill size={32} />} 
          title="进度" 
        />
        <TabBar.Item 
          key="profile" 
          icon={<UserFill size={32} />} 
          title="我的" 
        />
      </TabBar>
    </div>
  );
};

export default HomePage;
