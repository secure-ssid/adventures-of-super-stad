// Procedural sound generator using Web Audio API
// No audio files needed - generates retro-style sounds

export default class SoundGenerator {
  constructor(scene) {
    this.scene = scene;
    this.audioContext = null;
    this.enabled = true;

    // Try to create audio context
    try {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    } catch (e) {
      console.warn('Web Audio API not supported');
      this.enabled = false;
    }
  }

  // Resume audio context (required after user interaction)
  resume() {
    if (this.audioContext && this.audioContext.state === 'suspended') {
      this.audioContext.resume();
    }
  }

  // Jump sound - quick upward sweep
  playJump() {
    if (!this.enabled) return;
    this.resume();

    const osc = this.audioContext.createOscillator();
    const gain = this.audioContext.createGain();

    osc.connect(gain);
    gain.connect(this.audioContext.destination);

    osc.type = 'square';
    osc.frequency.setValueAtTime(200, this.audioContext.currentTime);
    osc.frequency.exponentialRampToValueAtTime(600, this.audioContext.currentTime + 0.1);

    gain.gain.setValueAtTime(0.3, this.audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.1);

    osc.start(this.audioContext.currentTime);
    osc.stop(this.audioContext.currentTime + 0.1);
  }

  // Damage sound - harsh buzz
  playDamage() {
    if (!this.enabled) return;
    this.resume();

    const osc = this.audioContext.createOscillator();
    const gain = this.audioContext.createGain();

    osc.connect(gain);
    gain.connect(this.audioContext.destination);

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(150, this.audioContext.currentTime);
    osc.frequency.exponentialRampToValueAtTime(50, this.audioContext.currentTime + 0.2);

    gain.gain.setValueAtTime(0.4, this.audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.2);

    osc.start(this.audioContext.currentTime);
    osc.stop(this.audioContext.currentTime + 0.2);
  }

  // Collect sound - soft subtle ping (much quieter)
  playCollect() {
    if (!this.enabled) return;
    this.resume();

    // Single soft ping instead of arpeggio
    const osc = this.audioContext.createOscillator();
    const gain = this.audioContext.createGain();

    osc.connect(gain);
    gain.connect(this.audioContext.destination);

    osc.type = 'sine';
    osc.frequency.setValueAtTime(880, this.audioContext.currentTime); // A5 - single note

    // Very quiet and short
    gain.gain.setValueAtTime(0.06, this.audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 0.08);

    osc.start(this.audioContext.currentTime);
    osc.stop(this.audioContext.currentTime + 0.08);
  }

  // Shield activate sound - power up feel
  playShield() {
    if (!this.enabled) return;
    this.resume();

    const osc = this.audioContext.createOscillator();
    const gain = this.audioContext.createGain();

    osc.connect(gain);
    gain.connect(this.audioContext.destination);

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(300, this.audioContext.currentTime);
    osc.frequency.exponentialRampToValueAtTime(800, this.audioContext.currentTime + 0.15);
    osc.frequency.exponentialRampToValueAtTime(600, this.audioContext.currentTime + 0.3);

    gain.gain.setValueAtTime(0.3, this.audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.3);

    osc.start(this.audioContext.currentTime);
    osc.stop(this.audioContext.currentTime + 0.3);
  }

  // Shield block sound
  playShieldBlock() {
    if (!this.enabled) return;
    this.resume();

    const osc = this.audioContext.createOscillator();
    const gain = this.audioContext.createGain();

    osc.connect(gain);
    gain.connect(this.audioContext.destination);

    osc.type = 'square';
    osc.frequency.setValueAtTime(800, this.audioContext.currentTime);
    osc.frequency.exponentialRampToValueAtTime(200, this.audioContext.currentTime + 0.15);

    gain.gain.setValueAtTime(0.25, this.audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.15);

    osc.start(this.audioContext.currentTime);
    osc.stop(this.audioContext.currentTime + 0.15);
  }

  // Level complete sound - victory fanfare
  playLevelComplete() {
    if (!this.enabled) return;
    this.resume();

    const notes = [523, 659, 784, 1047]; // C5, E5, G5, C6

    notes.forEach((freq, i) => {
      const osc = this.audioContext.createOscillator();
      const gain = this.audioContext.createGain();

      osc.connect(gain);
      gain.connect(this.audioContext.destination);

      osc.type = 'square';
      osc.frequency.setValueAtTime(freq, this.audioContext.currentTime + i * 0.12);

      const startTime = this.audioContext.currentTime + i * 0.12;
      gain.gain.setValueAtTime(0.2, startTime);
      gain.gain.setValueAtTime(0.2, startTime + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.01, startTime + 0.25);

      osc.start(startTime);
      osc.stop(startTime + 0.25);
    });
  }

  // Game over sound - sad descending tone
  playGameOver() {
    if (!this.enabled) return;
    this.resume();

    const osc = this.audioContext.createOscillator();
    const gain = this.audioContext.createGain();

    osc.connect(gain);
    gain.connect(this.audioContext.destination);

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(400, this.audioContext.currentTime);
    osc.frequency.exponentialRampToValueAtTime(100, this.audioContext.currentTime + 0.5);

    gain.gain.setValueAtTime(0.3, this.audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.5);

    osc.start(this.audioContext.currentTime);
    osc.stop(this.audioContext.currentTime + 0.5);
  }

