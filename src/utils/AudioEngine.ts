
class AudioEngine {
  private audioContext: AudioContext | null = null;
  private gainNode: GainNode | null = null;

  constructor() {
    this.initializeAudioContext();
  }

  private async initializeAudioContext() {
    try {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      this.gainNode = this.audioContext.createGain();
      this.gainNode.connect(this.audioContext.destination);
      this.gainNode.gain.setValueAtTime(0.3, this.audioContext.currentTime);
    } catch (error) {
      console.error('Failed to initialize audio context:', error);
    }
  }

  private getNoteFrequency(note: string): number {
    const noteMap: { [key: string]: number } = {
      'C4': 261.63, 'C#4': 277.18, 'D4': 293.66, 'D#4': 311.13, 'E4': 329.63,
      'F4': 349.23, 'F#4': 369.99, 'G4': 392.00, 'G#4': 415.30, 'A4': 440.00,
      'A#4': 466.16, 'B4': 493.88, 'C5': 523.25, 'C#5': 554.37, 'D5': 587.33,
      'D#5': 622.25, 'E5': 659.25, 'F5': 698.46, 'F#5': 739.99, 'G5': 783.99,
      'G#5': 830.61, 'A5': 880.00, 'A#5': 932.33, 'B5': 987.77
    };
    return noteMap[note] || 440;
  }

  playNote(note: string, instrument: string = 'piano', duration: number = 0.5) {
    if (!this.audioContext || !this.gainNode) {
      console.warn('Audio context not initialized');
      return;
    }

    const frequency = this.getNoteFrequency(note);
    const oscillator = this.audioContext.createOscillator();
    const noteGain = this.audioContext.createGain();

    oscillator.connect(noteGain);
    noteGain.connect(this.gainNode);

    // Set instrument-specific waveform and characteristics
    switch (instrument) {
      case 'piano':
        oscillator.type = 'triangle';
        // Add some harmonics for piano-like sound
        break;
      case 'organ':
        oscillator.type = 'square';
        break;
      case 'synth':
        oscillator.type = 'sawtooth';
        break;
      default:
        oscillator.type = 'sine';
    }

    oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);

    // ADSR envelope
    const attackTime = 0.1;
    const decayTime = 0.2;
    const sustainLevel = 0.6;
    const releaseTime = 0.3;

    const now = this.audioContext.currentTime;
    noteGain.gain.setValueAtTime(0, now);
    noteGain.gain.linearRampToValueAtTime(0.8, now + attackTime);
    noteGain.gain.linearRampToValueAtTime(sustainLevel, now + attackTime + decayTime);
    noteGain.gain.setValueAtTime(sustainLevel, now + duration - releaseTime);
    noteGain.gain.linearRampToValueAtTime(0, now + duration);

    oscillator.start(now);
    oscillator.stop(now + duration);

    console.log(`Playing ${note} on ${instrument} at ${frequency}Hz`);
  }

  cleanup() {
    if (this.audioContext) {
      this.audioContext.close();
    }
  }
}

export default AudioEngine;
