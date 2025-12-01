import Phaser from 'phaser';
import { createSuperStadSprites, createSuperStadAnimations } from '../utils/CharacterSprites.js';

export default class BootScene extends Phaser.Scene {
  constructor() {
    super('BootScene');
  }

  preload() {
    // Show loading progress
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;

    const progressBar = this.add.graphics();
    const progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(width / 2 - 160, height / 2 - 25, 320, 50);

    const loadingText = this.add.text(width / 2, height / 2 - 50, 'Loading...', {
      font: '20px Arial',
      color: '#ffffff'
    }).setOrigin(0.5);

    this.load.on('progress', (value) => {
      progressBar.clear();
      progressBar.fillStyle(0xff6b35, 1);
      progressBar.fillRect(width / 2 - 150, height / 2 - 15, 300 * value, 30);
    });

    this.load.on('complete', () => {
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
    });

    // Load audio files
    this.load.audio('music-gameplay', '/music/velocity-victory.mp3');

    // Load Super Stad sprite sheets
    this.load.spritesheet('superstad-run-sheet', 'assets/sprites/superstad-run.png', {
      frameWidth: 284,   // 1704px / 6 columns
      frameHeight: 318   // 1908px / 6 rows
    });

    this.load.spritesheet('superstad-jump-sheet', 'assets/sprites/superstad-run-jump.png', {
      frameWidth: 325,   // 1950px / 6 columns
      frameHeight: 382   // 2292px / 6 rows
    });

    // Create placeholder graphics (fallback and other assets)
    this.createPlaceholderAssets();
  }

