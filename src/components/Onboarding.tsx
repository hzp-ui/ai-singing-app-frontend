// 新手引导组件
// 文件路径：src/components/Onboarding.tsx

import React, { useState } from 'react';
import { Button, Toast } from 'antd-mobile';
import './Onboarding.css';

interface OnboardingProps {
  onComplete: () => void;
}

const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      title: '欢迎使用 AI 唱歌教学',
      description: '让我们一起享受唱歌的乐趣！',
      icon: '🎤',
    },
    {
      title: '选择喜欢的歌曲',
      description: '在歌曲库中找到您想唱的歌',
      icon: '🎵',
    },
    {
      title: '开始跟唱训练',
      description: '跟着伴奏和歌词一起唱，我们会给您反馈',
      icon: '🎧',
    },
    {
      title: '查看进步',
      description: '在进度页面查看您的训练成果',
      icon: '📊',
    },
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handleSkip = () => {
    handleComplete();
  };

  const handleComplete = () => {
    localStorage.setItem('ai-sing-ing-onboarded', 'true');
    Toast.show('引导完成！');
    onComplete();
  };

  const step = steps[currentStep];

  return (
    <div className="onboarding-overlay">
      <div className="onboarding-card">
        <div className="onboarding-icon">{step.icon}</div>
        <h2 className="onboarding-title">{step.title}</h2>
        <p className="onboarding-description">{step.description}</p>

        <div className="onboarding-progress">
          {steps.map((_, index) => (
            <div
              key={index}
              className={`progress-dot ${index === currentStep ? 'active' : ''}`}
            />
          ))}
        </div>

        <div className="onboarding-actions">
          <Button className="btn-skip" onClick={handleSkip}>
            跳过
          </Button>
          <Button className="btn-next" onClick={handleNext}>
            {currentStep < steps.length - 1 ? '下一步' : '开始体验'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
