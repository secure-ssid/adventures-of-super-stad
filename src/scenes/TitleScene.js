import Phaser from 'phaser';

// Polished Comic Book Style Title Screen
// Bold, heroic aesthetic with stable animations

export default class TitleScene extends Phaser.Scene {
  constructor() {
    super('TitleScene');
  }

  create() {
    const { width, height } = this.cameras.main;

    // Start background music
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

    // Layer 1: Dynamic gradient background
    this.createBackground(width, height);

    // Layer 2: Speed lines for action feel
    this.createSpeedLines(width, height);

    // Layer 3: Dramatic lighting effects
    this.createLightingEffects(width, height);

    // Layer 4: Comic burst behind title
    this.createComicBurst(width, height);

    // Layer 5: Title with comic styling
    this.createTitle(width, height);

    // Layer 6: Character showcase
    this.createCharacterShowcase(width, height);

    // Layer 7: Play button
    this.createPlayButton(width, height);

    // Layer 8: Subtle floating particles
    this.createAmbientParticles(width, height);

    // Footer text
    this.add.text(width / 2, height - 18, 'PRESS SPACE OR CLICK TO PLAY', {
      fontFamily: 'Arial Black, Arial',
      fontSize: '12px',
      color: '#ffcc00',
      letterSpacing: 4
    }).setOrigin(0.5).setAlpha(0.8);

    // Keyboard support
    this.input.keyboard.on('keydown-SPACE', () => this.startGame());
    this.input.keyboard.on('keydown-ENTER', () => this.startGame());
  }

  createBackground(width, height) {
    const bg = this.add.graphics();

    // Deep dramatic gradient - volcanic sunset
    for (let y = 0; y < height; y++) {
      const ratio = y / height;
      // Top: Deep purple-black → Bottom: Fiery orange-red
      const r = Math.floor(15 + ratio * 45);
      const g = Math.floor(5 + ratio * 15);
      const b = Math.floor(20 - ratio * 15);
      bg.fillStyle(Phaser.Display.Color.GetColor(r, g, b));
      bg.fillRect(0, y, width, 1);
    }

    // Volcanic mountain silhouettes with depth
    // Far mountains (darkest)
    bg.fillStyle(0x0a0408);
    bg.fillTriangle(-100, height, 80, height - 200, 260, height);
    bg.fillTriangle(180, height, 400, height - 180, 620, height);
    bg.fillTriangle(500, height, 720, height - 220, 940, height);

    // Mid mountains
    bg.fillStyle(0x150810);
    bg.fillTriangle(-50, height, 150, height - 140, 350, height);
    bg.fillTriangle(280, height, 480, height - 160, 680, height);
    bg.fillTriangle(580, height, 750, height - 130, 920, height);

    // Lava glow at mountain bases
    bg.fillStyle(0xff4400, 0.15);
    bg.fillRect(0, height - 60, width, 60);
    bg.fillStyle(0xff6600, 0.1);
    bg.fillRect(0, height - 40, width, 40);

    // Volcanic crater glows
    bg.fillStyle(0xff3300, 0.4);
    bg.fillCircle(400, height - 170, 8);
    bg.fillCircle(720, height - 210, 10);
    bg.fillStyle(0xff5500, 0.25);
    bg.fillCircle(400, height - 170, 15);
    bg.fillCircle(720, height - 210, 18);
  }

  createSpeedLines(width, height) {
    const speedLines = this.add.graphics();
    speedLines.setAlpha(0.08);

    // Diagonal speed lines radiating from center-left
    const centerX = width * 0.3;
    const centerY = height * 0.4;

    for (let i = 0; i < 20; i++) {
      const angle = (Math.PI / 6) + (i * 0.08);
      const length = 400 + Math.random() * 300;
      const thickness = 1 + Math.random() * 2;

      speedLines.lineStyle(thickness, 0xffcc00);
      speedLines.lineBetween(
        centerX,
        centerY,
        centerX + Math.cos(angle) * length,
        centerY + Math.sin(angle) * length
      );
    }
  }