  createPlaceholderAssets() {
    // ===== PLAYER: SUPER STAD =====
    // Black and yellow superhero with enhanced detail
    const playerGraphics = this.make.graphics({ x: 0, y: 0, add: false });

    // Ground shadow for depth
    playerGraphics.fillStyle(0x000000, 0.3);
    playerGraphics.fillEllipse(21, 58, 24, 6);

    // Cape (behind body) - multi-layered with shading
    playerGraphics.fillStyle(0x996600);
    playerGraphics.fillTriangle(26, 18, 46, 56, 16, 56);
    playerGraphics.fillStyle(0xcc9900);
    playerGraphics.fillTriangle(28, 18, 44, 55, 18, 55);
    playerGraphics.fillStyle(0xffcc00);
    playerGraphics.fillTriangle(30, 20, 40, 52, 20, 52);
    // Cape highlight
    playerGraphics.fillStyle(0xffdd44, 0.6);
    playerGraphics.fillTriangle(31, 22, 36, 48, 22, 50);

    // Boots - black with gold trim
    playerGraphics.fillStyle(0x111111);
    playerGraphics.fillRoundedRect(8, 48, 12, 10, 2);
    playerGraphics.fillRoundedRect(22, 48, 12, 10, 2);
    // Boot gold trim
    playerGraphics.fillStyle(0xffcc00);
    playerGraphics.fillRect(8, 48, 12, 2);
    playerGraphics.fillRect(22, 48, 12, 2);

    // Legs - black with muscle definition
    playerGraphics.fillStyle(0x1a1a1a);
    playerGraphics.fillRect(10, 38, 8, 12);
    playerGraphics.fillRect(24, 38, 8, 12);
    // Leg highlights
    playerGraphics.fillStyle(0x333333, 0.4);
    playerGraphics.fillRect(11, 39, 3, 10);
    playerGraphics.fillRect(25, 39, 3, 10);

    // Body - black suit with depth
    playerGraphics.fillStyle(0x111111);
    playerGraphics.fillRoundedRect(7, 17, 28, 24, 4);
    playerGraphics.fillStyle(0x1a1a1a);
    playerGraphics.fillRoundedRect(8, 18, 26, 22, 3);
    // Body highlight (muscles)
    playerGraphics.fillStyle(0x2a2a2a, 0.5);
    playerGraphics.fillRoundedRect(10, 20, 8, 8, 2);
    playerGraphics.fillRoundedRect(24, 20, 8, 8, 2);

    // Yellow "S" logo on chest with glow
    playerGraphics.fillStyle(0xffaa00, 0.4);
    playerGraphics.fillRoundedRect(13, 19, 16, 18, 3);
    playerGraphics.fillStyle(0xffcc00);
    // Top curve of S
    playerGraphics.fillRoundedRect(14, 20, 14, 4, 2);
    playerGraphics.fillRoundedRect(14, 20, 5, 6, 2);
    // Middle of S
    playerGraphics.fillRoundedRect(15, 25, 12, 4, 2);
    // Bottom curve of S
    playerGraphics.fillRoundedRect(22, 28, 5, 6, 2);
    playerGraphics.fillRoundedRect(14, 32, 14, 4, 2);
    // S highlight
    playerGraphics.fillStyle(0xffee66, 0.7);
    playerGraphics.fillRoundedRect(15, 21, 10, 2, 1);

    // Belt with buckle
    playerGraphics.fillStyle(0xcc9900);
    playerGraphics.fillRect(8, 36, 26, 4);
    playerGraphics.fillStyle(0xffcc00);
    playerGraphics.fillRect(8, 36, 26, 3);
    // Belt buckle
    playerGraphics.fillStyle(0xffee00);
    playerGraphics.fillRoundedRect(17, 35, 8, 5, 1);
    playerGraphics.fillStyle(0xffff88);
    playerGraphics.fillRect(19, 36, 4, 3);

    // Arms - black with muscle definition
    playerGraphics.fillStyle(0x111111);
    playerGraphics.fillRoundedRect(1, 19, 10, 18, 3);
    playerGraphics.fillRoundedRect(31, 19, 10, 18, 3);
    playerGraphics.fillStyle(0x1a1a1a);
    playerGraphics.fillRect(2, 20, 8, 16);
    playerGraphics.fillRect(32, 20, 8, 16);
    // Arm highlights
    playerGraphics.fillStyle(0x333333, 0.4);
    playerGraphics.fillRect(3, 21, 3, 8);
    playerGraphics.fillRect(33, 21, 3, 8);

    // Hands - gloves with detail
    playerGraphics.fillStyle(0xcc9900);
    playerGraphics.fillCircle(6, 38, 5);
    playerGraphics.fillCircle(36, 38, 5);
    playerGraphics.fillStyle(0xffcc00);
    playerGraphics.fillCircle(6, 38, 4);
    playerGraphics.fillCircle(36, 38, 4);
    // Glove highlights
    playerGraphics.fillStyle(0xffee66, 0.6);
    playerGraphics.fillCircle(5, 36, 2);
    playerGraphics.fillCircle(35, 36, 2);

    // Head with better shading
    playerGraphics.fillStyle(0xd4a57b);
    playerGraphics.fillCircle(21, 11, 10);
    playerGraphics.fillStyle(0xe8b89d);
    playerGraphics.fillCircle(21, 10, 9);
    // Face highlight
    playerGraphics.fillStyle(0xf0c8a8, 0.6);
    playerGraphics.fillCircle(18, 8, 4);

    // Mask - black domino mask with depth
    playerGraphics.fillStyle(0x0a0a0a);
    playerGraphics.fillEllipse(15, 9, 9, 6);
    playerGraphics.fillEllipse(27, 9, 9, 6);
    playerGraphics.fillStyle(0x1a1a1a);
    playerGraphics.fillEllipse(15, 9, 8, 5);
    playerGraphics.fillEllipse(27, 9, 8, 5);

    // Eyes through mask - white with pupils
    playerGraphics.fillStyle(0xffffff);
    playerGraphics.fillEllipse(15, 9, 4, 3);
    playerGraphics.fillEllipse(27, 9, 4, 3);
    // Pupils - determined look
    playerGraphics.fillStyle(0x2244aa);
    playerGraphics.fillCircle(16, 9, 1);
    playerGraphics.fillCircle(28, 9, 1);

    // Hair - styled with detail
    playerGraphics.fillStyle(0x0a0a0a);
    playerGraphics.fillTriangle(11, 5, 21, -1, 31, 5);
    playerGraphics.fillStyle(0x1a1a1a);
    playerGraphics.fillTriangle(12, 4, 21, 0, 30, 4);
    // Hair highlight
    playerGraphics.fillStyle(0x333333, 0.5);
    playerGraphics.fillTriangle(16, 2, 21, 1, 26, 2);

    // Determined expression
    playerGraphics.lineStyle(2, 0x8b5a3c);
    playerGraphics.lineBetween(17, 15, 25, 15);
    // Chin definition
    playerGraphics.fillStyle(0xd4a57b, 0.5);
    playerGraphics.fillEllipse(21, 17, 6, 2);

    playerGraphics.generateTexture('player', 48, 62);

    // Player sliding - horizontal dive
    const slideGraphics = this.make.graphics({ x: 0, y: 0, add: false });
    // Cape trailing - yellow
    slideGraphics.fillStyle(0xffcc00);
    slideGraphics.fillTriangle(0, 8, 12, 5, 8, 18);
    // Body horizontal - black
    slideGraphics.fillStyle(0x1a1a1a);
    slideGraphics.fillRoundedRect(8, 8, 38, 14, 3);
    // Yellow stripe
    slideGraphics.fillStyle(0xffcc00);
    slideGraphics.fillRect(20, 8, 4, 14);
    // Head forward
    slideGraphics.fillStyle(0xe8b89d);
    slideGraphics.fillCircle(50, 12, 7);
    // Mask
    slideGraphics.fillStyle(0x1a1a1a);
    slideGraphics.fillEllipse(52, 11, 6, 4);
    // Hair
    slideGraphics.fillStyle(0x1a1a1a);
    slideGraphics.fillTriangle(48, 5, 55, 8, 52, 10);
    // Arms stretched - black with yellow glove
    slideGraphics.fillStyle(0x1a1a1a);
    slideGraphics.fillRect(44, 14, 6, 4);
    slideGraphics.fillStyle(0xffcc00);
    slideGraphics.fillCircle(54, 16, 3);
    slideGraphics.generateTexture('player-slide', 58, 24);

    // ===== OBSTACLES =====
    // Spikes - obsidian volcanic crystals
    const spikeGraphics = this.make.graphics({ x: 0, y: 0, add: false });
    // Volcanic rock base
    spikeGraphics.fillStyle(0x2a1a15);
    spikeGraphics.fillRect(0, 32, 50, 8);
    spikeGraphics.fillStyle(0x3a2520);
    spikeGraphics.fillRect(5, 34, 40, 4);
    // Crystal spikes - dark obsidian with fiery glow
    const spikePositions = [[10, 38], [25, 38], [40, 38]];
    spikePositions.forEach(([x, baseY], i) => {
      const height = i === 1 ? 38 : 30;
      // Obsidian body
      spikeGraphics.fillStyle(0x1a0a0a);
      spikeGraphics.fillTriangle(x, baseY - height, x - 7, baseY, x + 7, baseY);
      // Inner fire glow
      spikeGraphics.fillStyle(0x4a1a0a, 0.6);
      spikeGraphics.fillTriangle(x, baseY - height + 8, x - 4, baseY - 5, x + 4, baseY - 5);
      // Hot edge
      spikeGraphics.fillStyle(0xff4400, 0.4);
      spikeGraphics.fillTriangle(x, baseY - height, x - 2, baseY - height + 10, x + 2, baseY - height + 10);
      // Sharp tip glow
      spikeGraphics.fillStyle(0xff6600, 0.7);
      spikeGraphics.fillCircle(x, baseY - height + 3, 2);
    });
    spikeGraphics.generateTexture('spike', 50, 40);

    // Lava - bubbling molten pool
    const lavaGraphics = this.make.graphics({ x: 0, y: 0, add: false });
    // Deep magma core
    lavaGraphics.fillStyle(0x4a0a00);
    lavaGraphics.fillRect(0, 15, 70, 10);
    // Mid layer - hot orange
    lavaGraphics.fillStyle(0x8a2000);
    lavaGraphics.fillRect(0, 10, 70, 10);
    // Active surface - bright orange/yellow
    lavaGraphics.fillStyle(0xcc4400);
    lavaGraphics.fillRect(0, 5, 70, 10);
    lavaGraphics.fillStyle(0xff5500);
    lavaGraphics.fillRect(3, 3, 64, 8);
    // Molten surface texture
    lavaGraphics.fillStyle(0xff7700);
    lavaGraphics.fillEllipse(15, 8, 12, 6);
    lavaGraphics.fillEllipse(40, 6, 15, 5);
    lavaGraphics.fillEllipse(58, 9, 10, 5);
    // White-hot spots
    lavaGraphics.fillStyle(0xffaa00);
    lavaGraphics.fillCircle(12, 6, 4);
    lavaGraphics.fillCircle(38, 5, 5);
    lavaGraphics.fillCircle(55, 7, 3);
    // Bubbles
    lavaGraphics.fillStyle(0xffcc00);
    lavaGraphics.fillCircle(20, 4, 3);
    lavaGraphics.fillCircle(45, 3, 2);
    // Bright glow on bubbles
    lavaGraphics.fillStyle(0xffffcc, 0.8);
    lavaGraphics.fillCircle(11, 4, 2);
    lavaGraphics.fillCircle(37, 3, 2);
    // Edge crust
    lavaGraphics.fillStyle(0x2a1510);
    lavaGraphics.fillRect(0, 0, 4, 25);
    lavaGraphics.fillRect(66, 0, 4, 25);
    lavaGraphics.generateTexture('lava', 70, 25);

    // Pit - deadly void (just the dark hole, no visible edges)
    const pitGraphics = this.make.graphics({ x: 0, y: 0, add: false });
    // Pure black void - the pit is just emptiness
    pitGraphics.fillStyle(0x050505);
    pitGraphics.fillRect(0, 0, 100, 60);
    // Subtle lava glow at the very bottom
    pitGraphics.fillStyle(0x330a00, 0.6);
    pitGraphics.fillRect(10, 45, 80, 15);
    pitGraphics.fillStyle(0xff4400, 0.2);
    pitGraphics.fillRect(20, 50, 60, 10);
    // Thin danger line at top edge (subtle)
    pitGraphics.fillStyle(0xff2200, 0.4);
    pitGraphics.fillRect(0, 0, 100, 2);
    pitGraphics.generateTexture('pit', 100, 60);

    // Firewall - roaring flame barrier (player must slide under)
    const fireWallGraphics = this.make.graphics({ x: 0, y: 0, add: false });
    // Brazier/emitter base
    fireWallGraphics.fillStyle(0x2a1a15);
    fireWallGraphics.fillRect(5, 50, 20, 10);
    fireWallGraphics.fillStyle(0x3a2520);
    fireWallGraphics.fillRect(7, 52, 16, 6);
    // Glowing coals in brazier
    fireWallGraphics.fillStyle(0xff4400, 0.6);
    fireWallGraphics.fillCircle(10, 54, 3);
    fireWallGraphics.fillCircle(20, 55, 3);
    // Main flame body - layered for depth
    fireWallGraphics.fillStyle(0x8a2000);
    fireWallGraphics.fillTriangle(2, 50, 15, 5, 28, 50);
    fireWallGraphics.fillStyle(0xcc4400);
    fireWallGraphics.fillTriangle(5, 48, 15, 8, 25, 48);
    fireWallGraphics.fillStyle(0xff5500);
    fireWallGraphics.fillTriangle(7, 45, 15, 12, 23, 45);
    // Inner hot core
    fireWallGraphics.fillStyle(0xff7700);
    fireWallGraphics.fillTriangle(9, 42, 15, 15, 21, 42);
    fireWallGraphics.fillStyle(0xffaa00);
    fireWallGraphics.fillTriangle(11, 38, 15, 18, 19, 38);
    // White-hot center
    fireWallGraphics.fillStyle(0xffcc00);
    fireWallGraphics.fillTriangle(13, 35, 15, 22, 17, 35);
    // Flame tips
    fireWallGraphics.fillStyle(0xffdd44, 0.9);
    fireWallGraphics.fillTriangle(14, 28, 15, 20, 16, 28);
    // Side flickers
    fireWallGraphics.fillStyle(0xff6600, 0.7);
    fireWallGraphics.fillTriangle(3, 35, 8, 20, 10, 40);
    fireWallGraphics.fillTriangle(27, 35, 22, 20, 20, 40);
    fireWallGraphics.generateTexture('firewall', 30, 60);

    // ===== PORTAL =====
    const portalGraphics = this.make.graphics({ x: 0, y: 0, add: false });
    // Ancient stone arch
    portalGraphics.fillStyle(0x37474f);
    portalGraphics.fillRect(0, 0, 12, 90);
    portalGraphics.fillRect(48, 0, 12, 90);
    portalGraphics.fillRect(0, 0, 60, 15);
    // Stone detail
    portalGraphics.fillStyle(0x546e7a);
    portalGraphics.fillRect(2, 15, 8, 73);
    portalGraphics.fillRect(50, 15, 8, 73);
    // Runes
    portalGraphics.fillStyle(0x7e57c2);
    portalGraphics.fillCircle(6, 30, 3);
    portalGraphics.fillCircle(6, 50, 3);
    portalGraphics.fillCircle(6, 70, 3);
    portalGraphics.fillCircle(54, 30, 3);
    portalGraphics.fillCircle(54, 50, 3);
    portalGraphics.fillCircle(54, 70, 3);
    // Swirling energy
    portalGraphics.fillStyle(0x4a148c);
    portalGraphics.fillEllipse(30, 50, 32, 60);
    portalGraphics.fillStyle(0x7b1fa2);
    portalGraphics.fillEllipse(30, 50, 26, 50);
    portalGraphics.fillStyle(0xab47bc);
    portalGraphics.fillEllipse(30, 50, 18, 38);
    portalGraphics.fillStyle(0xce93d8);
    portalGraphics.fillEllipse(30, 50, 10, 22);
    // Sparkles
    portalGraphics.fillStyle(0xffffff);
    portalGraphics.fillCircle(22, 35, 2);
    portalGraphics.fillCircle(38, 55, 3);
    portalGraphics.fillCircle(28, 65, 2);
    portalGraphics.fillCircle(35, 40, 2);
    portalGraphics.generateTexture('portal', 60, 90);

    // ===== POWER-UPS =====
    // Heart - pulsing life crystal
    const heartGraphics = this.make.graphics({ x: 0, y: 0, add: false });
    // Outer magical glow
    heartGraphics.fillStyle(0xff6699, 0.3);
    heartGraphics.fillCircle(12, 12, 14);
    heartGraphics.fillCircle(24, 12, 14);
    heartGraphics.fillTriangle(0, 16, 36, 16, 18, 38);
    // Heart body - rich ruby
    heartGraphics.fillStyle(0xcc1144);
    heartGraphics.fillCircle(12, 13, 10);
    heartGraphics.fillCircle(24, 13, 10);
    heartGraphics.fillTriangle(3, 17, 33, 17, 18, 35);
    // Inner glow
    heartGraphics.fillStyle(0xff3366);
    heartGraphics.fillCircle(12, 12, 8);
    heartGraphics.fillCircle(24, 12, 8);
    heartGraphics.fillTriangle(5, 16, 31, 16, 18, 32);
    // Hot center
    heartGraphics.fillStyle(0xff6688);
    heartGraphics.fillCircle(12, 11, 5);
    heartGraphics.fillCircle(24, 11, 5);
    // Sparkle highlights
    heartGraphics.fillStyle(0xffaacc, 0.9);
    heartGraphics.fillCircle(9, 9, 3);
    heartGraphics.fillCircle(21, 9, 3);
    heartGraphics.fillStyle(0xffffff, 0.8);
    heartGraphics.fillCircle(8, 8, 2);
    heartGraphics.fillCircle(20, 8, 1);
    heartGraphics.generateTexture('heart-powerup', 36, 38);

    // Shield - arcane barrier crystal
    const shieldGraphics = this.make.graphics({ x: 0, y: 0, add: false });
    // Outer magical glow
    shieldGraphics.fillStyle(0x00ccff, 0.3);
    shieldGraphics.fillRoundedRect(0, 0, 36, 28, 8);
    shieldGraphics.fillTriangle(0, 26, 36, 26, 18, 42);
    // Shield body - azure crystal
    shieldGraphics.fillStyle(0x0066aa);
    shieldGraphics.fillRoundedRect(4, 3, 28, 22, 5);
    shieldGraphics.fillTriangle(4, 23, 32, 23, 18, 38);
    // Inner layer
    shieldGraphics.fillStyle(0x0088cc);
    shieldGraphics.fillRoundedRect(7, 6, 22, 16, 3);
    shieldGraphics.fillTriangle(7, 20, 29, 20, 18, 34);
    // Magical core
    shieldGraphics.fillStyle(0x00aaee);
    shieldGraphics.fillRoundedRect(10, 9, 16, 10, 2);
    // Center emblem - star
    shieldGraphics.fillStyle(0x44ddff);
    shieldGraphics.fillCircle(18, 16, 6);
    shieldGraphics.fillStyle(0x00ccff);
    shieldGraphics.fillTriangle(18, 10, 15, 18, 21, 18);
    shieldGraphics.fillTriangle(18, 22, 15, 14, 21, 14);
    // Highlights
    shieldGraphics.fillStyle(0xaaeeff, 0.8);
    shieldGraphics.fillCircle(11, 10, 3);
    shieldGraphics.fillStyle(0xffffff, 0.7);
    shieldGraphics.fillCircle(10, 9, 2);
    shieldGraphics.generateTexture('shield-powerup', 36, 42);

    // ===== ENEMIES =====
    // Whop - volcanic fire demon with enhanced detail
    const whopGraphics = this.make.graphics({ x: 0, y: 0, add: false });

    // Outer flame aura
    whopGraphics.fillStyle(0xff6600, 0.15);
    whopGraphics.fillCircle(24, 28, 30);
    whopGraphics.fillStyle(0xff4400, 0.2);
    whopGraphics.fillCircle(24, 28, 26);

    // Ground shadow
    whopGraphics.fillStyle(0x1a0505, 0.6);
    whopGraphics.fillEllipse(24, 50, 38, 8);

    // Ember particles floating around (decorative)
    whopGraphics.fillStyle(0xff8800, 0.6);
    whopGraphics.fillCircle(6, 12, 2);
    whopGraphics.fillCircle(42, 16, 2);
    whopGraphics.fillCircle(10, 8, 1);
    whopGraphics.fillCircle(38, 10, 1);

    // Body - molten rock form with crust
    whopGraphics.fillStyle(0x1a0505);
    whopGraphics.fillEllipse(24, 34, 42, 36);
    whopGraphics.fillStyle(0x2a0a0a);
    whopGraphics.fillEllipse(24, 32, 40, 34);

    // Deep magma cracks
    whopGraphics.fillStyle(0x8a2000);
    whopGraphics.fillEllipse(24, 30, 36, 30);

    // Glowing lava veins with depth
    whopGraphics.fillStyle(0xff2200, 0.7);
    whopGraphics.fillRect(8, 28, 4, 16);
    whopGraphics.fillRect(36, 26, 4, 18);
    whopGraphics.fillRect(16, 40, 16, 4);
    whopGraphics.fillStyle(0xff6600, 0.8);
    whopGraphics.fillRect(9, 30, 2, 12);
    whopGraphics.fillRect(37, 28, 2, 14);
    whopGraphics.fillRect(18, 41, 12, 2);

    // Face area - darker volcanic rock
    whopGraphics.fillStyle(0x2a1008);
    whopGraphics.fillEllipse(24, 26, 32, 24);
    whopGraphics.fillStyle(0x3a1510);
    whopGraphics.fillEllipse(24, 25, 30, 22);

    // Evil eye sockets
    whopGraphics.fillStyle(0x0a0303);
    whopGraphics.fillEllipse(14, 24, 13, 11);
    whopGraphics.fillEllipse(34, 24, 13, 11);

    // Eye fire glow - layered
    whopGraphics.fillStyle(0xcc2200);
    whopGraphics.fillCircle(14, 24, 7);
    whopGraphics.fillCircle(34, 24, 7);
    whopGraphics.fillStyle(0xff6600);
    whopGraphics.fillCircle(14, 24, 5);
    whopGraphics.fillCircle(34, 24, 5);

    // Burning pupils - menacing
    whopGraphics.fillStyle(0xffaa00);
    whopGraphics.fillCircle(15, 24, 3);
    whopGraphics.fillCircle(35, 24, 3);
    whopGraphics.fillStyle(0xffee00);
    whopGraphics.fillCircle(15, 23, 2);
    whopGraphics.fillCircle(35, 23, 2);
    whopGraphics.fillStyle(0xffffff, 0.9);
    whopGraphics.fillCircle(15, 22, 1);
    whopGraphics.fillCircle(35, 22, 1);

    // Angry brow ridges with detail
    whopGraphics.fillStyle(0x0a0303);
    whopGraphics.fillTriangle(2, 18, 20, 18, 8, 24);
    whopGraphics.fillTriangle(46, 18, 28, 18, 40, 24);
    whopGraphics.fillStyle(0x1a0505);
    whopGraphics.fillTriangle(4, 18, 18, 18, 8, 22);
    whopGraphics.fillTriangle(44, 18, 30, 18, 40, 22);

    // Jagged flame mouth
    whopGraphics.fillStyle(0x050202);
    whopGraphics.fillRect(10, 34, 28, 10);

    // Inner mouth glow
    whopGraphics.fillStyle(0x4a0a00, 0.6);
    whopGraphics.fillRect(12, 36, 24, 6);

    // Flame teeth - multiple layers
    whopGraphics.fillStyle(0xcc2200);
    whopGraphics.fillTriangle(12, 34, 18, 34, 15, 42);
    whopGraphics.fillTriangle(20, 34, 26, 34, 23, 43);
    whopGraphics.fillTriangle(28, 34, 34, 34, 31, 42);
    whopGraphics.fillStyle(0xff4400);
    whopGraphics.fillTriangle(13, 34, 17, 34, 15, 40);
    whopGraphics.fillTriangle(21, 34, 25, 34, 23, 41);
    whopGraphics.fillTriangle(29, 34, 33, 34, 31, 40);
    whopGraphics.fillStyle(0xffaa00);
    whopGraphics.fillTriangle(14, 34, 16, 34, 15, 38);
    whopGraphics.fillTriangle(22, 34, 24, 34, 23, 39);
    whopGraphics.fillTriangle(30, 34, 32, 34, 31, 38);

    whopGraphics.generateTexture('whop', 48, 54);

    // Player attack effect - burst/slash visual
    const attackGraphics = this.make.graphics({ x: 0, y: 0, add: false });
    // Create a burst effect with triangles
    attackGraphics.fillStyle(0xffff00, 0.8);
    attackGraphics.fillTriangle(20, 0, 15, 20, 25, 20);   // Top spike
    attackGraphics.fillTriangle(40, 20, 20, 15, 20, 25);  // Right spike
    attackGraphics.fillTriangle(20, 40, 25, 20, 15, 20);  // Bottom spike
    attackGraphics.fillTriangle(0, 20, 20, 25, 20, 15);   // Left spike
    // Center glow
    attackGraphics.fillStyle(0xffffff, 0.9);
    attackGraphics.fillCircle(20, 20, 6);
    attackGraphics.generateTexture('attack-effect', 40, 40);

    // ===== COINS =====
    const coinGraphics = this.make.graphics({ x: 0, y: 0, add: false });
    // Outer glow
    coinGraphics.fillStyle(0xffaa00, 0.3);
    coinGraphics.fillCircle(12, 12, 12);
    // Shadow/edge
    coinGraphics.fillStyle(0x996600);
    coinGraphics.fillCircle(12, 13, 10);
    // Main coin body - rich gold
    coinGraphics.fillStyle(0xffcc00);
    coinGraphics.fillCircle(12, 12, 10);
    // Inner detail ring
    coinGraphics.fillStyle(0xcc9900);
    coinGraphics.strokeCircle(12, 12, 7);
    // Embossed center
    coinGraphics.fillStyle(0xffdd44);
    coinGraphics.fillCircle(12, 11, 6);
    // Star/emblem in center
    coinGraphics.fillStyle(0xeeaa00);
    coinGraphics.fillTriangle(12, 7, 9, 13, 15, 13);
    coinGraphics.fillTriangle(12, 15, 9, 10, 15, 10);
    // Shine highlight
    coinGraphics.fillStyle(0xffffcc, 0.9);
    coinGraphics.fillCircle(8, 8, 3);
    coinGraphics.fillStyle(0xffffff, 0.7);
    coinGraphics.fillCircle(7, 7, 2);
    coinGraphics.generateTexture('coin', 24, 24);

    // Coin UI icon (smaller for HUD)
    const coinUIGraphics = this.make.graphics({ x: 0, y: 0, add: false });
    coinUIGraphics.fillStyle(0xffcc00);
    coinUIGraphics.fillCircle(10, 10, 10);
    coinUIGraphics.fillStyle(0xffdd44);
    coinUIGraphics.fillCircle(10, 10, 7);
    coinUIGraphics.fillStyle(0xffffaa);
    coinUIGraphics.fillCircle(7, 7, 3);
    coinUIGraphics.generateTexture('coin-ui', 20, 20);

    // ===== GROUND =====
    const groundGraphics = this.make.graphics({ x: 0, y: 0, add: false });
    // Deep volcanic rock base
    groundGraphics.fillStyle(0x2a1a15);
    groundGraphics.fillRect(0, 0, 64, 64);
    // Cracked stone texture layers
    groundGraphics.fillStyle(0x3a2520);
    groundGraphics.fillRect(0, 8, 64, 56);
    // Top edge - scorched stone
    groundGraphics.fillStyle(0x4a3530);
    groundGraphics.fillRect(0, 0, 64, 10);
    // Hot cracks with glow
    groundGraphics.fillStyle(0x8a4030);
    groundGraphics.fillRect(8, 3, 12, 4);
    groundGraphics.fillRect(35, 5, 18, 3);
    groundGraphics.fillRect(50, 2, 10, 5);
    // Lava veins deep in rock
    groundGraphics.fillStyle(0xff4400, 0.3);
    groundGraphics.fillRect(15, 25, 3, 20);
    groundGraphics.fillRect(40, 30, 2, 25);
    groundGraphics.fillStyle(0xff6600, 0.2);
    groundGraphics.fillRect(14, 24, 5, 3);
    groundGraphics.fillRect(39, 29, 4, 3);
    // Stone texture detail
    groundGraphics.fillStyle(0x1a0a0a);
    groundGraphics.fillRect(5, 35, 8, 6);
    groundGraphics.fillRect(28, 45, 10, 8);
    groundGraphics.fillRect(48, 38, 12, 10);
    // Subtle grid cracks
    groundGraphics.lineStyle(1, 0x1a1010, 0.4);
    groundGraphics.lineBetween(0, 20, 64, 22);
    groundGraphics.lineBetween(0, 42, 64, 40);
    groundGraphics.lineBetween(22, 0, 20, 64);
    groundGraphics.lineBetween(44, 0, 46, 64);
    groundGraphics.generateTexture('ground', 64, 64);

    // ===== UI HEARTS =====
    // Full heart
    const heartUIGraphics = this.make.graphics({ x: 0, y: 0, add: false });
    heartUIGraphics.fillStyle(0xff0000);
    heartUIGraphics.fillCircle(8, 8, 7);
    heartUIGraphics.fillCircle(18, 8, 7);
    heartUIGraphics.fillTriangle(2, 10, 24, 10, 13, 24);
    heartUIGraphics.fillStyle(0xff6666);
    heartUIGraphics.fillCircle(7, 6, 3);
    heartUIGraphics.generateTexture('heart-ui', 26, 26);

    // Empty heart
    const emptyHeartGraphics = this.make.graphics({ x: 0, y: 0, add: false });
    emptyHeartGraphics.lineStyle(2, 0x660000);
    emptyHeartGraphics.strokeCircle(8, 8, 7);
    emptyHeartGraphics.strokeCircle(18, 8, 7);
    emptyHeartGraphics.fillStyle(0x330000);
    emptyHeartGraphics.fillCircle(8, 8, 5);
    emptyHeartGraphics.fillCircle(18, 8, 5);
    emptyHeartGraphics.fillTriangle(4, 10, 22, 10, 13, 22);
    emptyHeartGraphics.generateTexture('heart-empty', 26, 26);

    // ===== BACKGROUND LAYERS =====
    // Far background (volcanic mountains with lava glow)
    const bgFarGraphics = this.make.graphics({ x: 0, y: 0, add: false });

    // Sky gradient - dark red to deep purple (volcanic atmosphere)
    bgFarGraphics.fillGradientStyle(0x1a0505, 0x1a0505, 0x2d1520, 0x2d1520);
    bgFarGraphics.fillRect(0, 0, 800, 400);

    // Distant volcanic glow on horizon
    bgFarGraphics.fillStyle(0x4a1a0a, 0.4);
    bgFarGraphics.fillRect(0, 280, 800, 120);
    bgFarGraphics.fillStyle(0x6b2510, 0.3);
    bgFarGraphics.fillRect(0, 320, 800, 80);

    // Far mountain range (silhouettes)
    bgFarGraphics.fillStyle(0x1a0808);
    bgFarGraphics.fillTriangle(-50, 400, 120, 180, 290, 400);
    bgFarGraphics.fillTriangle(200, 400, 380, 140, 560, 400);
    bgFarGraphics.fillTriangle(450, 400, 600, 190, 750, 400);
    bgFarGraphics.fillTriangle(650, 400, 780, 160, 900, 400);

    // Volcanic peaks with lava glow
    bgFarGraphics.fillStyle(0x2a1010);
    bgFarGraphics.fillTriangle(350, 400, 450, 120, 550, 400);
    // Lava glow at peak
    bgFarGraphics.fillStyle(0xff4400, 0.3);
    bgFarGraphics.fillCircle(450, 130, 15);
    bgFarGraphics.fillStyle(0xff6600, 0.2);
    bgFarGraphics.fillCircle(450, 125, 25);

    // Smoke/ash particles in sky
    bgFarGraphics.fillStyle(0x3a2020, 0.5);
    bgFarGraphics.fillCircle(100, 80, 20);
    bgFarGraphics.fillCircle(250, 50, 15);
    bgFarGraphics.fillCircle(400, 70, 25);
    bgFarGraphics.fillCircle(550, 40, 18);
    bgFarGraphics.fillCircle(700, 90, 22);

    // Stars/embers
    bgFarGraphics.fillStyle(0xff8844, 0.6);
    bgFarGraphics.fillCircle(150, 100, 2);
    bgFarGraphics.fillCircle(320, 60, 1);
    bgFarGraphics.fillCircle(480, 85, 2);
    bgFarGraphics.fillCircle(620, 45, 1);
    bgFarGraphics.fillCircle(750, 75, 2);
    bgFarGraphics.generateTexture('bg-far', 800, 400);

    // Mid background (closer volcanic hills with detail)
    const bgMidGraphics = this.make.graphics({ x: 0, y: 0, add: false });
    // Transparent base
    bgMidGraphics.fillStyle(0x000000, 0);
    bgMidGraphics.fillRect(0, 0, 800, 400);

    // Rocky hills with craggy texture
    bgMidGraphics.fillStyle(0x2a1510);
    bgMidGraphics.fillTriangle(-30, 400, 80, 280, 200, 400);
    bgMidGraphics.fillTriangle(150, 400, 300, 250, 450, 400);
    bgMidGraphics.fillTriangle(380, 400, 520, 270, 660, 400);
    bgMidGraphics.fillTriangle(580, 400, 700, 290, 830, 400);

    // Hill highlights (catching volcanic glow)
    bgMidGraphics.fillStyle(0x4a2520, 0.7);
    bgMidGraphics.fillTriangle(80, 280, 100, 280, 140, 340);
    bgMidGraphics.fillTriangle(300, 250, 320, 250, 360, 320);
    bgMidGraphics.fillTriangle(520, 270, 540, 270, 580, 330);

    // Lava streams between hills
    bgMidGraphics.fillStyle(0xff4400, 0.4);
    bgMidGraphics.fillRect(195, 380, 8, 20);
    bgMidGraphics.fillRect(445, 385, 6, 15);
    bgMidGraphics.fillRect(655, 390, 5, 10);

    // Glow around lava
    bgMidGraphics.fillStyle(0xff6600, 0.2);
    bgMidGraphics.fillCircle(199, 385, 12);
    bgMidGraphics.fillCircle(448, 388, 10);
    bgMidGraphics.fillCircle(658, 392, 8);
    bgMidGraphics.generateTexture('bg-mid', 800, 400);

    // ===== PARTICLES =====
    // Fire/explosion particle (orange-red)
    const particleGraphics = this.make.graphics({ x: 0, y: 0, add: false });
    particleGraphics.fillStyle(0xff6600);
    particleGraphics.fillCircle(4, 4, 4);
    particleGraphics.generateTexture('particle-fire', 8, 8);

    // Gold sparkle particle (for coins)
    const sparkleGraphics = this.make.graphics({ x: 0, y: 0, add: false });
    sparkleGraphics.fillStyle(0xffcc00);
    sparkleGraphics.fillCircle(3, 3, 3);
    sparkleGraphics.generateTexture('particle-gold', 6, 6);

    // Cyan particle (for shield)
    const cyanGraphics = this.make.graphics({ x: 0, y: 0, add: false });
    cyanGraphics.fillStyle(0x00ffff);
    cyanGraphics.fillCircle(3, 3, 3);
    cyanGraphics.generateTexture('particle-cyan', 6, 6);

    // Pink particle (for heart)
    const pinkGraphics = this.make.graphics({ x: 0, y: 0, add: false });
    pinkGraphics.fillStyle(0xff66cc);
    pinkGraphics.fillCircle(3, 3, 3);
    pinkGraphics.generateTexture('particle-pink', 6, 6);

    // White dust particle (for landing)
    const dustGraphics = this.make.graphics({ x: 0, y: 0, add: false });
    dustGraphics.fillStyle(0xcccccc);
    dustGraphics.fillCircle(2, 2, 2);
    dustGraphics.generateTexture('particle-dust', 4, 4);

    // ===== WATER THEME ASSETS =====
    this.createWaterThemeAssets();
  }

