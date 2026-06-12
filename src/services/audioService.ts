// 音频服务
// 文件路径：src/services/audioService.ts

export interface AudioConfig {
  sampleRate: number;
  channels: number;
  bitsPerSample: number;
}

export interface PitchData {
  pitch: number; // 音高 (Hz)
  clarity: number; // 清晰度 (0-1)
  timestamp: number; // 时间戳 (ms)
}

export interface RhythmData {
  tempo: number; //  tempo (BPM)
  beatTimes: number[]; // 节拍时间点
}

export class AudioService {
  private mediaRecorder: MediaRecorder | null = null;
  private audioContext: AudioContext | null = null;
  private analyser: AnalyserNode | null = null;
  private recordedChunks: Blob[] = [];
  private isRecording = false;

  // 开始录音
  async startRecording(): Promise<void> {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      this.mediaRecorder = new MediaRecorder(stream);
      this.recordedChunks = [];
      
      this.mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          this.recordedChunks.push(event.data);
        }
      };
      
      this.mediaRecorder.start();
      this.isRecording = true;
      
      // 初始化音频分析
      this.audioContext = new AudioContext();
      this.analyser = this.audioContext.createAnalyser();
      this.analyser.fftSize = 2048;
      
      const source = this.audioContext.createMediaStreamSource(stream);
      source.connect(this.analyser);
      
    } catch (error) {
      console.error('开始录音失败:', error);
      throw error;
    }
  }

  // 停止录音
  async stopRecording(): Promise<Blob> {
    return new Promise((resolve, reject) => {
      if (!this.mediaRecorder) {
        reject(new Error('录音未开始'));
        return;
      }

      this.mediaRecorder.onstop = () => {
        const audioBlob = new Blob(this.recordedChunks, { type: 'audio/webm' });
        this.isRecording = false;
        
        // 停止所有音频轨道
        this.mediaRecorder!.stream.getTracks().forEach(track => track.stop());
        
        if (this.audioContext) {
          this.audioContext.close();
          this.audioContext = null;
        }
        
        resolve(audioBlob);
      };

      this.mediaRecorder.stop();
    });
  }

  // 获取实时音高数据（简化版）
  getRealtimePitch(): number {
    if (!this.analyser || !this.audioContext) return 0;

    const bufferLength = this.analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    this.analyser.getByteFrequencyData(dataArray);

    // 简化版：找到最大振幅对应的频率
    let maxAmplitude = 0;
    let maxIndex = 0;
    
    for (let i = 0; i < bufferLength; i++) {
      if (dataArray[i] > maxAmplitude) {
        maxAmplitude = dataArray[i];
        maxIndex = i;
      }
    }

    // 将索引转换为频率 (Hz)
    const sampleRate = this.audioContext.sampleRate;
    const frequency = maxIndex * sampleRate / this.analyser.fftSize;

    return Math.round(frequency);
  }

  // 播放音频
  async playAudio(audioBlob: Blob): Promise<void> {
    const audioUrl = URL.createObjectURL(audioBlob);
    const audio = new Audio(audioUrl);
    await audio.play();
  }

  // 获取录音状态
  getIsRecording(): boolean {
    return this.isRecording;
  }

  // 销毁
  destroy() {
    if (this.mediaRecorder && this.isRecording) {
      this.mediaRecorder.stop();
    }
    if (this.audioContext) {
      this.audioContext.close();
    }
  }
}

// 导出单例
const audioService = new AudioService();
export default audioService;
