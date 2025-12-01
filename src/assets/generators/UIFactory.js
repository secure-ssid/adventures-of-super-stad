/**
 * UIFactory - Generates HUD and UI element textures
 * Extracted from BootScene.js lines 625-646, 579-587
 */

import { COLORS, createTexture } from './constants.js';

export class UIFactory {
  /**
   * Generate all UI textures
   * @param {Phaser.Scene} scene
   */
  static generateTextures(scene) {
    this.createHeartUI(scene);
    this.createEmptyHeart(scene);
    this.createCoinUI(scene);
  }

  /**
   * Full heart for health display
   * @param {Phaser.Scene} scene
   */
  static createHeartUI(scene) {
    createTexture(scene, 'heart-ui', 26, 26, (g) => {
      // Heart shape with two circles and triangle
      g.fillStyle(COLORS.HEART_RED);
      g.fillCircle(8, 8, 7);
      g.fillCircle(18, 8, 7);
      g.fillTriangle(2, 10, 24, 10, 13, 24);

      // Highlight
      g.fillStyle(COLORS.HEART_PINK);
      g.fillCircle(7, 6, 3);
    });
  }

  /**
   * Empty heart for lost health
   * @param {Phaser.Scene} scene
   */
  static createEmptyHeart(scene) {
    createTexture(scene, 'heart-empty', 26, 26, (g) => {
      // Outline
      g.lineStyle(2, COLORS.HEART_DARK);
      g.strokeCircle(8, 8, 7);
      g.strokeCircle(18, 8, 7);

      // Dark fill
      g.fillStyle(0x330000);
      g.fillCircle(8, 8, 5);
      g.fillCircle(18, 8, 5);
      g.fillTriangle(4, 10, 22, 10, 13, 22);
    });
  }

  /**
   * Small coin icon for HUD display
   * @param {Phaser.Scene} scene
   */
  static createCoinUI(scene) {
    createTexture(scene, 'coin-ui', 20, 20, (g) => {
      // Base coin
      g.fillStyle(COLORS.GOLD);
      g.fillCircle(10, 10, 10);

      // Inner detail
      g.fillStyle(0xffdd44);
      g.fillCircle(10, 10, 7);

      // Shine
      g.fillStyle(0xffffaa);
      g.fillCircle(7, 7, 3);
    });
  }

  /**
   * Boss health bar background
   * @param {Phaser.Scene} scene
   */
  static createBossHealthBarBg(scene) {
    createTexture(scene, 'boss-healthbar-bg', 200, 20, (g) => {
      g.fillStyle(0x333333);
      g.fillRoundedRect(0, 0, 200, 20, 4);
      g.fillStyle(0x222222);
      g.fillRoundedRect(2, 2, 196, 16, 3);
    });
  }

  /**
   * Boss health bar fill
   * @param {Phaser.Scene} scene
   */
  static createBossHealthBarFill(scene) {
    createTexture(scene, 'boss-healthbar-fill', 196, 16, (g) => {
      g.fillStyle(COLORS.HEART_RED);
      g.fillRoundedRect(0, 0, 196, 16, 3);
      g.fillStyle(0xff4444, 0.6);
      g.fillRoundedRect(0, 0, 196, 8, 3);
    });
  }
}
