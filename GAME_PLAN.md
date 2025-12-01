# Adventures of Super Stad - Game Design Plan

## Overview
A side-scrolling endless runner game where players control one of three characters, dodging obstacles, collecting power-ups, and defeating bosses across themed levels.

## Technology Stack
- **Game Engine**: Phaser 3 (JavaScript game framework)
- **Physics**: Phaser Arcade Physics
- **Mobile Wrapper**: Capacitor (for future iOS deployment)
- **Art Style**: Cartoon vector graphics
- **Audio**: Orchestral/Adventure music

---

# V1 MVP - BUILD THIS FIRST

> **Goal**: Validate core gameplay in 2-3 weeks. Is dodging obstacles fun?

## V1 Scope (Minimal Viable Fun)

| Feature | V1 MVP | Full Vision |
|---------|--------|-------------|
| Characters | 1 (Super Stad) | 3 |
| Themes | 1 (Fire) | 3 |
| Levels | 3 | 15 |
| Power-ups | 2 (Heart, Shield) | 9 |
| Screens | 4 | 12 |
| Stats | None (fixed) | 5 stats + allocation |
| Boss fights | Simple (reach portal) | Button mashing |
| Economy | None | Coins + shop |
| Save | localStorage | Local + cloud |

## V1 Features

### Include in V1
- ✅ Super Stad character (fixed stats: 3 hearts)
- ✅ Run, jump, slide controls
- ✅ 3 Fire theme levels (increasing difficulty)
- ✅ 3 obstacles: Spikes (1 dmg), Lava (2 dmg), Pits (death)
- ✅ 2 power-ups: Heart (heal), Shield (block 1 hit)
- ✅ Portal at end of level
- ✅ 4 screens: Title, Gameplay, Game Over, Level Complete
- ✅ Basic HUD: Hearts, progress bar
- ✅ Arrow keys (browser) / Swipe (touch)
- ✅ localStorage save (level progress)

### Defer to V2+
- ❌ Character selection (Rowdy Rowan, Hel-Cat)
- ❌ Stat system & allocation
- ❌ Attack button & combat
- ❌ Whop enemies (just obstacles for now)
- ❌ Boss fights (portal = level complete)
- ❌ Star rating system
- ❌ Coins & economy
- ❌ Shop, Stats screen
- ❌ Water & Rain themes
- ❌ 7 additional power-ups
- ❌ Achievements, Leaderboard
- ❌ Cloud save
- ❌ Monetization

## V1 Project Structure

```
adventures-of-super-stad/
├── src/
│   ├── scenes/
│   │   ├── BootScene.js          # Asset loading
│   │   ├── TitleScene.js         # Play button
│   │   ├── GameScene.js          # Core gameplay
│   │   ├── GameOverScene.js      # Retry
│   │   └── LevelCompleteScene.js # Next level
│   ├── objects/
│   │   ├── Player.js             # Movement, health
│   │   └── Obstacle.js           # Spikes, lava, pits
│   ├── config/
│   │   └── levels.js             # 3 level definitions
│   ├── ui/
│   │   └── HUD.js                # Hearts, progress
│   └── main.js                   # Phaser config
├── assets/
│   ├── sprites/                  # Player, obstacles, portal
│   ├── backgrounds/              # Fire theme bg
│   └── audio/                    # Basic SFX
├── index.html
└── package.json
```

## V1 Level Data Format

```javascript
// config/levels.js
export const LEVELS = [
  {
    id: 1,
    name: "Fire Level 1",
    theme: "fire",
    length: 3000,           // pixels
    scrollSpeed: 200,       // pixels/sec
    obstacles: [
      { type: "spike", x: 500 },
      { type: "spike", x: 800 },
      { type: "lava", x: 1200 },
      { type: "pit", x: 1800 },
      { type: "spike", x: 2200 },
      { type: "lava", x: 2600 },
    ],
    powerups: [
      { type: "heart", x: 1000 },
      { type: "shield", x: 2000 },
    ]
  },
  // Level 2 & 3 with more obstacles, faster speed
];
```

## V1 Implementation Order

### Week 1: Core Loop
1. [ ] Initialize Phaser 3 project with Arcade Physics
2. [ ] Create Player class (run, jump, slide)
3. [ ] Implement ground & basic scrolling
4. [ ] Add placeholder rectangle sprites
5. [ ] Create 3 obstacle types with collision
6. [ ] Health system (3 hearts, damage, death)
7. [ ] Game Over → Retry flow

