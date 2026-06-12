// 训练页面
// 文件路径：src/pages/TrainingPage.tsx

import React, { useState, useEffect, useRef } from 'react';
import { NavBar, Button, ProgressBar, Toast } from 'antd-mobile';
import ThemeToggle from '@/components/ThemeToggle';
import audioService from '@/services/audioService';
import './TrainingPage.css';

const TrainingPage: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [progress, setProgress] = useState(0);
  const [pitch, setPitch] = useState(0);
  const pitchInterval = useRef<NodeJS.Timeout | null>(null);

  const handleStartRecording = async () => {
    try {
      await audioService.startRecording();
      setIsRecording(true);
      Toast.show('开始录音...');

      // 模拟进度
      let p = 0;
      const interval = setInterval(() => {
        p += 10;
        setProgress(p);
        if (p >= 100) {
          clearInterval(interval);
          handleStopRecording();
        }
      }, 500);

      // 获取实时音高
      pitchInterval.current = setInterval(() => {
        const currentPitch = audioService.getRealtimePitch();
        setPitch(currentPitch);
      }, 100);

    } catch (error) {
      Toast.show('录音失败，请检查麦克风权限');
      console.error('录音失败:', error);
    }
  };

  const handleStopRecording = async () => {
    try {
      setIsRecording(false);
      Toast.show('停止录音');

      if (pitchInterval.current) {
        clearInterval(pitchInterval.current);
      }

      const audioBlob = await audioService.stopRecording();
      console.log('录音完成，文件大小:', audioBlob.size);
      Toast.show('训练完成！');
    } catch (error) {
      console.error('停止录音失败:', error);
    }
  };

  // 组件销毁时清理
  useEffect(() => {
    return () => {
      if (pitchInterval.current) {
        clearInterval(pitchInterval.current);
      }
      audioService.destroy();
    };
  }, []);

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
          {/* 实时音高显示 */}
          <div className="pitch-display">
            <div className="pitch-value">
              {pitch > 0 ? `${pitch} Hz` : '--'}
            </div>
            <div className="pitch-label">实时音高</div>
          </div>

          {/* 音高柱状图 */}
          <div className="pitch-bar">
            <div
              className="pitch-bar__fill"
              style={{ height: `${Math.min(pitch / 10, 100)}%` }}
            ></div>
          </div>

          {/* 歌词显示 */}
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