  createWaterThemeAssets() {
    // ===== WATER BACKGROUNDS =====
    // Far background - underwater cavern with light rays
    const waterBgFar = this.make.graphics({ x: 0, y: 0, add: false });
    // Deep ocean gradient
    waterBgFar.fillGradientStyle(0x001122, 0x001122, 0x003355, 0x003355);
    waterBgFar.fillRect(0, 0, 800, 400);
    // Light rays from above
    waterBgFar.fillStyle(0x0066aa, 0.15);
    waterBgFar.fillTriangle(100, 0, 80, 400, 180, 400);
    waterBgFar.fillTriangle(350, 0, 300, 400, 420, 400);
    waterBgFar.fillTriangle(600, 0, 550, 400, 680, 400);
    waterBgFar.fillStyle(0x0088cc, 0.1);
    waterBgFar.fillTriangle(120, 0, 110, 400, 160, 400);
    waterBgFar.fillTriangle(380, 0, 350, 400, 400, 400);
    // Distant underwater mountains/coral
    waterBgFar.fillStyle(0x002244);
    waterBgFar.fillTriangle(-50, 400, 100, 200, 250, 400);
    waterBgFar.fillTriangle(180, 400, 350, 160, 520, 400);
    waterBgFar.fillTriangle(450, 400, 580, 180, 710, 400);
    waterBgFar.fillTriangle(640, 400, 750, 150, 860, 400);
    // Coral silhouettes
    waterBgFar.fillStyle(0x003366);
    waterBgFar.fillEllipse(120, 350, 40, 60);
    waterBgFar.fillEllipse(400, 340, 50, 70);
    waterBgFar.fillEllipse(680, 355, 35, 55);
    // Bubbles
    waterBgFar.fillStyle(0x66aacc, 0.4);
    waterBgFar.fillCircle(80, 120, 4);
    waterBgFar.fillCircle(220, 80, 3);
    waterBgFar.fillCircle(450, 100, 5);
    waterBgFar.fillCircle(600, 60, 3);
    waterBgFar.fillCircle(720, 140, 4);
    waterBgFar.generateTexture('bg-far-water', 800, 400);

    // Mid background - coral reef silhouettes
    const waterBgMid = this.make.graphics({ x: 0, y: 0, add: false });
    waterBgMid.fillStyle(0x000000, 0);
    waterBgMid.fillRect(0, 0, 800, 400);
    // Coral formations
    waterBgMid.fillStyle(0x004466);
    waterBgMid.fillEllipse(60, 370, 60, 50);
    waterBgMid.fillEllipse(200, 360, 80, 60);
    waterBgMid.fillEllipse(380, 375, 55, 40);
    waterBgMid.fillEllipse(550, 355, 90, 70);
    waterBgMid.fillEllipse(720, 365, 65, 55);
    // Seaweed
    waterBgMid.fillStyle(0x005544);
    waterBgMid.fillRect(100, 320, 8, 80);
    waterBgMid.fillRect(108, 330, 6, 70);
    waterBgMid.fillRect(300, 310, 10, 90);
    waterBgMid.fillRect(312, 325, 7, 75);
    waterBgMid.fillRect(620, 315, 9, 85);
    // Bioluminescent glow
    waterBgMid.fillStyle(0x00ffaa, 0.2);
    waterBgMid.fillCircle(150, 340, 15);
    waterBgMid.fillCircle(420, 350, 12);
    waterBgMid.fillCircle(680, 335, 18);
    waterBgMid.generateTexture('bg-mid-water', 800, 400);

    // Water ground - ocean floor
    const waterGround = this.make.graphics({ x: 0, y: 0, add: false });
    // Sandy ocean floor base
    waterGround.fillStyle(0x1a3344);
    waterGround.fillRect(0, 0, 64, 64);
    // Lighter sand layer
    waterGround.fillStyle(0x2a4455);
    waterGround.fillRect(0, 0, 64, 12);
    // Pebbles and shells
    waterGround.fillStyle(0x3a5566);
    waterGround.fillCircle(10, 6, 4);
    waterGround.fillCircle(35, 8, 5);
    waterGround.fillCircle(55, 5, 3);
    // Coral bits
    waterGround.fillStyle(0x446677);
    waterGround.fillRect(20, 25, 8, 12);
    waterGround.fillRect(45, 35, 10, 15);
    // Dark crevices
    waterGround.fillStyle(0x0a1a22);
    waterGround.fillRect(5, 40, 6, 8);
    waterGround.fillRect(30, 48, 8, 10);
    waterGround.generateTexture('ground-water', 64, 64);

    // ===== WATER OBSTACLES =====
    // Urchin - spiky sea urchin (like spike)
    const urchinGraphics = this.make.graphics({ x: 0, y: 0, add: false });
    // Body
    urchinGraphics.fillStyle(0x1a0033);
    urchinGraphics.fillCircle(25, 28, 16);
    urchinGraphics.fillStyle(0x330066);
    urchinGraphics.fillCircle(25, 26, 14);
    // Spines radiating out
    const spineAngles = [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330];
    spineAngles.forEach(angle => {
      const rad = angle * Math.PI / 180;
      const x1 = 25 + Math.cos(rad) * 12;
      const y1 = 26 + Math.sin(rad) * 12;
      const x2 = 25 + Math.cos(rad) * 22;
      const y2 = 26 + Math.sin(rad) * 22;
      urchinGraphics.lineStyle(2, 0x6600cc);
      urchinGraphics.lineBetween(x1, y1, x2, y2);
    });
    // Glow at tips
    urchinGraphics.fillStyle(0xaa66ff, 0.6);
    urchinGraphics.fillCircle(25, 4, 3);
    urchinGraphics.fillCircle(25, 48, 3);
    urchinGraphics.fillCircle(3, 26, 3);
    urchinGraphics.fillCircle(47, 26, 3);
    urchinGraphics.generateTexture('urchin', 50, 52);

    // Whirlpool - swirling water hazard (like lava)
    const whirlpoolGraphics = this.make.graphics({ x: 0, y: 0, add: false });
    // Outer swirl
    whirlpoolGraphics.fillStyle(0x002244);
    whirlpoolGraphics.fillEllipse(35, 15, 35, 15);
    // Inner swirls
    whirlpoolGraphics.fillStyle(0x003366);
    whirlpoolGraphics.fillEllipse(35, 14, 28, 12);
    whirlpoolGraphics.fillStyle(0x004488);
    whirlpoolGraphics.fillEllipse(35, 13, 20, 9);
    whirlpoolGraphics.fillStyle(0x0066aa);
    whirlpoolGraphics.fillEllipse(35, 12, 12, 6);
    // Dark center (the void)
    whirlpoolGraphics.fillStyle(0x001122);
    whirlpoolGraphics.fillEllipse(35, 11, 6, 4);
    // Foam/bubbles
    whirlpoolGraphics.fillStyle(0x88ccee, 0.6);
    whirlpoolGraphics.fillCircle(15, 12, 3);
    whirlpoolGraphics.fillCircle(55, 14, 3);
    whirlpoolGraphics.fillCircle(28, 8, 2);
    whirlpoolGraphics.fillCircle(42, 18, 2);
    whirlpoolGraphics.generateTexture('whirlpool', 70, 25);

    // Trench - deep water pit (like pit)
    const trenchGraphics = this.make.graphics({ x: 0, y: 0, add: false });
    // Deep abyss
    trenchGraphics.fillStyle(0x000511);
    trenchGraphics.fillRect(0, 15, 100, 35);
    // Bioluminescent glow from below
    trenchGraphics.fillStyle(0x003366, 0.4);
    trenchGraphics.fillRect(10, 35, 80, 15);
    trenchGraphics.fillStyle(0x0066aa, 0.2);
    trenchGraphics.fillRect(20, 40, 60, 10);
    // Crumbling edge - coral rock
    trenchGraphics.fillStyle(0x1a3344);
    trenchGraphics.fillRect(0, 0, 100, 18);
    trenchGraphics.fillStyle(0x2a4455);
    trenchGraphics.fillRect(5, 3, 90, 12);
    // Edge coral
    trenchGraphics.fillStyle(0x004466);
    trenchGraphics.fillEllipse(15, 10, 12, 8);
    trenchGraphics.fillEllipse(85, 12, 10, 7);
    // Bubbles rising from depth
    trenchGraphics.fillStyle(0x66aacc, 0.5);
    trenchGraphics.fillCircle(30, 25, 3);
    trenchGraphics.fillCircle(50, 30, 2);
    trenchGraphics.fillCircle(70, 22, 3);
    trenchGraphics.generateTexture('trench', 100, 50);

    // Water jet - geyser shooting up (like firewall)
    const jetGraphics = this.make.graphics({ x: 0, y: 0, add: false });
    // Base vent
    jetGraphics.fillStyle(0x1a3344);
    jetGraphics.fillRect(5, 50, 20, 10);
    jetGraphics.fillStyle(0x2a4455);
    jetGraphics.fillRect(7, 52, 16, 6);
    // Water column
    jetGraphics.fillStyle(0x0055aa, 0.8);
    jetGraphics.fillRect(8, 10, 14, 42);
    // Inner stream
    jetGraphics.fillStyle(0x0077cc, 0.9);
    jetGraphics.fillRect(10, 8, 10, 44);
    // Bright core
    jetGraphics.fillStyle(0x44aadd);
    jetGraphics.fillRect(12, 5, 6, 47);
    // Spray at top
    jetGraphics.fillStyle(0x88ccee, 0.7);
    jetGraphics.fillCircle(15, 8, 8);
    jetGraphics.fillCircle(10, 12, 5);
    jetGraphics.fillCircle(20, 12, 5);
    // Bubbles in stream
    jetGraphics.fillStyle(0xaaddff, 0.6);
    jetGraphics.fillCircle(13, 25, 2);
    jetGraphics.fillCircle(17, 35, 2);
    jetGraphics.fillCircle(14, 45, 2);
    // Splash droplets
    jetGraphics.fillStyle(0x66ccff, 0.5);
    jetGraphics.fillCircle(5, 5, 3);
    jetGraphics.fillCircle(25, 6, 3);
    jetGraphics.fillCircle(8, 2, 2);
    jetGraphics.fillCircle(22, 3, 2);
    jetGraphics.generateTexture('waterjet', 30, 60);

    // ===== WATER ENEMY =====
    // Jellyfish - floating water enemy
    const jellyGraphics = this.make.graphics({ x: 0, y: 0, add: false });
    // Glow aura
    jellyGraphics.fillStyle(0x00ffff, 0.15);
    jellyGraphics.fillCircle(22, 20, 24);
    // Bell (head)
    jellyGraphics.fillStyle(0x3366aa, 0.7);
    jellyGraphics.fillEllipse(22, 18, 22, 18);
    jellyGraphics.fillStyle(0x4488cc, 0.8);
    jellyGraphics.fillEllipse(22, 16, 18, 14);
    // Inner glow
    jellyGraphics.fillStyle(0x66aaee, 0.6);
    jellyGraphics.fillEllipse(22, 14, 12, 10);
    jellyGraphics.fillStyle(0x88ccff, 0.5);
    jellyGraphics.fillEllipse(22, 12, 6, 6);
    // Tentacles
    jellyGraphics.fillStyle(0x4488cc, 0.6);
    jellyGraphics.fillRect(10, 28, 3, 18);
    jellyGraphics.fillRect(18, 30, 3, 16);
    jellyGraphics.fillRect(26, 28, 3, 20);
    jellyGraphics.fillRect(34, 30, 3, 14);
    // Glowing tips
    jellyGraphics.fillStyle(0x00ffff, 0.7);
    jellyGraphics.fillCircle(11, 46, 2);
    jellyGraphics.fillCircle(19, 46, 2);
    jellyGraphics.fillCircle(27, 48, 2);
    jellyGraphics.fillCircle(35, 44, 2);
    // Eyes
    jellyGraphics.fillStyle(0xffffff, 0.8);
    jellyGraphics.fillCircle(16, 16, 3);
    jellyGraphics.fillCircle(28, 16, 3);
    jellyGraphics.fillStyle(0x001133);
    jellyGraphics.fillCircle(16, 16, 1);
    jellyGraphics.fillCircle(28, 16, 1);
    jellyGraphics.generateTexture('jellyfish', 45, 50);

    // Water particle (blue bubble)
    const waterParticle = this.make.graphics({ x: 0, y: 0, add: false });
    waterParticle.fillStyle(0x66ccff);
    waterParticle.fillCircle(4, 4, 4);
    waterParticle.generateTexture('particle-water', 8, 8);

    // ===== RAIN THEME ASSETS =====
    this.createRainThemeAssets();
  }