### Week 2: Levels & Polish
8. [ ] Level data loading from config
9. [ ] Build 3 levels with obstacle placement
10. [ ] Portal at end → Level Complete screen
11. [ ] Level unlock progression (beat 1 to play 2)
12. [ ] Title screen with Play button
13. [ ] HUD (hearts, progress bar)
14. [ ] 2 power-ups (Heart, Shield)
15. [ ] localStorage save (unlocked levels)

### Week 3: Playtest & Iterate
16. [ ] Add real sprites (or better placeholders)
17. [ ] Basic sound effects (jump, damage, collect)
18. [ ] Tune difficulty (obstacle spacing, timing)
19. [ ] Touch controls for mobile browser
20. [ ] Get 5-10 people to playtest
21. [ ] Iterate based on feedback

## V1 Success Criteria

**Ship when you can answer YES to:**
- [ ] Can complete all 3 levels?
- [ ] Is jumping/sliding responsive?
- [ ] Do obstacles feel fair (not cheap deaths)?
- [ ] Is there a difficulty curve?
- [ ] Do 3+ playtesters say "that was fun"?

**If YES**: Add features from full vision
**If NO**: Fix core gameplay before adding anything

---

# FULL VISION (Build After V1 Validated)

*Everything below is the complete game design. Build incrementally after V1 ships.*

---

## 1. Characters

### Playable Characters
| Character | Gender | Description |
|-----------|--------|-------------|
| Super Stad | Boy | The main hero |
| Rowdy Rowan | Boy | Adventurous sidekick |
| Hel-Cat | Girl | Fierce warrior |

### Character Stats (All Start Equal)
- All characters have identical base stats
- Players allocate stat points to customize their build
- Start with **10 stat points** to allocate

### Stat System (5 Stats)
| Stat | Effect |
|------|--------|
| Speed | Running speed |
| Health | Max hearts (Base 3, Max 10) |
| Jump | Jump height |
| Power-up Duration | How long power-ups last |
| Luck | Item spawn rates |

### Progression
- Earn **2 stat points** per level completed
- Can reallocate points (in Stats/Upgrades screen)

---

## 2. Core Gameplay Mechanics

### Movement & Controls
| Platform | Control |
|----------|---------|
| iOS | Swipe up = jump, Swipe down = slide |
| Browser | Arrow keys (customizable) |

### Actions
- **Run**: Tap anywhere to start/stop running
- **Stop**: Tap anywhere (safe stop - everything pauses)
- **Jump**: Swipe up (iOS) / Up arrow (browser)
- **Slide**: Swipe down (iOS) / Down arrow (browser)
- **Attack**: Dedicated attack button on screen

### Attack System
- Press attack button to attack enemies
- Defeating enemies drops **coins**
- Cannot attack obstacles (spikes, lava, pits)

---

## 3. Obstacles & Hazards

### Obstacle Types
| Obstacle | Damage | Avoidance |
|----------|--------|-----------|
| Spikes | 1 heart | Jump or slide |
| Lava | 2 hearts | Jump over |
| Pits | Instant death | Jump over |
| Whop Enemy (walking) | 1 heart | Jump, slide, or attack |

### Boss Fight
- **Whop Boss** appears at end of each level
- Screen stops for boss fight
- **Mechanic**: Button mashing to defeat
- After boss: Portal appears (black stone with purple energy)

### Level Exit
- Black stone portal with purple energy
- Touch portal to complete level

---

## 4. Level Themes

### Three Themes (5 Levels Each = 15 Total)

#### Fire Theme (Levels 1-5)
| Unique Obstacles | Effect |
|------------------|--------|
| Lava pits | 2 heart damage |
| Fire walls | Must slide under |
| Color palette: Reds, oranges, yellows |

#### Water Theme (Levels 6-10)
| Unique Obstacles | Effect |
|------------------|--------|
| Ice patches | Slippery movement |
| Water currents | Push player around |
| Color palette: Blues, teals, white |

#### Rain Theme (Levels 11-15)
| Unique Obstacles | Effect |
|------------------|--------|
| Lightning strikes | Must dodge |
| Mud | Slows movement |
| Color palette: Grays, purples, dark blues |