  // Start running sound
  playStart() {
    if (!this.enabled) return;
    this.resume();

    const osc = this.audioContext.createOscillator();
    const gain = this.audioContext.createGain();

    osc.connect(gain);
    gain.connect(this.audioContext.destination);

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(200, this.audioContext.currentTime);
    osc.frequency.exponentialRampToValueAtTime(400, this.audioContext.currentTime + 0.08);

    gain.gain.setValueAtTime(0.2, this.audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.08);

    osc.start(this.audioContext.currentTime);
    osc.stop(this.audioContext.currentTime + 0.08);
  }

  // Eye laser sound - sci-fi zap
  playLaser() {
    if (!this.enabled) return;
    this.resume();

    const osc = this.audioContext.createOscillator();
    const gain = this.audioContext.createGain();

    osc.connect(gain);
    gain.connect(this.audioContext.destination);

    osc.type = 'sawtooth';
    // High frequency sweep down for laser effect
    osc.frequency.setValueAtTime(1200, this.audioContext.currentTime);
    osc.frequency.exponentialRampToValueAtTime(200, this.audioContext.currentTime + 0.15);

    gain.gain.setValueAtTime(0.15, this.audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.15);

    osc.start(this.audioContext.currentTime);
    osc.stop(this.audioContext.currentTime + 0.15);
  }

  // Background music - ambient adventure theme
  startBackgroundMusic() {
    if (!this.enabled) return;
    this.resume();

    // Stop any existing music
    this.stopBackgroundMusic();

    // Flag to track if music is playing
    this.musicPlaying = true;
    this.patternIndex = 0;

    // Musical constants
    const BPM = 120;
    const beatDuration = 60 / BPM; // 0.5 seconds per beat

    // 8-bar chord progression (fire theme - minor key, heroic feel)
    const chordProgression = [
      { bass: 110.00, chord: [220, 261.63, 329.63] },  // Am
      { bass: 130.81, chord: [261.63, 329.63, 392] },  // C
      { bass: 146.83, chord: [293.66, 349.23, 440] },  // Dm
      { bass: 164.81, chord: [329.63, 392, 493.88] },  // Em
      { bass: 130.81, chord: [261.63, 329.63, 392] },  // C
      { bass: 146.83, chord: [293.66, 349.23, 440] },  // Dm
      { bass: 164.81, chord: [329.63, 392, 493.88] },  // Em
      { bass: 110.00, chord: [220, 261.63, 329.63] },  // Am (resolve)
    ];

    // Create a pattern that repeats
    const playPattern = () => {
      if (!this.musicPlaying) return;

      const currentTime = this.audioContext.currentTime;
      const currentChord = chordProgression[this.patternIndex % chordProgression.length];

      // Soft pad chord (warm background)
      currentChord.chord.forEach((freq, i) => {
        const pad = this.audioContext.createOscillator();
        const padGain = this.audioContext.createGain();
        const filter = this.audioContext.createBiquadFilter();

        pad.connect(filter);
        filter.connect(padGain);
        padGain.connect(this.audioContext.destination);

        pad.type = 'sine';
        pad.frequency.setValueAtTime(freq, currentTime);

        // Low-pass filter for warmth
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(800, currentTime);

        // Gentle volume envelope
        padGain.gain.setValueAtTime(0, currentTime);
        padGain.gain.linearRampToValueAtTime(0.025, currentTime + 0.1);
        padGain.gain.setValueAtTime(0.025, currentTime + beatDuration * 1.8);
        padGain.gain.linearRampToValueAtTime(0, currentTime + beatDuration * 2);

        pad.start(currentTime);
        pad.stop(currentTime + beatDuration * 2);
      });

      // Subtle bass pulse
      const bass = this.audioContext.createOscillator();
      const bassGain = this.audioContext.createGain();

      bass.connect(bassGain);
      bassGain.connect(this.audioContext.destination);

      bass.type = 'sine';
      bass.frequency.setValueAtTime(currentChord.bass, currentTime);

      bassGain.gain.setValueAtTime(0.04, currentTime);
      bassGain.gain.exponentialRampToValueAtTime(0.01, currentTime + beatDuration * 1.5);

      bass.start(currentTime);
      bass.stop(currentTime + beatDuration * 1.5);

      // Occasional melodic accent (every other bar)
      if (this.patternIndex % 2 === 0) {
        const accentFreq = currentChord.chord[2] * 2; // High octave of top note
        const accent = this.audioContext.createOscillator();
        const accentGain = this.audioContext.createGain();

        accent.connect(accentGain);
        accentGain.connect(this.audioContext.destination);

        accent.type = 'triangle';
        accent.frequency.setValueAtTime(accentFreq, currentTime + beatDuration);

        accentGain.gain.setValueAtTime(0.015, currentTime + beatDuration);
        accentGain.gain.exponentialRampToValueAtTime(0.001, currentTime + beatDuration + 0.3);

        accent.start(currentTime + beatDuration);
        accent.stop(currentTime + beatDuration + 0.3);
      }

      this.patternIndex++;

      // Schedule next chord (2 beats = 1 second at 120 BPM)
      this.musicTimeout = setTimeout(playPattern, beatDuration * 2 * 1000);
    };

    // Start the pattern
    playPattern();
  }

  // Stop background music
  stopBackgroundMusic() {
    this.musicPlaying = false;
    if (this.musicTimeout) {
      clearTimeout(this.musicTimeout);
      this.musicTimeout = null;
    }
  }

  // Toggle mute for all sounds
  toggleMute() {
    this.enabled = !this.enabled;
    if (!this.enabled) {
      this.stopBackgroundMusic();
    }
    return this.enabled; // Return new state
  }
}