  createLightingEffects(width, height) {
    // Dramatic spotlight from top-left
    const spotlight = this.add.graphics();
    spotlight.fillStyle(0xffaa00, 0.03);
    spotlight.fillTriangle(0, 0, width * 0.6, height, 0, height);
    spotlight.fillStyle(0xffcc00, 0.02);
    spotlight.fillTriangle(0, 0, width * 0.4, height, 0, height * 0.7);

    // Rim light effect on right
    spotlight.fillStyle(0xff6600, 0.04);
    spotlight.fillRect(width - 80, 0, 80, height);
    spotlight.fillStyle(0xff4400, 0.03);
    spotlight.fillRect(width - 40, 0, 40, height);
  }

  createComicBurst(width, height) {
    const burst = this.add.graphics();
    const centerX = width / 2;
    const centerY = 85;

    // Comic "POW!" style burst behind title
    burst.fillStyle(0xffcc00, 0.15);

    const points = 16;
    const innerRadius = 80;
    const outerRadius = 180;

    for (let i = 0; i < points; i++) {
      const angle1 = (i / points) * Math.PI * 2;
      const angle2 = ((i + 0.5) / points) * Math.PI * 2;
      const angle3 = ((i + 1) / points) * Math.PI * 2;

      burst.fillTriangle(
        centerX + Math.cos(angle1) * innerRadius,
        centerY + Math.sin(angle1) * innerRadius,
        centerX + Math.cos(angle2) * outerRadius,
        centerY + Math.sin(angle2) * outerRadius,
        centerX + Math.cos(angle3) * innerRadius,
        centerY + Math.sin(angle3) * innerRadius
      );
    }

    // Inner glow
    burst.fillStyle(0xffdd00, 0.1);
    burst.fillCircle(centerX, centerY, 100);
    burst.fillStyle(0xffee44, 0.08);
    burst.fillCircle(centerX, centerY, 70);
  }

  createTitle(width, height) {
    // "ADVENTURES OF" subtitle - crisp, no animation
    const subtitle = this.add.text(width / 2, 42, 'ADVENTURES OF', {
      fontFamily: 'Arial Black, Impact, Arial',
      fontSize: '18px',
      color: '#ff6b35',
      letterSpacing: 8
    }).setOrigin(0.5);

    // Main title with comic book styling
    // Shadow layers for depth
    this.add.text(width / 2 + 4, 88, 'SUPER STAD', {
      fontFamily: 'Arial Black, Impact, Arial',
      fontSize: '56px',
      color: '#000000'
    }).setOrigin(0.5).setAlpha(0.6);

    this.add.text(width / 2 + 2, 86, 'SUPER STAD', {
      fontFamily: 'Arial Black, Impact, Arial',
      fontSize: '56px',
      color: '#cc4400'
    }).setOrigin(0.5).setAlpha(0.8);

    // Main title - bold yellow with orange stroke
    const title = this.add.text(width / 2, 84, 'SUPER STAD', {
      fontFamily: 'Arial Black, Impact, Arial',
      fontSize: '56px',
      color: '#ffcc00',
      stroke: '#ff6600',
      strokeThickness: 4
    }).setOrigin(0.5);

    // Subtle scale pulse (no flicker, just gentle breathing)
    this.tweens.add({
      targets: title,
      scaleX: 1.015,
      scaleY: 1.015,
      duration: 2000,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    });

    // Fade in subtitle
    subtitle.setAlpha(0);
    this.tweens.add({
      targets: subtitle,
      alpha: 1,
      duration: 600,
      delay: 200,
      ease: 'Power2'
    });
  }

  createCharacterShowcase(width, height) {
    // Create Super Stad in heroic pose
    const charX = width / 2 - 160;
    const charY = 215;

    // Ground shadow
    const shadow = this.add.ellipse(charX, charY + 45, 60, 15, 0x000000, 0.3);

    // Character sprite with idle animation
    const player = this.add.sprite(charX, charY, 'superstad-idle-1');
    player.setScale(1.2);

    // Play idle animation if it exists
    if (this.anims.exists('superstad-idle')) {
      player.play('superstad-idle');
    }

    // Heroic glow behind character
    const glow = this.add.graphics();
    glow.fillStyle(0xffcc00, 0.15);
    glow.fillCircle(charX, charY, 50);
    glow.fillStyle(0xffaa00, 0.1);
    glow.fillCircle(charX, charY, 70);
    glow.setDepth(-1);

    // Gentle floating animation
    this.tweens.add({
      targets: [player, shadow],
      y: '+=5',
      duration: 1500,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    });

    // Shadow scale sync
    this.tweens.add({
      targets: shadow,
      scaleX: 0.9,
      scaleY: 0.9,
      duration: 1500,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    });

    // Slide in from left
    player.setX(charX - 80);
    player.setAlpha(0);
    this.tweens.add({
      targets: player,
      x: charX,
      alpha: 1,
      duration: 500,
      delay: 300,
      ease: 'Back.easeOut'
    });

    // Cape flutter particles
    this.time.addEvent({
      delay: 800,
      callback: () => {
        if (this.capeParticles) {
          this.capeParticles.emitParticleAt(charX - 15, charY - 10, 2);
        }
      },
      loop: true
    });
  }

