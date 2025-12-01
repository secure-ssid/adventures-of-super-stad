# Art & Music Resources

This document explains how all visual assets and audio are created for Adventures of Super Stad.

## Overview

The game uses **no external image files**. All sprites, backgrounds, and UI elements are procedurally generated at runtime using Phaser 3's Graphics API. This approach has several benefits:

- Zero asset loading time for images
- Tiny game file size
- Complete control over visual style
- Easy to modify colors and shapes

## Procedural Graphics System

### How It Works

All graphics are created in `src/scenes/BootScene.js` using Phaser's `this.make.graphics()` API:

```javascript
// Create an off-screen graphics canvas
const graphics = this.make.graphics({ x: 0, y: 0, add: false });

// Draw shapes with colors
graphics.fillStyle(0xff6600);  // Orange (hex color)
graphics.fillCircle(20, 20, 15);
graphics.fillRect(10, 30, 20, 10);
graphics.fillTriangle(5, 40, 35, 40, 20, 10);

// Convert to a texture usable as a sprite
graphics.generateTexture('mySprite', 40, 50);
```

### Key Drawing Methods

| Method | Description | Example |
|--------|-------------|---------|
| `fillStyle(color, alpha)` | Set fill color | `fillStyle(0xff0000, 0.8)` |
| `fillRect(x, y, w, h)` | Rectangle | Body, ground tiles |
| `fillCircle(x, y, r)` | Circle | Eyes, coins, particles |
| `fillTriangle(x1,y1,x2,y2,x3,y3)` | Triangle | Spikes, flames, arrows |
| `fillEllipse(x, y, w, h)` | Oval | Clouds, body shapes |
| `fillRoundedRect(x,y,w,h,r)` | Rounded rect | Buttons, UI panels |
| `lineStyle(width, color)` | Line stroke | Cracks, details |
| `lineBetween(x1,y1,x2,y2)` | Draw line | Cracks, lightning |
| `fillGradientStyle(tl,tr,bl,br)` | Gradient fill | Sky backgrounds |

### Color Tips

- Use hex format: `0xRRGGBB`
- Add transparency with alpha: `fillStyle(0xff0000, 0.5)` (50% red)
- Build depth with layers: dark base -> mid color -> highlights
- Glows: Use low-alpha larger shapes behind bright cores

## Asset Categories

### Characters

**Super Stad (Player)**
- Size: 45x60 pixels
- Colors: Black suit (`0x1a1a1a`), yellow accents (`0xffcc00`)
- Features: Cape, domino mask, "S" logo on chest
- Slide sprite: 58x24 (horizontal dive pose)

### Enemies

| Enemy | Size | Theme | Description |
|-------|------|-------|-------------|
| Whop | 45x50 | Fire | Volcanic fire demon with lava cracks |
| Jellyfish | 45x50 | Water | Glowing translucent creature |
| Storm Slime | 45x50 | Rain | Electric purple creature |

### Bosses

| Boss | Size | Theme | Key Features |
|------|------|-------|--------------|
| Inferno Golem | 120x145 | Fire | Lava cracks, glowing core, horns |
| Kraken | 130x130 | Water | 6 tentacles, giant eyes, beak |
| Storm Titan | 120x155 | Rain | Lightning crown, cloud body |

### Obstacles

**Fire Theme:**
- `spike` (50x40): Obsidian crystals with fire glow
- `lava` (70x25): Bubbling molten pool
- `pit` (100x60): Dark void with subtle lava glow
- `firewall` (30x60): Flame barrier (slide under)

**Water Theme:**
- `urchin` (50x52): Spiky sea urchin with glow
- `whirlpool` (70x25): Swirling water hazard
- `trench` (100x50): Deep underwater void
- `waterjet` (30x60): Geyser shooting up

**Rain Theme:**
- `lightning` (50x45): Electric bolt strike
- `flood` (70x25): Rushing water
- `cliff` (100x50): Dangerous drop with mist
- `thundercloud` (40x55): Low storm cloud

### Backgrounds

Each theme has two parallax layers:
- `bg-far-{theme}` (800x400): Distant scenery
- `bg-mid-{theme}` (800x400): Closer details

### Ground Tiles

- `ground` (64x64): Fire theme volcanic rock
- `ground-water` (64x64): Ocean floor
- `ground-rain` (64x64): Wet stone path

### Power-ups

- `heart-powerup` (36x38): Ruby heart with glow
- `shield-powerup` (36x42): Azure crystal shield
- `coin` (24x24): Gold coin with star emblem

### Particles

Small 6-8px circles for effects:
- `particle-fire` (orange)
- `particle-gold` (yellow sparkle)
- `particle-cyan` (shield)
- `particle-pink` (heart)
- `particle-dust` (landing)
- `particle-water` (bubbles)
- `particle-rain` (purple electric)

## Layering Technique

Build sprites from back to front:

```javascript
// Example: Coin with depth
// 1. Outer glow (largest, transparent)
graphics.fillStyle(0xffaa00, 0.3);
graphics.fillCircle(12, 12, 12);

// 2. Shadow/edge (dark)
graphics.fillStyle(0x996600);
graphics.fillCircle(12, 13, 10);

// 3. Main body (main color)
graphics.fillStyle(0xffcc00);
graphics.fillCircle(12, 12, 10);

// 4. Inner detail (slightly lighter)
graphics.fillStyle(0xffdd44);
graphics.fillCircle(12, 11, 6);

// 5. Highlight (bright spot)
graphics.fillStyle(0xffffcc, 0.9);
graphics.fillCircle(8, 8, 3);
```