  createRainThemeAssets() {
    // ===== RAIN BACKGROUNDS =====
    // Far background - stormy sky with lightning
    const rainBgFar = this.make.graphics({ x: 0, y: 0, add: false });
    // Dark storm gradient
    rainBgFar.fillGradientStyle(0x1a1a2e, 0x1a1a2e, 0x2d2d44, 0x2d2d44);
    rainBgFar.fillRect(0, 0, 800, 400);
    // Storm clouds - layered
    rainBgFar.fillStyle(0x252538);
    rainBgFar.fillEllipse(100, 60, 120, 50);
    rainBgFar.fillEllipse(300, 40, 150, 60);
    rainBgFar.fillEllipse(550, 55, 140, 55);
    rainBgFar.fillEllipse(750, 45, 100, 45);
    // Darker cloud undersides
    rainBgFar.fillStyle(0x1a1a28);
    rainBgFar.fillEllipse(100, 80, 100, 35);
    rainBgFar.fillEllipse(300, 65, 130, 40);
    rainBgFar.fillEllipse(550, 75, 120, 38);
    // Lightning glow in clouds
    rainBgFar.fillStyle(0x8866ff, 0.15);
    rainBgFar.fillEllipse(200, 50, 60, 40);
    rainBgFar.fillEllipse(500, 45, 50, 35);
    // Distant hills
    rainBgFar.fillStyle(0x1a1a25);
    rainBgFar.fillTriangle(-50, 400, 150, 220, 350, 400);
    rainBgFar.fillTriangle(250, 400, 450, 180, 650, 400);
    rainBgFar.fillTriangle(550, 400, 700, 240, 850, 400);
    // Rain streaks (light)
    rainBgFar.fillStyle(0x6666aa, 0.2);
    for (let i = 0; i < 30; i++) {
      const x = Math.random() * 800;
      const y = Math.random() * 400;
      rainBgFar.fillRect(x, y, 1, 15 + Math.random() * 10);
    }
    rainBgFar.generateTexture('bg-far-rain', 800, 400);

    // Mid background - closer storm details
    const rainBgMid = this.make.graphics({ x: 0, y: 0, add: false });
    rainBgMid.fillStyle(0x000000, 0);
    rainBgMid.fillRect(0, 0, 800, 400);
    // Rocky cliffs
    rainBgMid.fillStyle(0x252535);
    rainBgMid.fillTriangle(-30, 400, 100, 280, 230, 400);
    rainBgMid.fillTriangle(180, 400, 350, 250, 520, 400);
    rainBgMid.fillTriangle(450, 400, 600, 270, 750, 400);
    rainBgMid.fillTriangle(680, 400, 780, 300, 880, 400);
    // Cliff highlights (wet/shiny)
    rainBgMid.fillStyle(0x3a3a4a, 0.6);
    rainBgMid.fillTriangle(100, 280, 120, 280, 160, 330);
    rainBgMid.fillTriangle(350, 250, 370, 250, 410, 310);
    rainBgMid.fillTriangle(600, 270, 620, 270, 660, 320);
    // Puddles with reflection
    rainBgMid.fillStyle(0x3a3a55, 0.5);
    rainBgMid.fillEllipse(150, 385, 40, 8);
    rainBgMid.fillEllipse(400, 390, 50, 10);
    rainBgMid.fillEllipse(650, 388, 35, 7);
    // Heavy rain streaks
    rainBgMid.fillStyle(0x8888bb, 0.3);
    for (let i = 0; i < 40; i++) {
      const x = Math.random() * 800;
      const y = Math.random() * 400;
      rainBgMid.fillRect(x, y, 1, 20 + Math.random() * 15);
    }
    rainBgMid.generateTexture('bg-mid-rain', 800, 400);

    // Rain ground - muddy stone path
    const rainGround = this.make.graphics({ x: 0, y: 0, add: false });
    // Dark stone base
    rainGround.fillStyle(0x2a2a35);
    rainGround.fillRect(0, 0, 64, 64);
    // Wet surface sheen
    rainGround.fillStyle(0x3a3a45);
    rainGround.fillRect(0, 0, 64, 12);
    // Mud patches
    rainGround.fillStyle(0x3d3528);
    rainGround.fillEllipse(15, 8, 12, 6);
    rainGround.fillEllipse(45, 6, 10, 5);
    // Puddles
    rainGround.fillStyle(0x4a4a5a, 0.7);
    rainGround.fillEllipse(30, 5, 15, 4);
    // Stone cracks
    rainGround.fillStyle(0x1a1a22);
    rainGround.fillRect(10, 25, 6, 15);
    rainGround.fillRect(40, 35, 8, 18);
    rainGround.fillRect(25, 45, 12, 10);
    // Water reflection highlights
    rainGround.fillStyle(0x6666aa, 0.2);
    rainGround.fillRect(28, 3, 8, 2);
    rainGround.generateTexture('ground-rain', 64, 64);

    // ===== RAIN OBSTACLES =====
    // Lightning - electric bolt strike (like spike)
    const lightningGraphics = this.make.graphics({ x: 0, y: 0, add: false });
    // Ground scorch mark
    lightningGraphics.fillStyle(0x2a2a35);
    lightningGraphics.fillRect(10, 35, 30, 8);
    // Electric glow aura
    lightningGraphics.fillStyle(0xaa88ff, 0.3);
    lightningGraphics.fillRect(20, 0, 15, 42);
    // Main bolt - zigzag
    lightningGraphics.fillStyle(0xeedd00);
    lightningGraphics.fillTriangle(25, 0, 18, 12, 28, 12);
    lightningGraphics.fillTriangle(28, 10, 20, 22, 30, 22);
    lightningGraphics.fillTriangle(30, 20, 22, 35, 32, 35);
    // White-hot core
    lightningGraphics.fillStyle(0xffffaa);
    lightningGraphics.fillTriangle(25, 2, 20, 11, 27, 11);
    lightningGraphics.fillTriangle(27, 11, 22, 21, 29, 21);
    lightningGraphics.fillTriangle(29, 21, 24, 33, 31, 33);
    // Spark effects
    lightningGraphics.fillStyle(0xffff88, 0.8);
    lightningGraphics.fillCircle(18, 8, 3);
    lightningGraphics.fillCircle(32, 18, 3);
    lightningGraphics.fillCircle(22, 28, 3);
    // Ground impact glow
    lightningGraphics.fillStyle(0xaa88ff, 0.5);
    lightningGraphics.fillCircle(27, 38, 10);
    lightningGraphics.generateTexture('lightning', 50, 45);

    // Flood - rushing water hazard (like lava)
    const floodGraphics = this.make.graphics({ x: 0, y: 0, add: false });
    // Deep water base
    floodGraphics.fillStyle(0x2a3a4a);
    floodGraphics.fillRect(0, 10, 70, 15);
    // Turbulent surface
    floodGraphics.fillStyle(0x4a5a6a);
    floodGraphics.fillRect(0, 5, 70, 12);
    floodGraphics.fillStyle(0x5a6a7a);
    floodGraphics.fillRect(0, 2, 70, 8);
    // Wave crests
    floodGraphics.fillStyle(0x7a8a9a);
    floodGraphics.fillEllipse(15, 5, 12, 5);
    floodGraphics.fillEllipse(40, 4, 15, 6);
    floodGraphics.fillEllipse(60, 6, 10, 4);
    // Foam/white caps
    floodGraphics.fillStyle(0xaabbcc, 0.7);
    floodGraphics.fillCircle(12, 3, 4);
    floodGraphics.fillCircle(38, 2, 5);
    floodGraphics.fillCircle(58, 4, 3);
    // Debris
    floodGraphics.fillStyle(0x3a3a30);
    floodGraphics.fillRect(25, 6, 6, 3);
    floodGraphics.fillRect(50, 8, 4, 2);
    floodGraphics.generateTexture('flood', 70, 25);

    // Cliff - dangerous drop (like pit)
    const cliffGraphics = this.make.graphics({ x: 0, y: 0, add: false });
    // Deep void
    cliffGraphics.fillStyle(0x0a0a12);
    cliffGraphics.fillRect(0, 15, 100, 35);
    // Mist from below
    cliffGraphics.fillStyle(0x4a4a5a, 0.3);
    cliffGraphics.fillRect(10, 35, 80, 15);
    cliffGraphics.fillStyle(0x6a6a7a, 0.2);
    cliffGraphics.fillRect(20, 40, 60, 10);
    // Rocky edge
    cliffGraphics.fillStyle(0x2a2a35);
    cliffGraphics.fillRect(0, 0, 100, 18);
    cliffGraphics.fillStyle(0x3a3a45);
    cliffGraphics.fillRect(5, 3, 90, 12);
    // Crumbling rocks
    cliffGraphics.fillStyle(0x1a1a22);
    cliffGraphics.fillTriangle(0, 15, 18, 15, 10, 25);
    cliffGraphics.fillTriangle(82, 15, 100, 15, 90, 22);
    cliffGraphics.fillTriangle(40, 15, 60, 15, 50, 28);
    // Wet patches
    cliffGraphics.fillStyle(0x5a5a6a, 0.4);
    cliffGraphics.fillEllipse(20, 8, 12, 5);
    cliffGraphics.fillEllipse(70, 10, 10, 4);
    // Warning cracks
    cliffGraphics.fillStyle(0x1a1a25, 0.6);
    cliffGraphics.fillRect(15, 5, 2, 8);
    cliffGraphics.fillRect(50, 4, 3, 10);
    cliffGraphics.fillRect(80, 6, 2, 7);
    cliffGraphics.generateTexture('cliff', 100, 50);

    // Thundercloud - low storm cloud (like firewall, slide under)
    const cloudGraphics = this.make.graphics({ x: 0, y: 0, add: false });
    // Electric aura
    cloudGraphics.fillStyle(0x8866ff, 0.2);
    cloudGraphics.fillEllipse(20, 25, 28, 35);
    // Main cloud body - dark and ominous
    cloudGraphics.fillStyle(0x252535);
    cloudGraphics.fillEllipse(12, 20, 18, 15);
    cloudGraphics.fillEllipse(28, 18, 20, 18);
    cloudGraphics.fillEllipse(20, 28, 22, 16);
    // Darker underbelly
    cloudGraphics.fillStyle(0x1a1a28);
    cloudGraphics.fillEllipse(20, 32, 20, 12);
    // Inner glow from lightning
    cloudGraphics.fillStyle(0x4a4a6a);
    cloudGraphics.fillEllipse(18, 22, 10, 8);
    cloudGraphics.fillStyle(0x6666aa, 0.5);
    cloudGraphics.fillCircle(22, 20, 5);
    // Small lightning sparks beneath
    cloudGraphics.fillStyle(0xffee66, 0.7);
    cloudGraphics.fillTriangle(15, 38, 17, 45, 19, 38);
    cloudGraphics.fillTriangle(25, 40, 27, 48, 29, 40);
    // Rain drops from cloud
    cloudGraphics.fillStyle(0x6688aa, 0.6);
    cloudGraphics.fillRect(10, 42, 1, 8);
    cloudGraphics.fillRect(18, 45, 1, 10);
    cloudGraphics.fillRect(26, 43, 1, 9);
    cloudGraphics.fillRect(32, 44, 1, 8);
    cloudGraphics.generateTexture('thundercloud', 40, 55);

    // ===== RAIN ENEMY =====
    // Storm Slime - electric creature
    const slimeGraphics = this.make.graphics({ x: 0, y: 0, add: false });
    // Ground shadow
    slimeGraphics.fillStyle(0x1a1a25, 0.5);
    slimeGraphics.fillEllipse(22, 46, 30, 6);
    // Electric aura
    slimeGraphics.fillStyle(0x8866ff, 0.2);
    slimeGraphics.fillCircle(22, 30, 22);
    // Slime body - dark purple
    slimeGraphics.fillStyle(0x2a1a3a);
    slimeGraphics.fillEllipse(22, 32, 32, 24);
    // Inner gradient
    slimeGraphics.fillStyle(0x3a2a4a);
    slimeGraphics.fillEllipse(22, 30, 28, 20);
    // Electric veins
    slimeGraphics.fillStyle(0x8866ff, 0.5);
    slimeGraphics.fillRect(10, 28, 3, 10);
    slimeGraphics.fillRect(32, 30, 3, 8);
    slimeGraphics.fillRect(18, 36, 8, 2);
    // Glowing core
    slimeGraphics.fillStyle(0xaa88ff, 0.6);
    slimeGraphics.fillCircle(22, 28, 8);
    slimeGraphics.fillStyle(0xccaaff, 0.4);
    slimeGraphics.fillCircle(22, 26, 5);
    // Electric eyes
    slimeGraphics.fillStyle(0x1a0a2a);
    slimeGraphics.fillEllipse(14, 26, 8, 6);
    slimeGraphics.fillEllipse(30, 26, 8, 6);
    // Glowing pupils
    slimeGraphics.fillStyle(0xffee66);
    slimeGraphics.fillCircle(14, 26, 3);
    slimeGraphics.fillCircle(30, 26, 3);
    slimeGraphics.fillStyle(0xffffaa, 0.8);
    slimeGraphics.fillCircle(15, 25, 1);
    slimeGraphics.fillCircle(31, 25, 1);
    // Sparking top
    slimeGraphics.fillStyle(0xffee66, 0.6);
    slimeGraphics.fillTriangle(18, 12, 20, 8, 22, 12);
    slimeGraphics.fillTriangle(24, 10, 26, 6, 28, 10);
    slimeGraphics.generateTexture('stormslime', 45, 50);

    // Rain/storm particle
    const rainParticle = this.make.graphics({ x: 0, y: 0, add: false });
    rainParticle.fillStyle(0xaa88ff);
    rainParticle.fillCircle(4, 4, 4);
    rainParticle.generateTexture('particle-rain', 8, 8);

    // ===== BOSS SPRITES =====
    this.createBossAssets();
  }

