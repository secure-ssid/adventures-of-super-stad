import Phaser from 'phaser';
import { LEVELS, OBSTACLE_DAMAGE, POWERUP_EFFECTS } from '../config/levels.js';
import Player from '../objects/Player.js';
import SoundGenerator from '../utils/SoundGenerator.js';
import TouchControls from '../utils/TouchControls.js';

// V1 Weekend Build: Minimal gameplay with overlays for GameOver/LevelComplete

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('GameScene');
  }

  init(data) {
    this.levelId = data.level || 1;
    this.levelData = LEVELS[this.levelId - 1];
  }

  create() {
    const { width, height } = this.cameras.main;

    // Background color
    this.cameras.main.setBackgroundColor(this.levelData.bgColor);

    // Sound effects
    this.sfx = new SoundGenerator(this);

    // Background music
    this.bgMusic = this.sound.get('music-gameplay');
    if (this.cache.audio.exists('music-gameplay') && (!this.bgMusic || !this.bgMusic.isPlaying)) {
      this.bgMusic = this.sound.add('music-gameplay', { loop: true, volume: 0.35 });
      this.bgMusic.play();
    }

    // Game state
    this.isRunning = false;
    this.levelProgress = 0;
    this.gameEnded = false;

    // Create world
    this.createBackground();
    this.createGround();

    // Ground Y position
    this.groundSurfaceY = height - 44;

    // Create player
    this.player = new Player(this, 100, this.groundSurfaceY - 30, this.levelData.scrollSpeed);

    // Camera follows player
    this.cameras.main.startFollow(this.player.sprite, true, 1, 0);
    this.cameras.main.setFollowOffset(-300, 0);

    // Groups
    this.obstacles = this.physics.add.group();
    this.powerups = this.physics.add.group();

    // Spawn tracking
    this.spawnedObstacles = new Set();
    this.spawnedPowerups = new Set();

    // Portal at end
    this.portal = this.physics.add.sprite(
      this.levelData.length + 200,
      this.groundSurfaceY - 45,
      'portal'
    );
    this.portal.setImmovable(true);
    this.portal.body.allowGravity = false;

    // Portal glow animation
    this.tweens.add({
      targets: this.portal,
      alpha: 0.7,
      duration: 1000,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    });

    // Particles
    this.createParticleEmitters();

    // Collisions
    this.physics.add.collider(this.player.sprite, this.ground);
    this.physics.add.overlap(this.player.sprite, this.obstacles, this.hitObstacle, null, this);
    this.physics.add.overlap(this.player.sprite, this.powerups, this.collectPowerup, null, this);
    this.physics.add.overlap(this.player.sprite, this.portal, this.reachPortal, null, this);

    // HUD
    this.createHUD();

    // Input
    this.cursors = this.input.keyboard.createCursorKeys();
    this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    this.muteKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);

    // Touch controls
    this.touchControls = new TouchControls(this, {
      onTap: () => {
        if (!this.gameEnded) {
          if (!this.isRunning) {
            this.startRunning();
          } else {
            this.isRunning = false;
          }
        }
      },
      onSwipeUp: () => {
        if (!this.gameEnded && this.isRunning) {
          if (this.player.jump()) {
            this.sfx.playJump();
          }
        }
      }
    });

    // Start message
    this.startText = this.add.text(width / 2, height / 2 - 50, 'TAP to run | UP to jump', {
      font: '20px Arial',
      color: '#ffffff',
      stroke: '#000000',
      strokeThickness: 3
    }).setOrigin(0.5).setScrollFactor(0);

    // Level name
    this.add.text(width / 2, 60, this.levelData.name, {
      font: '18px Arial',
      color: '#ffcc00'
    }).setOrigin(0.5).setScrollFactor(0);
  }

  createBackground() {
    const { width, height } = this.cameras.main;

    // Far background (slow parallax)
    this.bgFar = this.add.tileSprite(0, 0, width * 2, height, 'bg-far')
      .setOrigin(0, 0)
      .setScrollFactor(0)
      .setDepth(-3);

    // Mid background (medium parallax)
    this.bgMid = this.add.tileSprite(0, 0, width * 2, height, 'bg-mid')
      .setOrigin(0, 0)
      .setScrollFactor(0)
      .setDepth(-2);
  }

  createGround() {
    const { width, height } = this.cameras.main;

    this.ground = this.physics.add.staticGroup();

    const tileWidth = 64;
    const groundY = height - 12;
    const numTiles = Math.ceil((this.levelData.length + 500) / tileWidth);

    for (let i = 0; i < numTiles; i++) {
      this.ground.create(i * tileWidth + tileWidth / 2, groundY, 'ground');
    }
  }

  createParticleEmitters() {
    // Heart powerup particles
    this.heartParticles = this.add.particles(0, 0, 'particle-pink', {
      speed: { min: 80, max: 180 },
      angle: { min: 0, max: 360 },
      scale: { start: 1.2, end: 0 },
      lifespan: 500,
      gravityY: 150,
      emitting: false
    });

    // Dust particles for landing
    this.dustParticles = this.add.particles(0, 0, 'particle-dust', {
      speed: { min: 20, max: 60 },
      angle: { min: 250, max: 290 },
      scale: { start: 1, end: 0 },
      lifespan: 300,
      gravityY: 50,
      emitting: false
    });
  }

  createHUD() {
    const { width } = this.cameras.main;

    // Hearts display
    this.heartIcons = [];
    for (let i = 0; i < this.player.maxHearts; i++) {
      const heart = this.add.image(30 + i * 30, 30, 'heart-ui').setScrollFactor(0);
      this.heartIcons.push(heart);
    }

    // Progress bar
    this.add.rectangle(width / 2, 30, 200, 20, 0x333333).setScrollFactor(0);
    this.progressBar = this.add.rectangle(width / 2 - 98, 30, 4, 16, 0x44ff44)
      .setScrollFactor(0)
      .setOrigin(0, 0.5);

    // Mute indicator
    this.muteIndicator = this.add.text(width - 30, 30, '[M]', {
      font: '12px Arial',
      color: '#888888'
    }).setScrollFactor(0).setOrigin(1, 0.5);
  }

  update() {
    if (this.gameEnded) return;

    // Mute toggle
    if (Phaser.Input.Keyboard.JustDown(this.muteKey)) {
      const isEnabled = this.sfx.toggleMute();
      this.muteIndicator.setColor(isEnabled ? '#888888' : '#ff0000');
    }

    // Jump input
    if (Phaser.Input.Keyboard.JustDown(this.cursors.up) ||
        Phaser.Input.Keyboard.JustDown(this.spaceKey)) {
      if (!this.isRunning) {
        this.startRunning();
      }
      if (this.player.jump()) {
        this.sfx.playJump();
      }
    }

    // Update player
    this.player.update(this.isRunning);

    if (this.isRunning) {
      // Parallax backgrounds
      this.bgFar.tilePositionX = this.cameras.main.scrollX * 0.1;
      this.bgMid.tilePositionX = this.cameras.main.scrollX * 0.3;

      // Progress
      this.levelProgress = Math.min(
        (this.player.sprite.x / this.levelData.length) * 100,
        100
      );
      this.progressBar.width = (this.levelProgress / 100) * 196;

      // Spawn objects
      this.spawnObjects();

      // Hide start text
      if (this.startText) {
        this.startText.destroy();
        this.startText = null;
      }
    }

    // Update hearts display
    this.updateHeartsDisplay();
  }

  startRunning() {
    this.isRunning = true;
    this.sfx.playStart();
    if (this.startText) {
      this.startText.destroy();
      this.startText = null;
    }
  }

  spawnObjects() {
    const playerX = this.player.sprite.x;
    const spawnDistance = 600;

    // Spawn obstacles
    this.levelData.obstacles.forEach((obs, index) => {
      if (!this.spawnedObstacles.has(index) && playerX + spawnDistance >= obs.x) {
        this.createObstacle(obs.type, obs.x);
        this.spawnedObstacles.add(index);
      }
    });

    // Spawn power-ups
    this.levelData.powerups.forEach((pu, index) => {
      if (!this.spawnedPowerups.has(index) && playerX + spawnDistance >= pu.x) {
        this.createPowerup(pu.type, pu.x);
        this.spawnedPowerups.add(index);
      }
    });
  }

  createObstacle(type, x) {
    let y = this.groundSurfaceY - 20;

    // Position based on type
    if (type === 'pit') {
      y = this.groundSurfaceY + 10;
    } else if (type === 'spike') {
      y = this.groundSurfaceY - 20;
    } else if (type === 'lava') {
      y = this.groundSurfaceY - 8;
    }

    const obstacle = this.obstacles.create(x, y, type);
    obstacle.setImmovable(true);
    obstacle.body.allowGravity = false;
    obstacle.obstacleType = type;
    obstacle.damage = OBSTACLE_DAMAGE[type] || 1;
  }

  createPowerup(type, x) {
    const y = this.groundSurfaceY - 55;

    const powerup = this.powerups.create(x, y, `${type}-powerup`);
    powerup.setImmovable(true);
    powerup.body.allowGravity = false;
    powerup.powerupType = type;

    // Float animation
    this.tweens.add({
      targets: powerup,
      y: y - 6,
      duration: 800,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    });
  }

  hitObstacle(playerSprite, obstacle) {
    if (this.gameEnded || !obstacle.active) return;

    // Check if player jumped over pit
    if (obstacle.obstacleType === 'pit' && !playerSprite.body.touching.down) {
      return;
    }

    // Skip if invulnerable
    if (this.player.isInvulnerable) return;

    // Take damage
    const damage = obstacle.damage;
    obstacle.destroy();
    this.player.takeDamage(damage);
    this.sfx.playDamage();

    // Camera shake
    this.cameras.main.shake(250, 0.015 + (damage * 0.01));
    this.cameras.main.flash(200, 255, 0, 0);

    // Check for game over
    this.checkGameOver();
  }

  collectPowerup(playerSprite, powerup) {
    if (!powerup.active || powerup.collected) return;
    powerup.collected = true;
    powerup.body.enable = false;

    const effect = POWERUP_EFFECTS[powerup.powerupType];

    if (effect.type === 'heal') {
      this.player.heal(effect.amount);
      this.sfx.playCollect();
      this.heartParticles.emitParticleAt(powerup.x, powerup.y, 12);
    }

    // Fade out
    this.tweens.add({
      targets: powerup,
      alpha: 0,
      y: powerup.y - 20,
      duration: 200,
      onComplete: () => powerup.destroy()
    });
  }

  reachPortal() {
    if (this.gameEnded) return;

    this.gameEnded = true;
    this.isRunning = false;
    this.player.sprite.setVelocityX(0);

    // Victory effect
    this.sfx.playLevelComplete();
    this.cameras.main.flash(500, 100, 255, 100);

    // Show Level Complete overlay
    this.time.delayedCall(500, () => this.showLevelCompleteOverlay());
  }

  updateHeartsDisplay() {
    this.heartIcons.forEach((heart, index) => {
      if (index < this.player.hearts) {
        heart.setTexture('heart-ui');
      } else {
        heart.setTexture('heart-empty');
      }
    });
  }

  checkGameOver() {
    if (this.player.hearts <= 0 && !this.gameEnded) {
      this.gameEnded = true;
      this.isRunning = false;
      this.sfx.playGameOver();

      // Death animation
      this.tweens.add({
        targets: this.player.sprite,
        alpha: 0,
        y: this.player.sprite.y - 50,
        duration: 500,
        onComplete: () => this.showGameOverOverlay()
      });
    }
  }

  // ===== GAME OVER OVERLAY =====
  showGameOverOverlay() {
    const { width, height } = this.cameras.main;
    const centerX = width / 2;
    const centerY = height / 2;

    // Dark overlay
    const overlay = this.add.rectangle(centerX, centerY, width, height, 0x000000, 0.8)
      .setScrollFactor(0).setDepth(100);

    // Title
    this.add.text(centerX, centerY - 60, 'GAME OVER', {
      font: 'bold 48px Arial',
      color: '#ff4444',
      stroke: '#000000',
      strokeThickness: 4
    }).setOrigin(0.5).setScrollFactor(0).setDepth(101);

    // Retry button
    const retryBg = this.add.rectangle(centerX, centerY + 20, 200, 50, 0xff6b35)
      .setScrollFactor(0).setDepth(101)
      .setInteractive({ useHandCursor: true });

    this.add.text(centerX, centerY + 20, 'RETRY', {
      font: 'bold 24px Arial',
      color: '#ffffff'
    }).setOrigin(0.5).setScrollFactor(0).setDepth(102);

    retryBg.on('pointerover', () => retryBg.setFillStyle(0xff8c5a));
    retryBg.on('pointerout', () => retryBg.setFillStyle(0xff6b35));
    retryBg.on('pointerdown', () => this.scene.restart());

    // Title button
    const titleBg = this.add.rectangle(centerX, centerY + 85, 160, 40, 0x4a3a6a)
      .setScrollFactor(0).setDepth(101)
      .setInteractive({ useHandCursor: true });

    this.add.text(centerX, centerY + 85, 'TITLE', {
      font: 'bold 18px Arial',
      color: '#ccaaff'
    }).setOrigin(0.5).setScrollFactor(0).setDepth(102);

    titleBg.on('pointerover', () => titleBg.setFillStyle(0x6a5a8a));
    titleBg.on('pointerout', () => titleBg.setFillStyle(0x4a3a6a));
    titleBg.on('pointerdown', () => this.scene.start('TitleScene'));

    // Keyboard shortcuts
    this.input.keyboard.once('keydown-SPACE', () => this.scene.restart());
    this.input.keyboard.once('keydown-ENTER', () => this.scene.restart());
  }

  // ===== LEVEL COMPLETE OVERLAY =====
  showLevelCompleteOverlay() {
    const { width, height } = this.cameras.main;
    const centerX = width / 2;
    const centerY = height / 2;

    // Bright overlay
    const overlay = this.add.rectangle(centerX, centerY, width, height, 0x000000, 0.7)
      .setScrollFactor(0).setDepth(100);

    // Title
    this.add.text(centerX, centerY - 70, 'LEVEL COMPLETE!', {
      font: 'bold 42px Arial',
      color: '#ffcc00',
      stroke: '#000000',
      strokeThickness: 4
    }).setOrigin(0.5).setScrollFactor(0).setDepth(101);

    // Hearts remaining
    const heartsText = `Hearts: ${this.player.hearts}/${this.player.maxHearts}`;
    this.add.text(centerX, centerY - 20, heartsText, {
      font: '20px Arial',
      color: '#ff6b9d'
    }).setOrigin(0.5).setScrollFactor(0).setDepth(101);

    // Play Again button
    const playAgainBg = this.add.rectangle(centerX, centerY + 40, 200, 50, 0x44aa44)
      .setScrollFactor(0).setDepth(101)
      .setInteractive({ useHandCursor: true });

    this.add.text(centerX, centerY + 40, 'PLAY AGAIN', {
      font: 'bold 22px Arial',
      color: '#ffffff'
    }).setOrigin(0.5).setScrollFactor(0).setDepth(102);

    playAgainBg.on('pointerover', () => playAgainBg.setFillStyle(0x66cc66));
    playAgainBg.on('pointerout', () => playAgainBg.setFillStyle(0x44aa44));
    playAgainBg.on('pointerdown', () => this.scene.restart());

    // Title button
    const titleBg = this.add.rectangle(centerX, centerY + 105, 160, 40, 0x4a3a6a)
      .setScrollFactor(0).setDepth(101)
      .setInteractive({ useHandCursor: true });

    this.add.text(centerX, centerY + 105, 'TITLE', {
      font: 'bold 18px Arial',
      color: '#ccaaff'
    }).setOrigin(0.5).setScrollFactor(0).setDepth(102);

    titleBg.on('pointerover', () => titleBg.setFillStyle(0x6a5a8a));
    titleBg.on('pointerout', () => titleBg.setFillStyle(0x4a3a6a));
    titleBg.on('pointerdown', () => this.scene.start('TitleScene'));

    // Keyboard shortcuts
    this.input.keyboard.once('keydown-SPACE', () => this.scene.restart());
    this.input.keyboard.once('keydown-ENTER', () => this.scene.restart());
  }
}