  createPlayButton(width, height) {
    const buttonX = width / 2 + 80;
    const buttonY = 220;

    // Button container
    const buttonContainer = this.add.container(buttonX, buttonY);

    // Button glow (behind)
    const buttonGlow = this.add.rectangle(0, 0, 160, 50, 0xff6600, 0.3);
    buttonGlow.setStrokeStyle(2, 0xff8844, 0.5);

    // Main button
    const buttonBg = this.add.rectangle(0, 0, 150, 45, 0xff6b35);
    buttonBg.setStrokeStyle(3, 0xffaa00);
    buttonBg.setInteractive({ useHandCursor: true });

    // Button highlight (top half lighter)
    const buttonHighlight = this.add.rectangle(0, -8, 140, 18, 0xff8855, 0.4);

    // Button text
    const buttonText = this.add.text(0, 0, 'PLAY', {
      fontFamily: 'Arial Black, Impact, Arial',
      fontSize: '26px',
      color: '#ffffff',
      stroke: '#cc4400',
      strokeThickness: 2
    }).setOrigin(0.5);

    buttonContainer.add([buttonGlow, buttonBg, buttonHighlight, buttonText]);

    // Gentle pulse on glow
    this.tweens.add({
      targets: buttonGlow,
      alpha: 0.15,
      scaleX: 1.05,
      scaleY: 1.1,
      duration: 1000,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    });

    // Hover effects
    buttonBg.on('pointerover', () => {
      this.tweens.add({
        targets: buttonContainer,
        scaleX: 1.08,
        scaleY: 1.08,
        duration: 100
      });
      buttonBg.setFillStyle(0xff8855);
    });

    buttonBg.on('pointerout', () => {
      this.tweens.add({
        targets: buttonContainer,
        scaleX: 1,
        scaleY: 1,
        duration: 100
      });
      buttonBg.setFillStyle(0xff6b35);
    });

    buttonBg.on('pointerdown', () => this.startGame());

    // Slide in from right
    buttonContainer.setX(width + 100);
    this.tweens.add({
      targets: buttonContainer,
      x: buttonX,
      duration: 400,
      delay: 400,
      ease: 'Back.easeOut'
    });
  }

  createAmbientParticles(width, height) {
    // Floating ember particles (subtle, not distracting)
    this.capeParticles = this.add.particles(0, 0, 'particle-fire', {
      x: { min: 0, max: width },
      y: height + 10,
      speedY: { min: -30, max: -60 },
      speedX: { min: -5, max: 5 },
      scale: { start: 0.5, end: 0 },
      lifespan: { min: 4000, max: 6000 },
      alpha: { start: 0.4, end: 0 },
      frequency: 400,
      blendMode: 'ADD'
    });

    // Occasional bright ember
    this.add.particles(0, 0, 'particle-fire', {
      x: { min: 0, max: width },
      y: height + 10,
      speedY: { min: -50, max: -80 },
      speedX: { min: -10, max: 10 },
      scale: { start: 0.8, end: 0 },
      lifespan: { min: 2000, max: 4000 },
      alpha: { start: 0.6, end: 0 },
      frequency: 1500,
      tint: 0xffcc00,
      blendMode: 'ADD'
    });
  }

  startGame() {
    // Quick fade to black, then start
    this.cameras.main.fadeOut(300, 0, 0, 0);
    this.time.delayedCall(300, () => {
      this.scene.start('GameScene', { level: 1 });
    });
  }
}
