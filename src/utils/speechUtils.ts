export class SpeechManager {
  private static instance: SpeechManager;
  private synthesis: SpeechSynthesis;
  private voices: SpeechSynthesisVoice[] = [];
  private speaking = false;

  private constructor() {
    this.synthesis = window.speechSynthesis;
    this.loadVoices();
    
    // Handle dynamic voice loading
    if (speechSynthesis.onvoiceschanged !== undefined) {
      speechSynthesis.onvoiceschanged = this.loadVoices.bind(this);
    }
  }

  static getInstance(): SpeechManager {
    if (!SpeechManager.instance) {
      SpeechManager.instance = new SpeechManager();
    }
    return SpeechManager.instance;
  }

  private loadVoices(): void {
    this.voices = this.synthesis.getVoices();
  }

  speak(text: string, voiceSettings?: { pitch?: number; rate?: number; voice?: string }): void {
    if (this.speaking) {
      this.synthesis.cancel();
    }

    const utterance = new SpeechSynthesisUtterance(text);
    
    if (voiceSettings) {
      utterance.pitch = voiceSettings.pitch ?? 1;
      utterance.rate = voiceSettings.rate ?? 1;
      
      if (voiceSettings.voice) {
        const selectedVoice = this.voices.find(v => v.name === voiceSettings.voice);
        if (selectedVoice) {
          utterance.voice = selectedVoice;
        }
      }
    }

    utterance.onstart = () => {
      this.speaking = true;
    };

    utterance.onend = () => {
      this.speaking = false;
    };

    this.synthesis.speak(utterance);
  }

  stop(): void {
    if (this.speaking) {
      this.synthesis.cancel();
      this.speaking = false;
    }
  }

  getVoices(): SpeechSynthesisVoice[] {
    return this.voices;
  }

  isSupported(): boolean {
    return 'speechSynthesis' in window;
  }
}