## Adding New Sprites

1. Add your drawing code to `BootScene.js` in `createPlaceholderAssets()` or a theme-specific method
2. Call `graphics.generateTexture('texture-name', width, height)`
3. Use in game with `this.add.image(x, y, 'texture-name')` or physics sprites

---

# Audio

## Background Music

**File:** `/public/music/velocity-victory.mp3`

The game uses a single looping music track that plays continuously across all scenes. The music doesn't restart when transitioning between levels - it keeps playing for a seamless experience.

### Implementation

```javascript
// In TitleScene.js and GameScene.js
if (this.cache.audio.exists('music-gameplay')) {
  const existingMusic = this.sound.get('music-gameplay');
  if (!existingMusic || !existingMusic.isPlaying) {
    this.bgMusic = this.sound.add('music-gameplay', {
      loop: true,
      volume: 0.35
    });
    this.bgMusic.play();
  }
}
```

### Getting Music

Sources for game-appropriate music:
- **Envato Elements** (subscription) - Search "8-bit", "retro game", "chiptune"
- **OpenGameArt.org** (free) - CC-licensed game audio
- **FreeSound.org** (free) - Various licenses
- **Incompetech** (free with attribution) - Kevin MacLeod's library

Look for:
- Loopable tracks (seamless loop points)
- Upbeat, energetic tempos
- 120-140 BPM works well for runners

## Procedural Sound Effects

Sound effects are generated in real-time using the **Web Audio API** via `src/utils/SoundGenerator.js`.

### How It Works

```javascript
// Create oscillator and gain nodes
const osc = this.audioContext.createOscillator();
const gain = this.audioContext.createGain();

osc.connect(gain);
gain.connect(this.audioContext.destination);

// Configure sound
osc.type = 'square';  // 'sine', 'square', 'sawtooth', 'triangle'
osc.frequency.setValueAtTime(200, this.audioContext.currentTime);
osc.frequency.exponentialRampToValueAtTime(600, currentTime + 0.1);

// Volume envelope
gain.gain.setValueAtTime(0.3, currentTime);
gain.gain.exponentialRampToValueAtTime(0.01, currentTime + 0.1);

// Play
osc.start(currentTime);
osc.stop(currentTime + 0.1);
```

### Available Sound Effects

| Sound | Method | Character |
|-------|--------|-----------|
| Jump | `playJump()` | Quick upward sweep (200→600 Hz) |
| Damage | `playDamage()` | Harsh descending buzz |
| Collect | `playCollect()` | Soft high ping (880 Hz) |
| Shield | `playShield()` | Power-up sweep |
| Shield Block | `playShieldBlock()` | Metallic deflect |
| Level Complete | `playLevelComplete()` | Victory fanfare (C-E-G-C arpeggio) |
| Game Over | `playGameOver()` | Sad descending tone |
| Start | `playStart()` | Quick start chirp |

### Oscillator Types

- **sine**: Smooth, clean tone (good for UI, ambient)
- **square**: Classic 8-bit game sound (good for actions)
- **sawtooth**: Harsh, buzzy (good for damage, warnings)
- **triangle**: Softer than square (good for melody, subtle effects)

### Sound Design Tips

1. **Short is better**: Most game SFX are 50-200ms
2. **Frequency sweeps**: Use `exponentialRampToValueAtTime()` for pitch changes
3. **Volume envelope**: Always fade out to avoid clicks
4. **Keep it quiet**: Game SFX should be subtle (0.05-0.3 volume)

### Adding New Sounds

Add a method to `SoundGenerator.js`:

```javascript
playMySound() {
  if (!this.enabled) return;
  this.resume();

  const osc = this.audioContext.createOscillator();
  const gain = this.audioContext.createGain();

  osc.connect(gain);
  gain.connect(this.audioContext.destination);

  osc.type = 'square';
  osc.frequency.setValueAtTime(440, this.audioContext.currentTime);

  gain.gain.setValueAtTime(0.2, this.audioContext.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.15);

  osc.start(this.audioContext.currentTime);
  osc.stop(this.audioContext.currentTime + 0.15);
}
```

Then call it: `this.sfx.playMySound()`

---

# Quick Reference

## Color Palette by Theme

### Fire Theme
| Purpose | Color | Hex |
|---------|-------|-----|
| Dark rock | `0x2a1a15` | Dark brown |
| Lava | `0xff4400` | Bright orange |
| Hot spots | `0xffaa00` | Yellow-orange |
| Background | `0x1a0505` | Very dark red |

### Water Theme
| Purpose | Color | Hex |
|---------|-------|-----|
| Deep water | `0x001122` | Very dark blue |
| Ocean floor | `0x1a3344` | Dark teal |
| Coral | `0x004466` | Medium blue |
| Bioluminescence | `0x00ffaa` | Cyan-green |

### Rain Theme
| Purpose | Color | Hex |
|---------|-------|-----|
| Storm sky | `0x1a1a2e` | Dark purple-gray |
| Clouds | `0x252538` | Medium gray |
| Lightning | `0xffff00` | Bright yellow |
| Electric glow | `0xaa88ff` | Purple |

## File Locations

```
src/
├── scenes/
│   └── BootScene.js      # All procedural graphics
├── utils/
│   └── SoundGenerator.js  # Procedural SFX
public/
└── music/
    └── velocity-victory.mp3  # Background music
```