---

## 5. Power-ups & Items

### Power-up Duration
- Base duration: **8-10 seconds**
- Modified by Power-up Duration stat

### All Power-ups (9 Total)
| Power-up | Effect | Duration |
|----------|--------|----------|
| Heart | Restore 1 heart | Instant |
| Cape | Auto-fly above all ground obstacles | 8-10 sec |
| Umbrella | Float down slowly + block from above | 8-10 sec |
| Shield | Block up to 3 hits | Until 3 hits |
| Spring Shoes | Higher jumps | 8-10 sec |
| Snorkel | Move faster through water currents | 8-10 sec |
| Magnet | Attract nearby coins automatically | 8-10 sec |
| Speed Boost | Run faster | 8-10 sec |
| Invincibility | Immune to damage, destroy obstacles | 8-10 sec |

---

## 6. Health System

| Aspect | Value |
|--------|-------|
| Base Hearts | 3 |
| Max Hearts | 10 (via stat points) |
| On Death | Restart level from beginning |

### Damage Values
- Spikes: 1 heart
- Lava: 2 hearts
- Whop enemy: 1 heart
- Pits: Instant death (all hearts)

---

## 7. Progression System

### Star System
- Earn **1-3 stars** per level completion
- Stars based on combo of:
  - **Time**: How fast you complete the level
  - **Hearts**: How many hearts remaining
  - **Coins**: How many coins collected

### Unlock Requirement
- **Cumulative stars** needed to unlock new levels
- Example: Need 5 total stars to unlock Level 3

### Level Completion Rewards
- **2 stat points** per level completed
- **Coins** collected during level
- **Stars** earned (1-3)

---

## 8. Coins & Economy

### Earning Coins
- Collect during levels
- Defeating Whop enemies

### Spending Coins
- **Power-ups**: Buy power-ups before starting a level
- **Cosmetics**: Character skins, effects, accessories
- **Stat points**: Purchase additional stat points

---

## 9. Screens & UI

### All Screens
1. **Title Screen** - Logo, Play button
2. **Character Select** - Choose Super Stad, Rowdy Rowan, or Hel-Cat
3. **Level Select** - 15 levels across 3 themes with star display
4. **Stats/Upgrades** - Allocate stat points
5. **Shop** - Buy power-ups, cosmetics, stat points
6. **Gameplay** - Main game screen
7. **Game Over** - Death screen with retry option
8. **Level Complete** - Stars earned, rewards
9. **Settings** - Sound, controls, account
10. **Achievements** - Achievement list
11. **Leaderboard** - High scores
12. **Tutorial** - How to play

### Gameplay HUD (Minimal)
- Hearts display (top left)
- Progress bar (top)

---

## 10. Audio

### Music
- **Style**: Orchestral/Adventure
- **Tracks needed**:
  - Menu theme
  - Fire theme gameplay
  - Water theme gameplay
  - Rain theme gameplay
  - Boss fight theme
  - Victory jingle
  - Game over jingle

### Sound Effects (Important Only)
- Take damage
- Collect coin
- Collect power-up
- Power-up activate
- Power-up expire
- Defeat enemy
- Boss defeat
- Level complete

---

## 11. Save System

### Local Storage (Default)
- Saves automatically on device
- Stores: levels completed, stars, coins, stat allocation, unlocks

### Cloud Save (Optional)
- Requires account creation
- Syncs across devices
- Optional feature for players who want it

---

## 12. Monetization

### Model: Free + IAP

### In-App Purchases
| Item | Type |
|------|------|
| Coin packs | Buy coins with real money |
| Exclusive cosmetics | Character skins only available for purchase |

### Free Players Can
- Play all 15 levels
- Earn all coins through gameplay
- Unlock basic cosmetics with earned coins
- Full game experience

---

## 13. Platform Strategy

### Phase 1: Web (Browser)
- Build with Phaser 3
- Test and iterate
- Gather player feedback

### Phase 2: iOS (Future)
- Wrap with Capacitor
- Submit to App Store
- Add IAP integration

---

## 14. Technical Architecture