  createBossAssets() {
    // ===== FIRE BOSS: INFERNO GOLEM =====
    // Large molten rock creature (120x140)
    const fireGolem = this.make.graphics({ x: 0, y: 0, add: false });
    // Body - dark volcanic rock
    fireGolem.fillStyle(0x2a1510);
    fireGolem.fillRoundedRect(20, 40, 80, 90, 10);
    // Lava cracks on body
    fireGolem.fillStyle(0xff4400);
    fireGolem.fillRect(35, 50, 4, 30);
    fireGolem.fillRect(55, 55, 3, 40);
    fireGolem.fillRect(75, 48, 4, 35);
    fireGolem.fillStyle(0xff6600);
    fireGolem.fillRect(45, 70, 20, 4);
    fireGolem.fillRect(40, 90, 30, 3);
    // Glowing core
    fireGolem.fillStyle(0xff2200, 0.8);
    fireGolem.fillCircle(60, 80, 15);
    fireGolem.fillStyle(0xffaa00, 0.6);
    fireGolem.fillCircle(60, 80, 10);
    // Head - angular rocky
    fireGolem.fillStyle(0x3a2015);
    fireGolem.fillRoundedRect(30, 10, 60, 40, 5);
    // Fiery eyes
    fireGolem.fillStyle(0xff0000);
    fireGolem.fillCircle(45, 28, 8);
    fireGolem.fillCircle(75, 28, 8);
    fireGolem.fillStyle(0xffff00);
    fireGolem.fillCircle(45, 28, 4);
    fireGolem.fillCircle(75, 28, 4);
    // Horns
    fireGolem.fillStyle(0x1a0a05);
    fireGolem.fillTriangle(25, 15, 35, 5, 40, 20);
    fireGolem.fillTriangle(95, 15, 85, 5, 80, 20);
    // Arms - massive rocky fists
    fireGolem.fillStyle(0x2a1510);
    fireGolem.fillRoundedRect(0, 50, 25, 50, 8);
    fireGolem.fillRoundedRect(95, 50, 25, 50, 8);
    // Lava in arms
    fireGolem.fillStyle(0xff4400);
    fireGolem.fillRect(8, 60, 3, 25);
    fireGolem.fillRect(105, 65, 3, 20);
    // Legs
    fireGolem.fillStyle(0x2a1510);
    fireGolem.fillRoundedRect(30, 125, 25, 20, 5);
    fireGolem.fillRoundedRect(65, 125, 25, 20, 5);
    fireGolem.generateTexture('boss-fire', 120, 145);

    // ===== WATER BOSS: KRAKEN =====
    // Giant squid/octopus creature (130x130)
    const kraken = this.make.graphics({ x: 0, y: 0, add: false });
    // Main body - bulbous head
    kraken.fillStyle(0x1a4466);
    kraken.fillEllipse(65, 40, 50, 40);
    // Body gradient/highlights
    kraken.fillStyle(0x2a6688, 0.6);
    kraken.fillEllipse(65, 35, 35, 25);
    // Eyes - large and menacing
    kraken.fillStyle(0x000000);
    kraken.fillEllipse(45, 40, 12, 15);
    kraken.fillEllipse(85, 40, 12, 15);
    kraken.fillStyle(0x00ffff);
    kraken.fillEllipse(45, 40, 6, 8);
    kraken.fillEllipse(85, 40, 6, 8);
    kraken.fillStyle(0xffffff);
    kraken.fillCircle(43, 37, 2);
    kraken.fillCircle(83, 37, 2);
    // Beak
    kraken.fillStyle(0x0a2233);
    kraken.fillTriangle(55, 55, 65, 70, 75, 55);
    // Tentacles - 6 wavy tentacles
    kraken.fillStyle(0x1a4466);
    // Left tentacles
    kraken.fillEllipse(15, 90, 12, 35);
    kraken.fillEllipse(35, 100, 10, 30);
    kraken.fillEllipse(50, 95, 8, 28);
    // Right tentacles
    kraken.fillEllipse(80, 95, 8, 28);
    kraken.fillEllipse(95, 100, 10, 30);
    kraken.fillEllipse(115, 90, 12, 35);
    // Suckers on tentacles
    kraken.fillStyle(0x4488aa);
    for (let i = 0; i < 3; i++) {
      kraken.fillCircle(15, 70 + i * 15, 3);
      kraken.fillCircle(35, 80 + i * 12, 2);
      kraken.fillCircle(95, 80 + i * 12, 2);
      kraken.fillCircle(115, 70 + i * 15, 3);
    }
    kraken.generateTexture('boss-water', 130, 130);

    // ===== STORM BOSS: STORM TITAN =====
    // Elemental storm giant (120x150)
    const stormTitan = this.make.graphics({ x: 0, y: 0, add: false });
    // Body - swirling clouds/mist
    stormTitan.fillStyle(0x3a3a5a);
    stormTitan.fillEllipse(60, 80, 45, 55);
    // Cloud wisps
    stormTitan.fillStyle(0x5a5a7a, 0.7);
    stormTitan.fillEllipse(40, 70, 20, 25);
    stormTitan.fillEllipse(80, 75, 18, 22);
    stormTitan.fillEllipse(60, 95, 25, 20);
    // Inner glow
    stormTitan.fillStyle(0xaa88ff, 0.4);
    stormTitan.fillEllipse(60, 80, 25, 30);
    // Head - stormy visage
    stormTitan.fillStyle(0x4a4a6a);
    stormTitan.fillEllipse(60, 25, 30, 25);
    // Lightning eyes
    stormTitan.fillStyle(0xffff00);
    stormTitan.fillCircle(48, 22, 6);
    stormTitan.fillCircle(72, 22, 6);
    stormTitan.fillStyle(0xffffff);
    stormTitan.fillCircle(48, 22, 3);
    stormTitan.fillCircle(72, 22, 3);
    // Crown of lightning
    stormTitan.fillStyle(0xffff66);
    stormTitan.fillTriangle(35, 10, 40, 0, 45, 12);
    stormTitan.fillTriangle(55, 8, 60, -5, 65, 8);
    stormTitan.fillTriangle(75, 10, 80, 0, 85, 12);
    // Arms - cloud tendrils
    stormTitan.fillStyle(0x4a4a6a);
    stormTitan.fillEllipse(15, 70, 18, 35);
    stormTitan.fillEllipse(105, 70, 18, 35);
    // Lightning crackling on arms
    stormTitan.fillStyle(0xffff00, 0.8);
    stormTitan.fillRect(12, 55, 2, 15);
    stormTitan.fillRect(18, 65, 2, 20);
    stormTitan.fillRect(102, 60, 2, 18);
    stormTitan.fillRect(108, 50, 2, 15);
    // Lower body - dissipating into mist
    stormTitan.fillStyle(0x3a3a5a, 0.5);
    stormTitan.fillEllipse(60, 130, 40, 25);
    stormTitan.fillStyle(0x3a3a5a, 0.3);
    stormTitan.fillEllipse(60, 145, 50, 15);
    stormTitan.generateTexture('boss-storm', 120, 155);

    // ===== BOSS PROJECTILES =====
    // Fireball (boss attack)
    const fireball = this.make.graphics({ x: 0, y: 0, add: false });
    fireball.fillStyle(0xff2200);
    fireball.fillCircle(15, 15, 12);
    fireball.fillStyle(0xff6600);
    fireball.fillCircle(15, 15, 8);
    fireball.fillStyle(0xffaa00);
    fireball.fillCircle(15, 15, 4);
    fireball.generateTexture('projectile-fire', 30, 30);

    // Water blast
    const waterBlast = this.make.graphics({ x: 0, y: 0, add: false });
    waterBlast.fillStyle(0x0066aa);
    waterBlast.fillEllipse(20, 12, 18, 10);
    waterBlast.fillStyle(0x00aaff);
    waterBlast.fillEllipse(20, 12, 12, 6);
    waterBlast.fillStyle(0x88ddff);
    waterBlast.fillEllipse(18, 10, 5, 3);
    waterBlast.generateTexture('projectile-water', 40, 24);

    // Lightning bolt
    const lightningBolt = this.make.graphics({ x: 0, y: 0, add: false });
    lightningBolt.fillStyle(0xffff00);
    lightningBolt.fillTriangle(10, 0, 18, 15, 8, 15);
    lightningBolt.fillTriangle(12, 12, 20, 27, 6, 27);
    lightningBolt.fillTriangle(8, 24, 16, 40, 4, 40);
    lightningBolt.fillStyle(0xffffff);
    lightningBolt.fillTriangle(12, 2, 16, 13, 10, 13);
    lightningBolt.fillTriangle(10, 14, 14, 22, 8, 22);
    lightningBolt.generateTexture('projectile-lightning', 24, 44);

    // Boss health bar background
    const healthBarBg = this.make.graphics({ x: 0, y: 0, add: false });
    healthBarBg.fillStyle(0x222222);
    healthBarBg.fillRoundedRect(0, 0, 200, 20, 5);
    healthBarBg.lineStyle(2, 0x444444);
    healthBarBg.strokeRoundedRect(0, 0, 200, 20, 5);
    healthBarBg.generateTexture('boss-healthbar-bg', 200, 20);

    // Boss health bar fill
    const healthBarFill = this.make.graphics({ x: 0, y: 0, add: false });
    healthBarFill.fillStyle(0xff3333);
    healthBarFill.fillRoundedRect(0, 0, 196, 16, 3);
    healthBarFill.generateTexture('boss-healthbar-fill', 196, 16);

    // ===== PLAYER EYE LASER =====
    // Golden laser beam from player's eyes
    const eyeLaser = this.make.graphics({ x: 0, y: 0, add: false });
    // Outer glow
    eyeLaser.fillStyle(0xffcc00, 0.4);
    eyeLaser.fillRect(0, 2, 40, 8);
    // Core beam
    eyeLaser.fillStyle(0xffff00);
    eyeLaser.fillRect(0, 4, 40, 4);
    // Hot center
    eyeLaser.fillStyle(0xffffff);
    eyeLaser.fillRect(0, 5, 40, 2);
    // Leading edge glow
    eyeLaser.fillStyle(0xffff88);
    eyeLaser.fillCircle(38, 6, 4);
    eyeLaser.generateTexture('eye-laser', 42, 12);

    // Player idle/walk sprite (standing still, facing right)
    const playerIdle = this.make.graphics({ x: 0, y: 0, add: false });
    // Cape (behind body) - yellow/gold flowing down
    playerIdle.fillStyle(0xcc9900);
    playerIdle.fillTriangle(28, 18, 38, 55, 22, 55);
    playerIdle.fillStyle(0xffcc00);
    playerIdle.fillTriangle(30, 20, 36, 52, 24, 52);
    // Boots - black
    playerIdle.fillStyle(0x1a1a1a);
    playerIdle.fillRoundedRect(8, 48, 12, 10, 2);
    playerIdle.fillRoundedRect(22, 48, 12, 10, 2);
    // Legs - black (standing straight)
    playerIdle.fillStyle(0x222222);
    playerIdle.fillRect(10, 38, 8, 12);
    playerIdle.fillRect(24, 38, 8, 12);
    // Body - black suit
    playerIdle.fillStyle(0x1a1a1a);
    playerIdle.fillRoundedRect(8, 18, 26, 22, 3);
    // Yellow "S" logo on chest
    playerIdle.fillStyle(0xffcc00);
    playerIdle.fillRoundedRect(14, 20, 14, 4, 2);
    playerIdle.fillRoundedRect(14, 20, 5, 6, 2);
    playerIdle.fillRoundedRect(15, 25, 12, 4, 2);
    playerIdle.fillRoundedRect(22, 28, 5, 6, 2);
    playerIdle.fillRoundedRect(14, 32, 14, 4, 2);
    // Belt
    playerIdle.fillStyle(0xffcc00);
    playerIdle.fillRect(8, 36, 26, 4);
    // Arms - at sides (idle pose)
    playerIdle.fillStyle(0x1a1a1a);
    playerIdle.fillRect(2, 20, 8, 18);
    playerIdle.fillRect(32, 20, 8, 18);
    // Hands - gloves yellow (at sides)
    playerIdle.fillStyle(0xffcc00);
    playerIdle.fillCircle(6, 40, 4);
    playerIdle.fillCircle(36, 40, 4);
    // Head
    playerIdle.fillStyle(0xe8b89d);
    playerIdle.fillCircle(21, 10, 9);
    // Mask - black domino mask
    playerIdle.fillStyle(0x1a1a1a);
    playerIdle.fillEllipse(15, 9, 8, 5);
    playerIdle.fillEllipse(27, 9, 8, 5);
    // Eyes through mask - white (alert/ready)
    playerIdle.fillStyle(0xffffff);
    playerIdle.fillEllipse(15, 9, 5, 3);
    playerIdle.fillEllipse(27, 9, 5, 3);
    // Hair - dark
    playerIdle.fillStyle(0x1a1a1a);
    playerIdle.fillTriangle(12, 4, 21, 0, 30, 4);
    // Determined mouth
    playerIdle.lineStyle(1, 0x5d4037);
    playerIdle.lineBetween(18, 15, 24, 15);
    playerIdle.generateTexture('player-idle', 45, 60);

    // Player firing laser pose (eyes glowing)
    const playerFiring = this.make.graphics({ x: 0, y: 0, add: false });
    // Cape (behind body)
    playerFiring.fillStyle(0xcc9900);
    playerFiring.fillTriangle(28, 18, 38, 55, 22, 55);
    playerFiring.fillStyle(0xffcc00);
    playerFiring.fillTriangle(30, 20, 36, 52, 24, 52);
    // Boots - black
    playerFiring.fillStyle(0x1a1a1a);
    playerFiring.fillRoundedRect(8, 48, 12, 10, 2);
    playerFiring.fillRoundedRect(22, 48, 12, 10, 2);
    // Legs - black
    playerFiring.fillStyle(0x222222);
    playerFiring.fillRect(10, 38, 8, 12);
    playerFiring.fillRect(24, 38, 8, 12);
    // Body - black suit
    playerFiring.fillStyle(0x1a1a1a);
    playerFiring.fillRoundedRect(8, 18, 26, 22, 3);
    // Yellow "S" logo on chest
    playerFiring.fillStyle(0xffcc00);
    playerFiring.fillRoundedRect(14, 20, 14, 4, 2);
    playerFiring.fillRoundedRect(14, 20, 5, 6, 2);
    playerFiring.fillRoundedRect(15, 25, 12, 4, 2);
    playerFiring.fillRoundedRect(22, 28, 5, 6, 2);
    playerFiring.fillRoundedRect(14, 32, 14, 4, 2);
    // Belt
    playerFiring.fillStyle(0xffcc00);
    playerFiring.fillRect(8, 36, 26, 4);
    // Arms - raised/braced for firing
    playerFiring.fillStyle(0x1a1a1a);
    playerFiring.fillRect(2, 18, 8, 14);
    playerFiring.fillRect(32, 18, 8, 14);
    // Hands - gloves yellow (fists)
    playerFiring.fillStyle(0xffcc00);
    playerFiring.fillCircle(6, 34, 4);
    playerFiring.fillCircle(36, 34, 4);
    // Head
    playerFiring.fillStyle(0xe8b89d);
    playerFiring.fillCircle(21, 10, 9);
    // Mask - black domino mask
    playerFiring.fillStyle(0x1a1a1a);
    playerFiring.fillEllipse(15, 9, 8, 5);
    playerFiring.fillEllipse(27, 9, 8, 5);
    // GLOWING EYES - bright yellow laser eyes!
    playerFiring.fillStyle(0xffff00);
    playerFiring.fillEllipse(15, 9, 6, 4);
    playerFiring.fillEllipse(27, 9, 6, 4);
    // White-hot center of eyes
    playerFiring.fillStyle(0xffffff);
    playerFiring.fillCircle(16, 9, 2);
    playerFiring.fillCircle(28, 9, 2);
    // Eye glow effect
    playerFiring.fillStyle(0xffff00, 0.4);
    playerFiring.fillCircle(15, 9, 8);
    playerFiring.fillCircle(27, 9, 8);
    // Hair - dark
    playerFiring.fillStyle(0x1a1a1a);
    playerFiring.fillTriangle(12, 4, 21, 0, 30, 4);
    // Gritted teeth
    playerFiring.lineStyle(1, 0x5d4037);
    playerFiring.lineBetween(17, 15, 25, 15);
    playerFiring.generateTexture('player-firing', 45, 60);

    // ===== HERO 2: ROWDY ROWAN =====
    // Blue armored adventurer with cyan cape (water theme)
    this.createHero2Sprites();

    // ===== HERO 3: HEL-CAT =====
    // Purple suited fierce warrior with grey cape (rain theme)
    this.createHero3Sprites();
  }

