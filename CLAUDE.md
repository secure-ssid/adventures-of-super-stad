# Adventures of Super Stad

A side-scrolling endless runner game built with Phaser 3.

## Quick Reference

```bash
npm run dev      # Start development server (Vite)
npm run build    # Build for production
npm run preview  # Preview production build
```

## Project Overview

**Genre**: Side-scrolling endless runner
**Engine**: Phaser 3 with Arcade Physics
**Build Tool**: Vite
**Current Phase**: V1 MVP (Fire theme, 3 levels)

### V1 Scope
- 1 character (Super Stad) with fixed 3 hearts
- Run, jump, slide controls
- 3 Fire theme levels with increasing difficulty
- Obstacles: Spikes (1 dmg), Lava (2 dmg), Pits (instant death)
- Power-ups: Heart (heal), Shield (block 1 hit)
- 4 screens: Title, Gameplay, Game Over, Level Complete

## Architecture

### Scene Flow
```
BootScene → TitleScene → LevelSelectScene → GameScene → LevelCompleteScene
                                              ↓
                                        GameOverScene
```

### Key Files
| File | Purpose |
|------|---------|
| `src/main.js` | Phaser config, game initialization |
| `src/scenes/GameScene.js` | Core gameplay loop, collisions |
| `src/objects/Player.js` | Movement, health, damage handling |
| `src/config/levels.js` | Level definitions, obstacle placement |
| `src/utils/TouchControls.js` | Mobile swipe detection |
| `src/utils/SoundGenerator.js` | Procedural sound effects |

### Game Configuration
- **Canvas**: 800×400 pixels
- **Gravity**: 800 (arcade physics)
- **Scroll Speed**: ~200 pixels/sec (varies by level)
- **Ground Y**: 340 (player stands here)

## Coding Conventions

### Phaser Patterns
```javascript
// Scene class structure
export default class ExampleScene extends Phaser.Scene {
  constructor() {
    super({ key: 'ExampleScene' });
  }

  preload() { /* asset loading */ }
  create() { /* object creation */ }
  update() { /* game loop */ }
}
```

### Naming
- Scenes: PascalCase with `Scene` suffix (e.g., `GameScene`)
- Objects: PascalCase (e.g., `Player`)
- Methods: camelCase (e.g., `handleDamage`)
- Config files: lowercase (e.g., `levels.js`)

### Level Data Format
```javascript
{
  id: 1,
  name: "Fire Level 1",
  theme: "fire",
  length: 3000,        // pixels
  scrollSpeed: 200,    // pixels/sec
  obstacles: [{ type: "spike", x: 500 }, ...],
  powerups: [{ type: "heart", x: 1000 }, ...]
}
```

## Development Guidelines

### When Adding Features
1. Check GAME_PLAN.md for V1 vs Full Vision scope
2. V1 features are minimal - avoid over-engineering
3. Test on both desktop (keyboard) and mobile (touch)

### Visual Debugging
Set `arcade.debug: true` in `src/main.js` to see collision boxes.

### Adding New Scenes
1. Create `src/scenes/NewScene.js`
2. Import in `src/main.js`
3. Add to scene array in config

### Adding New Objects
1. Create class in `src/objects/`
2. Extend Phaser.GameObjects or Phaser.Physics.Arcade.Sprite
3. Import and instantiate in relevant scene

## Assets

```
assets/
├── sprites/      # Character, obstacles, portal sprites
├── backgrounds/  # Fire theme background
└── audio/        # SFX (currently procedural via SoundGenerator)
```

### Current Placeholder Art
Using Phaser graphics (rectangles/shapes) until real sprites are added.

## Testing Checklist

Before considering a feature complete:
- [ ] Works with keyboard controls (arrow keys)
- [ ] Works with touch controls (swipe up/down)
- [ ] Collisions detect properly
- [ ] No console errors
- [ ] Responsive at different window sizes

## Known Issues / TODOs

- Level select should show locked/unlocked status
- Touch controls need sensitivity tuning
- Portal collision sometimes triggers multiple times

## Full Vision Reference

See `GAME_PLAN.md` for the complete game design including:
- 3 playable characters
- 15 levels across Fire/Water/Rain themes
- Stat system with point allocation
- 9 power-ups
- Boss fights
- Coin economy and shop
