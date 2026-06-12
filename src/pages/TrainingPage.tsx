// 训练页面
// 文件路径：src/pages/TrainingPage.tsx

import React, { useState } from 'react';
import { NavBar, Button, ProgressBar, Toast } from 'antd-mobile';
import ThemeToggle from '@/components/ThemeToggle';
import './TrainingPage.css';

const TrainingPage: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleStartRecording = () => {
    setIsRecording(true);
    Toast.show('开始录音...');
    // 模拟进度
    let p = 0;
    const interval = setInterval(() => {
      p += 10;
      setProgress(p);
      if (p >= 100) {
        clearInterval(interval);
        setIsRecording(false);
        Toast.show('训练完成！');
      }
    }, 500);
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    Toast.show('停止录音');
  };

  return (
    <div className="training-page">
      <NavBar
        className="page-navbar"
        back={null}
        right={<ThemeToggle />}
      >
        唱歌训练
      </NavBar>

      <div className="training-container">
        {/* 歌曲信息 */}
        <div className="song-info-card">
          <h2>沧海一声笑</h2>
          <p>许冠杰 · 入门难度</p>
        </div>

        {/* 音频可视化区域 */}
        <div className="audio-visualizer">
          <div className="pitch-bar">
            <div className="pitch-bar__fill" style={{ height: `${progress}%` }}></div>
          </div>
          <div className="lyrics-display">
            <p>沧海一声笑 滔滔两岸潮</p>
            <p className="current-lyric">浮沉随浪 记今朝</p>
            <p>苍天笑 纷纷世上潮</p>
          </div>
        </div>

        {/* 进度显示 */}
        <div className="progress-section">
          <div className="progress-item">
            <span>音准</span>
            <ProgressBar percent={75} />
          </div>
          <div className="progress-item">
            <span>节奏</span>
            <ProgressBar percent={82} />
          </div>
          <div className="progress-item">
            <span>气息</span>
            <ProgressBar percent={68} />
          </div>
        </div>

        {/* 控制按钮 */}
        <div className="control-buttons">
          {!isRecording ? (
            <Button
              className="btn-start"
              onClick={handleStartRecording}
            >
              开始跟唱
            </Button>
          ) : (
            <Button
              className="btn-stop"
              onClick={handleStopRecording}
            >
              停止
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrainingPage;