  createHero2Sprites() {
    // Aqua Knight - Running sprite
    const hero2 = this.make.graphics({ x: 0, y: 0, add: false });

    // Ground shadow
    hero2.fillStyle(0x000000, 0.3);
    hero2.fillEllipse(21, 58, 24, 6);

    // Cape - cyan/teal flowing
    hero2.fillStyle(0x006666);
    hero2.fillTriangle(26, 18, 46, 56, 16, 56);
    hero2.fillStyle(0x00aaaa);
    hero2.fillTriangle(28, 18, 44, 55, 18, 55);
    hero2.fillStyle(0x00cccc);
    hero2.fillTriangle(30, 20, 40, 52, 20, 52);

    // Boots - dark blue with silver trim
    hero2.fillStyle(0x003366);
    hero2.fillRoundedRect(8, 48, 12, 10, 2);
    hero2.fillRoundedRect(22, 48, 12, 10, 2);
    hero2.fillStyle(0x88aacc);
    hero2.fillRect(8, 48, 12, 2);
    hero2.fillRect(22, 48, 12, 2);

    // Legs - blue armor
    hero2.fillStyle(0x004488);
    hero2.fillRect(10, 38, 8, 12);
    hero2.fillRect(24, 38, 8, 12);
    hero2.fillStyle(0x0066aa, 0.4);
    hero2.fillRect(11, 39, 3, 10);
    hero2.fillRect(25, 39, 3, 10);

    // Body - blue armor with depth
    hero2.fillStyle(0x003366);
    hero2.fillRoundedRect(7, 17, 28, 24, 4);
    hero2.fillStyle(0x004488);
    hero2.fillRoundedRect(8, 18, 26, 22, 3);
    hero2.fillStyle(0x0066aa, 0.5);
    hero2.fillRoundedRect(10, 20, 8, 8, 2);
    hero2.fillRoundedRect(24, 20, 8, 8, 2);

    // Wave logo on chest (cyan)
    hero2.fillStyle(0x00cccc, 0.4);
    hero2.fillRoundedRect(13, 21, 16, 14, 3);
    hero2.fillStyle(0x00ffff);
    // Wave pattern
    hero2.lineStyle(3, 0x00ffff);
    hero2.beginPath();
    hero2.moveTo(14, 28);
    hero2.lineTo(18, 24);
    hero2.lineTo(22, 28);
    hero2.lineTo(26, 24);
    hero2.lineTo(28, 28);
    hero2.strokePath();

    // Belt with buckle - silver
    hero2.fillStyle(0x666688);
    hero2.fillRect(8, 36, 26, 4);
    hero2.fillStyle(0x88aacc);
    hero2.fillRect(8, 36, 26, 3);
    hero2.fillStyle(0xaaccee);
    hero2.fillRoundedRect(17, 35, 8, 5, 1);

    // Arms - blue armor
    hero2.fillStyle(0x003366);
    hero2.fillRoundedRect(1, 19, 10, 18, 3);
    hero2.fillRoundedRect(31, 19, 10, 18, 3);
    hero2.fillStyle(0x004488);
    hero2.fillRect(2, 20, 8, 16);
    hero2.fillRect(32, 20, 8, 16);

    // Hands - silver gauntlets
    hero2.fillStyle(0x666688);
    hero2.fillCircle(6, 38, 5);
    hero2.fillCircle(36, 38, 5);
    hero2.fillStyle(0x88aacc);
    hero2.fillCircle(6, 38, 4);
    hero2.fillCircle(36, 38, 4);

    // Head
    hero2.fillStyle(0xd4a57b);
    hero2.fillCircle(21, 11, 10);
    hero2.fillStyle(0xe8b89d);
    hero2.fillCircle(21, 10, 9);

    // Helmet visor - blue
    hero2.fillStyle(0x003366);
    hero2.fillEllipse(15, 9, 9, 6);
    hero2.fillEllipse(27, 9, 9, 6);
    hero2.fillStyle(0x004488);
    hero2.fillEllipse(15, 9, 8, 5);
    hero2.fillEllipse(27, 9, 8, 5);

    // Eyes - cyan glow
    hero2.fillStyle(0x00ffff);
    hero2.fillEllipse(15, 9, 4, 3);
    hero2.fillEllipse(27, 9, 4, 3);
    hero2.fillStyle(0x0066aa);
    hero2.fillCircle(16, 9, 1);
    hero2.fillCircle(28, 9, 1);

    // Hair - dark blue
    hero2.fillStyle(0x002244);
    hero2.fillTriangle(11, 5, 21, -1, 31, 5);
    hero2.fillStyle(0x003366);
    hero2.fillTriangle(12, 4, 21, 0, 30, 4);

    hero2.lineStyle(2, 0x8b5a3c);
    hero2.lineBetween(17, 15, 25, 15);

    hero2.generateTexture('player2', 48, 62);

    // Hero 2 sliding
    const hero2Slide = this.make.graphics({ x: 0, y: 0, add: false });
    hero2Slide.fillStyle(0x00cccc);
    hero2Slide.fillTriangle(0, 8, 12, 5, 8, 18);
    hero2Slide.fillStyle(0x004488);
    hero2Slide.fillRoundedRect(8, 6, 35, 14, 6);
    hero2Slide.fillStyle(0xe8b89d);
    hero2Slide.fillCircle(48, 12, 8);
    hero2Slide.fillStyle(0x003366);
    hero2Slide.fillEllipse(50, 11, 6, 4);
    hero2Slide.fillStyle(0x00ffff);
    hero2Slide.fillEllipse(52, 11, 3, 2);
    hero2Slide.fillStyle(0x88aacc);
    hero2Slide.fillCircle(4, 14, 4);
    hero2Slide.generateTexture('player2-slide', 58, 24);

    // Hero 2 idle
    const hero2Idle = this.make.graphics({ x: 0, y: 0, add: false });
    hero2Idle.fillStyle(0x00aaaa);
    hero2Idle.fillTriangle(28, 18, 38, 55, 22, 55);
    hero2Idle.fillStyle(0x00cccc);
    hero2Idle.fillTriangle(30, 20, 36, 52, 24, 52);
    hero2Idle.fillStyle(0x004488);
    hero2Idle.fillRoundedRect(8, 48, 12, 10, 2);
    hero2Idle.fillRoundedRect(22, 48, 12, 10, 2);
    hero2Idle.fillStyle(0x0066aa);
    hero2Idle.fillRect(10, 38, 8, 12);
    hero2Idle.fillRect(24, 38, 8, 12);
    hero2Idle.fillStyle(0x004488);
    hero2Idle.fillRoundedRect(8, 18, 26, 22, 3);
    hero2Idle.fillStyle(0x00ffff);
    hero2Idle.lineStyle(3, 0x00ffff);
    hero2Idle.beginPath();
    hero2Idle.moveTo(14, 28);
    hero2Idle.lineTo(18, 24);
    hero2Idle.lineTo(22, 28);
    hero2Idle.lineTo(26, 24);
    hero2Idle.lineTo(28, 28);
    hero2Idle.strokePath();
    hero2Idle.fillStyle(0x88aacc);
    hero2Idle.fillRect(8, 36, 26, 4);
    hero2Idle.fillStyle(0x004488);
    hero2Idle.fillRect(2, 20, 8, 18);
    hero2Idle.fillRect(32, 20, 8, 18);
    hero2Idle.fillStyle(0x88aacc);
    hero2Idle.fillCircle(6, 40, 4);
    hero2Idle.fillCircle(36, 40, 4);
    hero2Idle.fillStyle(0xe8b89d);
    hero2Idle.fillCircle(21, 10, 9);
    hero2Idle.fillStyle(0x004488);
    hero2Idle.fillEllipse(15, 9, 8, 5);
    hero2Idle.fillEllipse(27, 9, 8, 5);
    hero2Idle.fillStyle(0x00ffff);
    hero2Idle.fillEllipse(15, 9, 5, 3);
    hero2Idle.fillEllipse(27, 9, 5, 3);
    hero2Idle.fillStyle(0x003366);
    hero2Idle.fillTriangle(12, 4, 21, 0, 30, 4);
    hero2Idle.lineStyle(1, 0x5d4037);
    hero2Idle.lineBetween(18, 15, 24, 15);
    hero2Idle.generateTexture('player2-idle', 45, 60);

    // Hero 2 firing - cyan laser eyes
    const hero2Firing = this.make.graphics({ x: 0, y: 0, add: false });
    hero2Firing.fillStyle(0x00aaaa);
    hero2Firing.fillTriangle(28, 18, 38, 55, 22, 55);
    hero2Firing.fillStyle(0x00cccc);
    hero2Firing.fillTriangle(30, 20, 36, 52, 24, 52);
    hero2Firing.fillStyle(0x004488);
    hero2Firing.fillRoundedRect(8, 48, 12, 10, 2);
    hero2Firing.fillRoundedRect(22, 48, 12, 10, 2);
    hero2Firing.fillStyle(0x0066aa);
    hero2Firing.fillRect(10, 38, 8, 12);
    hero2Firing.fillRect(24, 38, 8, 12);
    hero2Firing.fillStyle(0x004488);
    hero2Firing.fillRoundedRect(8, 18, 26, 22, 3);
    hero2Firing.fillStyle(0x00ffff);
    hero2Firing.lineStyle(3, 0x00ffff);
    hero2Firing.beginPath();
    hero2Firing.moveTo(14, 28);
    hero2Firing.lineTo(18, 24);
    hero2Firing.lineTo(22, 28);
    hero2Firing.lineTo(26, 24);
    hero2Firing.lineTo(28, 28);
    hero2Firing.strokePath();
    hero2Firing.fillStyle(0x88aacc);
    hero2Firing.fillRect(8, 36, 26, 4);
    hero2Firing.fillStyle(0x004488);
    hero2Firing.fillRect(2, 18, 8, 14);
    hero2Firing.fillRect(32, 18, 8, 14);
    hero2Firing.fillStyle(0x88aacc);
    hero2Firing.fillCircle(6, 34, 4);
    hero2Firing.fillCircle(36, 34, 4);
    hero2Firing.fillStyle(0xe8b89d);
    hero2Firing.fillCircle(21, 10, 9);
    hero2Firing.fillStyle(0x004488);
    hero2Firing.fillEllipse(15, 9, 8, 5);
    hero2Firing.fillEllipse(27, 9, 8, 5);
    // Glowing cyan laser eyes
    hero2Firing.fillStyle(0x00ffff);
    hero2Firing.fillEllipse(15, 9, 6, 4);
    hero2Firing.fillEllipse(27, 9, 6, 4);
    hero2Firing.fillStyle(0xffffff);
    hero2Firing.fillCircle(16, 9, 2);
    hero2Firing.fillCircle(28, 9, 2);
    hero2Firing.fillStyle(0x00ffff, 0.4);
    hero2Firing.fillCircle(15, 9, 8);
    hero2Firing.fillCircle(27, 9, 8);
    hero2Firing.fillStyle(0x003366);
    hero2Firing.fillTriangle(12, 4, 21, 0, 30, 4);
    hero2Firing.lineStyle(1, 0x5d4037);
    hero2Firing.lineBetween(17, 15, 25, 15);
    hero2Firing.generateTexture('player2-firing', 45, 60);

    // Cyan eye laser for hero 2
    const cyanLaser = this.make.graphics({ x: 0, y: 0, add: false });
    cyanLaser.fillStyle(0x00cccc, 0.4);
    cyanLaser.fillRect(0, 2, 40, 8);
    cyanLaser.fillStyle(0x00ffff);
    cyanLaser.fillRect(0, 4, 40, 4);
    cyanLaser.fillStyle(0xffffff);
    cyanLaser.fillRect(0, 5, 40, 2);
    cyanLaser.fillStyle(0x88ffff);
    cyanLaser.fillCircle(38, 6, 4);
    cyanLaser.generateTexture('eye-laser2', 42, 12);
  }

