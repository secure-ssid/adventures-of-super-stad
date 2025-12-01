/**
 * EnvironmentFactory - Generates environment textures (portal, ground)
 * Extracted from BootScene.js lines 337-371, 589-623
 */

import { COLORS, createTexture } from './constants.js';

export class EnvironmentFactory {
  /**
   * Generate all environment textures
   * @param {Phaser.Scene} scene
   */
  static generateTextures(scene) {
    this.createPortal(scene);
  }

  /**
   * Generate fire theme ground
   * @param {Phaser.Scene} scene
   */
  static generateFireGround(scene) {
    this.createGround(scene, 'fire');
  }

  /**
   * Generate water theme ground
   * @param {Phaser.Scene} scene
   */
  static generateWaterGround(scene) {
    this.createGround(scene, 'water');
  }

  /**
   * Generate rain theme ground
   * @param {Phaser.Scene} scene
   */
  static generateRainGround(scene) {
    this.createGround(scene, 'rain');
  }

  /**
   * Portal - level completion gateway
   */
  static createPortal(scene) {
    createTexture(scene, 'portal', 60, 90, (g) => {
      // Ancient stone arch
      g.fillStyle(0x37474f);
      g.fillRect(0, 0, 12, 90);
      g.fillRect(48, 0, 12, 90);
      g.fillRect(0, 0, 60, 15);

      // Stone detail
      g.fillStyle(0x546e7a);
      g.fillRect(2, 15, 8, 73);
      g.fillRect(50, 15, 8, 73);

      // Runes
      g.fillStyle(0x7e57c2);
      g.fillCircle(6, 30, 3);
      g.fillCircle(6, 50, 3);
      g.fillCircle(6, 70, 3);
      g.fillCircle(54, 30, 3);
      g.fillCircle(54, 50, 3);
      g.fillCircle(54, 70, 3);

      // Swirling energy
      g.fillStyle(0x4a148c);
      g.fillEllipse(30, 50, 32, 60);
      g.fillStyle(0x7b1fa2);
      g.fillEllipse(30, 50, 26, 50);
      g.fillStyle(0xab47bc);
      g.fillEllipse(30, 50, 18, 38);
      g.fillStyle(0xce93d8);
      g.fillEllipse(30, 50, 10, 22);

      // Sparkles
      g.fillStyle(COLORS.WHITE);
      g.fillCircle(22, 35, 2);
      g.fillCircle(38, 55, 3);
      g.fillCircle(28, 65, 2);
      g.fillCircle(35, 40, 2);
    });
  }

  /**
   * Theme-specific ground tile
   * @param {Phaser.Scene} scene
   * @param {string} theme - 'fire' | 'water' | 'rain'
   */
  static createGround(scene, theme) {
    const textureKey = theme === 'fire' ? 'ground' : `ground-${theme}`;

    createTexture(scene, textureKey, 64, 64, (g) => {
      if (theme === 'fire') {
        // Deep volcanic rock base
        g.fillStyle(COLORS.VOLCANIC_ROCK);
        g.fillRect(0, 0, 64, 64);

        // Cracked stone texture layers
        g.fillStyle(COLORS.VOLCANIC_ROCK_LIGHT);
        g.fillRect(0, 8, 64, 56);

        // Top edge - scorched stone
        g.fillStyle(0x4a3530);
        g.fillRect(0, 0, 64, 10);

        // Hot cracks with glow
        g.fillStyle(0x8a4030);
        g.fillRect(8, 3, 12, 4);
        g.fillRect(35, 5, 18, 3);
        g.fillRect(50, 2, 10, 5);

        // Lava veins deep in rock
        g.fillStyle(COLORS.FIRE_RED, 0.3);
        g.fillRect(15, 25, 3, 20);
        g.fillRect(40, 30, 2, 25);
        g.fillStyle(COLORS.FIRE_ORANGE, 0.2);
        g.fillRect(14, 24, 5, 3);
        g.fillRect(39, 29, 4, 3);

        // Stone texture detail
        g.fillStyle(0x1a0a0a);
        g.fillRect(5, 35, 8, 6);
        g.fillRect(28, 45, 10, 8);
        g.fillRect(48, 38, 12, 10);

        // Subtle grid cracks
        g.lineStyle(1, 0x1a1010, 0.4);
        g.lineBetween(0, 20, 64, 22);
        g.lineBetween(0, 42, 64, 40);
        g.lineBetween(22, 0, 20, 64);
        g.lineBetween(44, 0, 46, 64);

      } else if (theme === 'water') {
        // Underwater rock/coral base
        g.fillStyle(0x1a3344);
        g.fillRect(0, 0, 64, 64);
        g.fillStyle(0x2a4455);
        g.fillRect(0, 8, 64, 56);

        // Sandy top
        g.fillStyle(0x3a5566);
        g.fillRect(0, 0, 64, 10);

        // Coral patches
        g.fillStyle(0xff6688, 0.4);
        g.fillCircle(15, 40, 6);
        g.fillCircle(50, 35, 5);
        g.fillStyle(0x66ff88, 0.3);
        g.fillCircle(35, 50, 7);

        // Shells/pebbles
        g.fillStyle(0x5a7788);
        g.fillCircle(10, 25, 3);
        g.fillCircle(45, 55, 4);
        g.fillCircle(55, 20, 3);

      } else if (theme === 'rain') {
        // Wet stone/mud
        g.fillStyle(0x2a2a3a);
        g.fillRect(0, 0, 64, 64);
        g.fillStyle(0x3a3a4a);
        g.fillRect(0, 8, 64, 56);

        // Slick wet surface
        g.fillStyle(0x4a4a5a);
        g.fillRect(0, 0, 64, 10);

        // Puddles
        g.fillStyle(0x5566aa, 0.4);
        g.fillEllipse(20, 30, 15, 8);
        g.fillEllipse(50, 50, 12, 6);
        g.fillStyle(0x7788cc, 0.3);
        g.fillEllipse(20, 29, 10, 5);
        g.fillEllipse(50, 49, 8, 4);

        // Cracks in wet stone
        g.lineStyle(1, 0x222233, 0.5);
        g.lineBetween(5, 40, 30, 42);
        g.lineBetween(35, 25, 60, 28);
      }
    });
  }
}
