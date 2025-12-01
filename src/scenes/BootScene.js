/**
 * BootScene - Game initialization and asset loading
 *
 * This scene handles:
 * 1. Loading progress display
 * 2. External asset loading (sprite sheets, audio)
 * 3. Procedural asset generation via AssetLoader
 * 4. Transition to TitleScene
 *
 * Refactored from 2,208 lines to ~80 lines by extracting asset generation
 * into modular factories in src/assets/generators/
 */

import Phaser from 'phaser';
import { createSuperStadSprites, createSuperStadAnimations } from '../utils/CharacterSprites.js';
import { AssetLoader } from '../assets/generators/index.js';

// Set to false to load all themes/heroes/bosses (Full Vision mode)
const V1_MODE = true;

export default class BootScene extends Phaser.Scene {
  constructor() {
    super('BootScene');
  }

  preload() {
    this.showLoadingProgress();
    this.loadExternalAssets();
    this.generateProceduralAssets();
  }

  /**
   * Display loading progress bar
   */
  showLoadingProgress() {
    const { width, height } = this.cameras.main;

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
  }

  /**
   * Load external assets (sprite sheets, audio)
   */
  loadExternalAssets() {
    // Audio
    this.load.audio('music-gameplay', '/music/velocity-victory.mp3');

    // Super Stad sprite sheets (real art assets)
    this.load.spritesheet('superstad-run-sheet', 'assets/sprites/superstad-run.png', {
      frameWidth: 284,   // 1704px / 6 columns
      frameHeight: 318   // 1908px / 6 rows
    });

    this.load.spritesheet('superstad-jump-sheet', 'assets/sprites/superstad-run-jump.png', {
      frameWidth: 325,   // 1950px / 6 columns
      frameHeight: 382   // 2292px / 6 rows
    });
  }

  /**
   * Generate procedural textures using the modular factory system
   */
  generateProceduralAssets() {
    if (V1_MODE) {
      // V1: Only fire theme + Super Stad
      AssetLoader.generateV1Assets(this);
    } else {
      // Full Vision: All themes, heroes, and bosses
      AssetLoader.generateAllAssets(this);
    }
  }

  create() {
    // Create Super Stad character sprites from sprite sheets
    createSuperStadSprites(this);

    // Create animations for the character
    createSuperStadAnimations(this);

    // Transition to title screen
    this.scene.start('TitleScene');
  }
}