  createHero3Sprites() {
    // HEL-CAT - Girl with cat powers and tiger outfit - Running sprite
    const hero3 = this.make.graphics({ x: 0, y: 0, add: false });

    // Ground shadow
    hero3.fillStyle(0x000000, 0.3);
    hero3.fillEllipse(21, 58, 24, 6);

    // Tiger tail (behind body) - curving upward
    hero3.fillStyle(0xcc6622);
    hero3.fillRoundedRect(30, 35, 16, 5, 2);
    hero3.fillCircle(44, 32, 4);
    hero3.fillStyle(0xff8833);
    hero3.fillRoundedRect(31, 36, 14, 3, 1);
    // Tail stripes
    hero3.fillStyle(0x222222);
    hero3.fillRect(34, 35, 2, 5);
    hero3.fillRect(40, 35, 2, 5);

    // Boots - tiger orange with black trim
    hero3.fillStyle(0xcc6622);
    hero3.fillRoundedRect(8, 48, 12, 10, 2);
    hero3.fillRoundedRect(22, 48, 12, 10, 2);
    hero3.fillStyle(0xff8833);
    hero3.fillRect(8, 48, 12, 2);
    hero3.fillRect(22, 48, 12, 2);
    // Boot stripes
    hero3.fillStyle(0x222222);
    hero3.fillRect(12, 50, 2, 6);
    hero3.fillRect(26, 50, 2, 6);

    // Legs - tiger suit
    hero3.fillStyle(0xcc6622);
    hero3.fillRect(10, 38, 8, 12);
    hero3.fillRect(24, 38, 8, 12);
    hero3.fillStyle(0xff8833, 0.6);
    hero3.fillRect(11, 39, 3, 10);
    hero3.fillRect(25, 39, 3, 10);
    // Leg stripes
    hero3.fillStyle(0x222222);
    hero3.fillRect(13, 40, 2, 4);
    hero3.fillRect(27, 40, 2, 4);

    // Body - tiger suit with stripes
    hero3.fillStyle(0xcc6622);
    hero3.fillRoundedRect(7, 17, 28, 24, 4);
    hero3.fillStyle(0xff8833);
    hero3.fillRoundedRect(8, 18, 26, 22, 3);
    // Tiger stripes on body
    hero3.fillStyle(0x222222);
    hero3.fillRect(10, 20, 2, 8);
    hero3.fillRect(16, 22, 2, 6);
    hero3.fillRect(24, 22, 2, 6);
    hero3.fillRect(30, 20, 2, 8);
    // Body highlight (feminine shape)
    hero3.fillStyle(0xffaa55, 0.4);
    hero3.fillRoundedRect(12, 20, 6, 6, 2);
    hero3.fillRoundedRect(24, 20, 6, 6, 2);

    // Cat paw logo on chest
    hero3.fillStyle(0x222222);
    hero3.fillCircle(21, 28, 5);
    // Paw pads
    hero3.fillStyle(0xffcc88);
    hero3.fillCircle(21, 29, 3);
    hero3.fillCircle(18, 25, 2);
    hero3.fillCircle(24, 25, 2);
    hero3.fillCircle(21, 24, 2);

    // Belt with cat buckle
    hero3.fillStyle(0x222222);
    hero3.fillRect(8, 36, 26, 4);
    hero3.fillStyle(0x333333);
    hero3.fillRect(8, 36, 26, 3);
    // Cat face buckle
    hero3.fillStyle(0xffcc00);
    hero3.fillCircle(21, 38, 3);
    hero3.fillStyle(0x222222);
    hero3.fillCircle(19, 37, 1);
    hero3.fillCircle(23, 37, 1);

    // Arms - tiger suit
    hero3.fillStyle(0xcc6622);
    hero3.fillRoundedRect(1, 19, 10, 18, 3);
    hero3.fillRoundedRect(31, 19, 10, 18, 3);
    hero3.fillStyle(0xff8833);
    hero3.fillRect(2, 20, 8, 16);
    hero3.fillRect(32, 20, 8, 16);
    // Arm stripes
    hero3.fillStyle(0x222222);
    hero3.fillRect(4, 22, 2, 5);
    hero3.fillRect(34, 22, 2, 5);
    hero3.fillRect(5, 30, 2, 4);
    hero3.fillRect(35, 30, 2, 4);

    // Hands - gloves with claws
    hero3.fillStyle(0x222222);
    hero3.fillCircle(6, 38, 5);
    hero3.fillCircle(36, 38, 5);
    hero3.fillStyle(0x333333);
    hero3.fillCircle(6, 38, 4);
    hero3.fillCircle(36, 38, 4);
    // Claws
    hero3.fillStyle(0xffffee);
    hero3.fillTriangle(2, 40, 4, 36, 6, 40);
    hero3.fillTriangle(6, 40, 8, 36, 10, 40);
    hero3.fillTriangle(32, 40, 34, 36, 36, 40);
    hero3.fillTriangle(36, 40, 38, 36, 40, 40);

    // Head
    hero3.fillStyle(0xd4a57b);
    hero3.fillCircle(21, 11, 10);
    hero3.fillStyle(0xe8b89d);
    hero3.fillCircle(21, 10, 9);
    // Face highlight
    hero3.fillStyle(0xf0c8a8, 0.5);
    hero3.fillCircle(18, 8, 3);

    // Cat ears on hood
    hero3.fillStyle(0xcc6622);
    hero3.fillTriangle(8, 6, 14, -4, 16, 8);
    hero3.fillTriangle(26, 8, 28, -4, 34, 6);
    hero3.fillStyle(0xff8833);
    hero3.fillTriangle(10, 5, 14, -2, 15, 7);
    hero3.fillTriangle(27, 7, 28, -2, 32, 5);
    // Inner ear pink
    hero3.fillStyle(0xffaaaa);
    hero3.fillTriangle(11, 4, 14, 0, 14, 5);
    hero3.fillTriangle(28, 5, 28, 0, 31, 4);

    // Tiger mask around eyes
    hero3.fillStyle(0xff8833);
    hero3.fillEllipse(15, 9, 7, 5);
    hero3.fillEllipse(27, 9, 7, 5);
    // Mask stripes
    hero3.fillStyle(0x222222);
    hero3.fillRect(10, 7, 2, 4);
    hero3.fillRect(30, 7, 2, 4);

    // Cat eyes - green with slitted pupils
    hero3.fillStyle(0x44ff44);
    hero3.fillEllipse(15, 9, 4, 3);
    hero3.fillEllipse(27, 9, 4, 3);
    // Slitted pupils
    hero3.fillStyle(0x111111);
    hero3.fillRect(15, 7, 1, 4);
    hero3.fillRect(27, 7, 1, 4);
    // Eye shine
    hero3.fillStyle(0xffffff, 0.7);
    hero3.fillCircle(14, 8, 1);
    hero3.fillCircle(26, 8, 1);

    // Long flowing hair (behind ears)
    hero3.fillStyle(0x442211);
    hero3.fillTriangle(6, 8, 10, 25, 16, 10);
    hero3.fillTriangle(26, 10, 32, 25, 36, 8);
    hero3.fillStyle(0x553322);
    hero3.fillTriangle(8, 9, 11, 22, 15, 10);
    hero3.fillTriangle(27, 10, 31, 22, 34, 9);

    // Nose - small cat-like
    hero3.fillStyle(0xffaaaa);
    hero3.fillTriangle(19, 12, 21, 10, 23, 12);

    // Cat whisker marks
    hero3.lineStyle(1, 0x222222);
    hero3.lineBetween(10, 12, 14, 11);
    hero3.lineBetween(10, 14, 14, 13);
    hero3.lineBetween(28, 11, 32, 12);
    hero3.lineBetween(28, 13, 32, 14);

    // Small smile
    hero3.lineStyle(1, 0x8b5a3c);
    hero3.lineBetween(18, 14, 24, 14);

    hero3.generateTexture('player3', 48, 62);

    // HEL-CAT sliding sprite
    const hero3Slide = this.make.graphics({ x: 0, y: 0, add: false });
    // Tail trailing
    hero3Slide.fillStyle(0xff8833);
    hero3Slide.fillRoundedRect(0, 8, 12, 4, 2);
    hero3Slide.fillStyle(0x222222);
    hero3Slide.fillRect(4, 8, 2, 4);
    // Body horizontal - tiger
    hero3Slide.fillStyle(0xff8833);
    hero3Slide.fillRoundedRect(8, 6, 35, 14, 6);
    // Tiger stripes
    hero3Slide.fillStyle(0x222222);
    hero3Slide.fillRect(15, 6, 2, 14);
    hero3Slide.fillRect(25, 6, 2, 14);
    hero3Slide.fillRect(35, 6, 2, 14);
    // Head forward
    hero3Slide.fillStyle(0xe8b89d);
    hero3Slide.fillCircle(48, 12, 8);
    // Tiger mask
    hero3Slide.fillStyle(0xff8833);
    hero3Slide.fillEllipse(50, 11, 6, 4);
    // Cat eyes
    hero3Slide.fillStyle(0x44ff44);
    hero3Slide.fillEllipse(52, 11, 3, 2);
    // Clawed hand
    hero3Slide.fillStyle(0x333333);
    hero3Slide.fillCircle(4, 14, 4);
    hero3Slide.fillStyle(0xffffee);
    hero3Slide.fillTriangle(1, 16, 3, 12, 5, 16);
    hero3Slide.generateTexture('player3-slide', 58, 24);

    // HEL-CAT idle sprite
    const hero3Idle = this.make.graphics({ x: 0, y: 0, add: false });
    // Tail hanging
    hero3Idle.fillStyle(0xff8833);
    hero3Idle.fillTriangle(30, 36, 38, 55, 28, 55);
    hero3Idle.fillStyle(0x222222);
    hero3Idle.fillRect(32, 42, 2, 8);
    // Boots
    hero3Idle.fillStyle(0xcc6622);
    hero3Idle.fillRoundedRect(8, 48, 12, 10, 2);
    hero3Idle.fillRoundedRect(22, 48, 12, 10, 2);
    // Legs
    hero3Idle.fillStyle(0xff8833);
    hero3Idle.fillRect(10, 38, 8, 12);
    hero3Idle.fillRect(24, 38, 8, 12);
    // Body
    hero3Idle.fillStyle(0xff8833);
    hero3Idle.fillRoundedRect(8, 18, 26, 22, 3);
    // Tiger stripes
    hero3Idle.fillStyle(0x222222);
    hero3Idle.fillRect(12, 20, 2, 8);
    hero3Idle.fillRect(20, 22, 2, 6);
    hero3Idle.fillRect(28, 20, 2, 8);
    // Cat paw logo
    hero3Idle.fillStyle(0x222222);
    hero3Idle.fillCircle(21, 28, 4);
    hero3Idle.fillStyle(0xffcc88);
    hero3Idle.fillCircle(21, 29, 2);
    // Belt
    hero3Idle.fillStyle(0x222222);
    hero3Idle.fillRect(8, 36, 26, 4);
    // Arms
    hero3Idle.fillStyle(0xff8833);
    hero3Idle.fillRect(2, 20, 8, 18);
    hero3Idle.fillRect(32, 20, 8, 18);
    // Clawed hands
    hero3Idle.fillStyle(0x333333);
    hero3Idle.fillCircle(6, 40, 4);
    hero3Idle.fillCircle(36, 40, 4);
    hero3Idle.fillStyle(0xffffee);
    hero3Idle.fillTriangle(3, 42, 5, 38, 7, 42);
    hero3Idle.fillTriangle(33, 42, 35, 38, 37, 42);
    // Head
    hero3Idle.fillStyle(0xe8b89d);
    hero3Idle.fillCircle(21, 10, 9);
    // Cat ears
    hero3Idle.fillStyle(0xff8833);
    hero3Idle.fillTriangle(10, 6, 14, -2, 16, 8);
    hero3Idle.fillTriangle(26, 8, 28, -2, 32, 6);
    hero3Idle.fillStyle(0xffaaaa);
    hero3Idle.fillTriangle(12, 4, 14, 0, 15, 5);
    hero3Idle.fillTriangle(27, 5, 28, 0, 30, 4);
    // Tiger mask
    hero3Idle.fillStyle(0xff8833);
    hero3Idle.fillEllipse(15, 9, 6, 4);
    hero3Idle.fillEllipse(27, 9, 6, 4);
    // Cat eyes
    hero3Idle.fillStyle(0x44ff44);
    hero3Idle.fillEllipse(15, 9, 4, 3);
    hero3Idle.fillEllipse(27, 9, 4, 3);
    hero3Idle.fillStyle(0x111111);
    hero3Idle.fillRect(15, 7, 1, 4);
    hero3Idle.fillRect(27, 7, 1, 4);
    // Flowing hair
    hero3Idle.fillStyle(0x553322);
    hero3Idle.fillTriangle(8, 9, 10, 20, 15, 10);
    hero3Idle.fillTriangle(27, 10, 32, 20, 34, 9);
    // Small mouth
    hero3Idle.lineStyle(1, 0x5d4037);
    hero3Idle.lineBetween(18, 14, 24, 14);
    hero3Idle.generateTexture('player3-idle', 45, 60);

    // HEL-CAT firing - glowing cat eyes with claw swipe effect
    const hero3Firing = this.make.graphics({ x: 0, y: 0, add: false });
    // Tail raised aggressively
    hero3Firing.fillStyle(0xff8833);
    hero3Firing.fillTriangle(30, 30, 42, 20, 28, 45);
    hero3Firing.fillStyle(0x222222);
    hero3Firing.fillRect(34, 28, 2, 8);
    // Boots
    hero3Firing.fillStyle(0xcc6622);
    hero3Firing.fillRoundedRect(8, 48, 12, 10, 2);
    hero3Firing.fillRoundedRect(22, 48, 12, 10, 2);
    // Legs
    hero3Firing.fillStyle(0xff8833);
    hero3Firing.fillRect(10, 38, 8, 12);
    hero3Firing.fillRect(24, 38, 8, 12);
    // Body
    hero3Firing.fillStyle(0xff8833);
    hero3Firing.fillRoundedRect(8, 18, 26, 22, 3);
    // Tiger stripes
    hero3Firing.fillStyle(0x222222);
    hero3Firing.fillRect(12, 20, 2, 8);
    hero3Firing.fillRect(20, 22, 2, 6);
    hero3Firing.fillRect(28, 20, 2, 8);
    // Belt
    hero3Firing.fillStyle(0x222222);
    hero3Firing.fillRect(8, 36, 26, 4);
    // Arms extended forward for attack
    hero3Firing.fillStyle(0xff8833);
    hero3Firing.fillRect(2, 18, 8, 14);
    hero3Firing.fillRect(32, 18, 8, 14);
    // Clawed hands with attack glow
    hero3Firing.fillStyle(0xffff88, 0.4);
    hero3Firing.fillCircle(6, 34, 8);
    hero3Firing.fillCircle(36, 34, 8);
    hero3Firing.fillStyle(0x333333);
    hero3Firing.fillCircle(6, 34, 4);
    hero3Firing.fillCircle(36, 34, 4);
    // Glowing claws
    hero3Firing.fillStyle(0xffffaa);
    hero3Firing.fillTriangle(2, 36, 4, 30, 6, 36);
    hero3Firing.fillTriangle(6, 36, 8, 30, 10, 36);
    hero3Firing.fillTriangle(32, 36, 34, 30, 36, 36);
    hero3Firing.fillTriangle(36, 36, 38, 30, 40, 36);
    // Head
    hero3Firing.fillStyle(0xe8b89d);
    hero3Firing.fillCircle(21, 10, 9);
    // Cat ears alert
    hero3Firing.fillStyle(0xff8833);
    hero3Firing.fillTriangle(8, 5, 14, -5, 16, 7);
    hero3Firing.fillTriangle(26, 7, 28, -5, 34, 5);
    hero3Firing.fillStyle(0xffaaaa);
    hero3Firing.fillTriangle(10, 3, 14, -2, 15, 5);
    hero3Firing.fillTriangle(27, 5, 28, -2, 32, 3);
    // Tiger mask
    hero3Firing.fillStyle(0xff8833);
    hero3Firing.fillEllipse(15, 9, 7, 5);
    hero3Firing.fillEllipse(27, 9, 7, 5);
    // Glowing cat eyes
    hero3Firing.fillStyle(0x44ff44);
    hero3Firing.fillEllipse(15, 9, 5, 4);
    hero3Firing.fillEllipse(27, 9, 5, 4);
    hero3Firing.fillStyle(0x88ff88, 0.5);
    hero3Firing.fillCircle(15, 9, 7);
    hero3Firing.fillCircle(27, 9, 7);
    hero3Firing.fillStyle(0x111111);
    hero3Firing.fillRect(15, 7, 1, 4);
    hero3Firing.fillRect(27, 7, 1, 4);
    hero3Firing.fillStyle(0xffffff);
    hero3Firing.fillCircle(14, 8, 1);
    hero3Firing.fillCircle(26, 8, 1);
    // Flowing hair
    hero3Firing.fillStyle(0x553322);
    hero3Firing.fillTriangle(6, 8, 10, 22, 15, 9);
    hero3Firing.fillTriangle(27, 9, 32, 22, 36, 8);
    // Fierce expression
    hero3Firing.lineStyle(1, 0x5d4037);
    hero3Firing.lineBetween(17, 14, 25, 14);
    hero3Firing.generateTexture('player3-firing', 45, 60);

    // Cat claw slash effect laser (replaces electric laser)
    const clawSlash = this.make.graphics({ x: 0, y: 0, add: false });
    // Three claw marks
    clawSlash.fillStyle(0xffff88, 0.6);
    clawSlash.fillRect(0, 0, 40, 3);
    clawSlash.fillRect(0, 5, 40, 3);
    clawSlash.fillRect(0, 10, 40, 3);
    clawSlash.fillStyle(0xffffff);
    clawSlash.fillRect(0, 1, 40, 1);
    clawSlash.fillRect(0, 6, 40, 1);
    clawSlash.fillRect(0, 11, 40, 1);
    // Sparkle at end
    clawSlash.fillStyle(0xffffcc);
    clawSlash.fillCircle(38, 6, 4);
    clawSlash.generateTexture('eye-laser3', 42, 14);
  }

  create() {
    // Create Super Stad character sprites programmatically
    createSuperStadSprites(this);

    // Create animations for the character
    createSuperStadAnimations(this);

    this.scene.start('TitleScene');
  }
}
