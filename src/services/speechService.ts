// 语音反馈服务
// 文件路径：src/services/speechService.ts

export class SpeechService {
  private synthesizer: SpeechSynthesis;
  private isEnabled: boolean;

  constructor() {
    this.synthesizer = window.speechSynthesis;
    this.isEnabled = true;
  }

  // 播报文本
  speak(text: string, rate: number = 0.9): void {
    if (!this.isEnabled) return;
    if (!this.synthesizer) {
      console.warn('当前浏览器不支持语音合成');
      return;
    }

    // 停止当前播报
    this.synthesizer.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = rate; // 语速（0.1-10），默认 0.9 稍慢
    utterance.pitch = 1; // 音高（0-2）
    utterance.volume = 1; // 音量（0-1）
    
    // 优先使用中文语音
    const voices = this.synthesizer.getVoices();
    const chineseVoice = voices.find(voice => 
      voice.lang.includes('zh') || voice.lang.includes('CN')
    );
    if (chineseVoice) {
      utterance.voice = chineseVoice;
    }

    this.synthesizer.speak(utterance);
  }

  // 停止播报
  stop(): void {
    if (this.synthesizer) {
      this.synthesizer.cancel();
    }
  }

  // 启用/禁用
  setEnabled(enabled: boolean): void {
    this.isEnabled = enabled;
    if (!enabled) {
      this.stop();
    }
  }

  // 获取状态
  getEnabled(): boolean {
    return this.isEnabled;
  }
}

// 导出单例
const speechService = new SpeechService();
export default speechService;