### Project Structure
```
adventures-of-super-stad/
├── src/
│   ├── scenes/
│   │   ├── BootScene.js
│   │   ├── TitleScene.js
│   │   ├── CharacterSelectScene.js
│   │   ├── LevelSelectScene.js
│   │   ├── StatsScene.js
│   │   ├── ShopScene.js
│   │   ├── GameScene.js
│   │   ├── BossFightScene.js
│   │   ├── GameOverScene.js
│   │   ├── LevelCompleteScene.js
│   │   ├── SettingsScene.js
│   │   ├── AchievementsScene.js
│   │   ├── LeaderboardScene.js
│   │   └── TutorialScene.js
│   ├── objects/
│   │   ├── Player.js
│   │   ├── Obstacle.js
│   │   ├── Enemy.js
│   │   ├── Boss.js
│   │   ├── PowerUp.js
│   │   └── Coin.js
│   ├── managers/
│   │   ├── SaveManager.js
│   │   ├── AudioManager.js
│   │   ├── InputManager.js
│   │   └── LevelManager.js
│   ├── config/
│   │   ├── characters.js
│   │   ├── levels.js
│   │   ├── powerups.js
│   │   ├── obstacles.js
│   │   └── achievements.js
│   ├── ui/
│   │   ├── HUD.js
│   │   ├── Button.js
│   │   └── ProgressBar.js
│   └── main.js
├── assets/
│   ├── sprites/
│   ├── backgrounds/
│   ├── ui/
│   └── audio/
├── index.html
├── package.json
└── GAME_PLAN.md
```

---

## 15. Implementation Phases

### Phase 1: Core Foundation
- [ ] Initialize Phaser 3 project
- [ ] Create basic game loop
- [ ] Implement player movement (run, stop, jump, slide)
- [ ] Add placeholder sprites
- [ ] Set up scene management
- [ ] Basic HUD (hearts, progress)

### Phase 2: Obstacles & Combat
- [ ] Implement obstacle spawning (spikes, lava, pits)
- [ ] Add collision detection
- [ ] Create health system
- [ ] Implement attack button and enemy combat
- [ ] Add coins and collection

### Phase 3: Level Structure
- [ ] Create level data structure
- [ ] Build first Fire theme level
- [ ] Implement level completion
- [ ] Add boss fight (button mashing)
- [ ] Create portal exit

### Phase 4: Power-ups
- [ ] Create power-up base system
- [ ] Implement all 9 power-ups
- [ ] Add visual indicators for active power-ups
- [ ] Power-up spawning in levels

### Phase 5: Progression
- [ ] Star earning system
- [ ] Level unlocking (cumulative stars)
- [ ] Stat point system
- [ ] Save/load with localStorage

### Phase 6: All Themes
- [ ] Create Water theme levels (6-10)
- [ ] Create Rain theme levels (11-15)
- [ ] Theme-specific obstacles and effects

### Phase 7: Menus & UI
- [ ] Title screen
- [ ] Character select
- [ ] Level select with stars
- [ ] Stats/Upgrades screen
- [ ] Shop screen
- [ ] Settings screen

### Phase 8: Polish
- [ ] All character animations
- [ ] Sound effects
- [ ] Music tracks
- [ ] Particle effects
- [ ] Achievements system
- [ ] Tutorial

### Phase 9: Mobile Prep
- [ ] Touch controls (swipe)
- [ ] Responsive scaling
- [ ] Capacitor integration
- [ ] iOS build testing

---

## Design Decisions Summary

| Category | Decision |
|----------|----------|
| Art Style | Cartoon vector |
| Characters | 3 characters, equal base stats |
| Stats | 5 stats, 10 starting points, 2 per level |
| Controls | Swipe (iOS), Arrow keys (browser) |
| Gameplay | Single lane, jump/slide/attack |
| Stopping | Safe stop (pauses everything) |
| Power-ups | 9 power-ups, 8-10 sec duration |
| Health | Base 3, Max 10 hearts |
| Death | Restart level |
| Levels | 15 levels (5 per theme) |
| Stars | 1-3 per level (time/hearts/coins) |
| Boss | Button mashing, end of each level |
| Coins | From enemies, buy power-ups/cosmetics/stats |
| Save | Local + optional cloud |
| Monetization | Free + IAP (coins, exclusive cosmetics) |
| Platform | Web first, iOS later |
| Music | Orchestral/Adventure |
| HUD | Minimal (hearts, progress) |
