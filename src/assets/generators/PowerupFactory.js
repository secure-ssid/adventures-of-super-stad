/**
 * PowerupFactory - Generates collectible power-up textures
 * Extracted from BootScene.js lines 373-432, 551-577
 */

import { COLORS, createTexture, drawGlowingCircle } from './constants.js';

export class PowerupFactory {
  /**
   * Generate all power-up textures
   * @param {Phaser.Scene} scene
   */
  static generateTextures(scene) {
    this.createHeartPowerup(scene);
    this.createShieldPowerup(scene);
    this.createCoin(scene);
    this.createAttackEffect(scene);
  }

  /**
   * Heart power-up - restores health
   * @param {Phaser.Scene} scene
   */
  static createHeartPowerup(scene) {
    createTexture(scene, 'heart-powerup', 36, 38, (g) => {
      // Outer magical glow
      g.fillStyle(0xff6699, 0.3);
      g.fillCircle(12, 12, 14);
      g.fillCircle(24, 12, 14);
      g.fillTriangle(0, 16, 36, 16, 18, 38);

      // Heart body - rich ruby
      g.fillStyle(0xcc1144);
      g.fillCircle(12, 13, 10);
      g.fillCircle(24, 13, 10);
      g.fillTriangle(3, 17, 33, 17, 18, 35);

      // Inner glow
      g.fillStyle(0xff3366);
      g.fillCircle(12, 12, 8);
      g.fillCircle(24, 12, 8);
      g.fillTriangle(5, 16, 31, 16, 18, 32);

      // Hot center
      g.fillStyle(0xff6688);
      g.fillCircle(12, 11, 5);
      g.fillCircle(24, 11, 5);

      // Sparkle highlights
      g.fillStyle(0xffaacc, 0.9);
      g.fillCircle(9, 9, 3);
      g.fillCircle(21, 9, 3);
      g.fillStyle(COLORS.WHITE, 0.8);
      g.fillCircle(8, 8, 2);
      g.fillCircle(20, 8, 1);
    });
  }

  /**
   * Shield power-up - blocks one hit
   * @param {Phaser.Scene} scene
   */
  static createShieldPowerup(scene) {
    createTexture(scene, 'shield-powerup', 36, 42, (g) => {
      // Outer magical glow
      g.fillStyle(0x00ccff, 0.3);
      g.fillRoundedRect(0, 0, 36, 28, 8);
      g.fillTriangle(0, 26, 36, 26, 18, 42);

      // Shield body - azure crystal
      g.fillStyle(0x0066aa);
      g.fillRoundedRect(4, 3, 28, 22, 5);
      g.fillTriangle(4, 23, 32, 23, 18, 38);

      // Inner layer
      g.fillStyle(COLORS.SHIELD_BLUE);
      g.fillRoundedRect(7, 6, 22, 16, 3);
      g.fillTriangle(7, 20, 29, 20, 18, 34);

      // Magical core
      g.fillStyle(0x00aaee);
      g.fillRoundedRect(10, 9, 16, 10, 2);

      // Center emblem - star
      g.fillStyle(COLORS.SHIELD_LIGHT);
      g.fillCircle(18, 16, 6);
      g.fillStyle(0x00ccff);
      g.fillTriangle(18, 10, 15, 18, 21, 18);
      g.fillTriangle(18, 22, 15, 14, 21, 14);

      // Highlights
      g.fillStyle(0xaaeeff, 0.8);
      g.fillCircle(11, 10, 3);
      g.fillStyle(COLORS.WHITE, 0.7);
      g.fillCircle(10, 9, 2);
    });
  }

  /**
   * Coin collectible
   * @param {Phaser.Scene} scene
   */
  static createCoin(scene) {
    createTexture(scene, 'coin', 24, 24, (g) => {
      // Outer glow
      g.fillStyle(COLORS.FIRE_YELLOW, 0.3);
      g.fillCircle(12, 12, 12);

      // Shadow/edge
      g.fillStyle(0x996600);
      g.fillCircle(12, 13, 10);

      // Main coin body - rich gold
      g.fillStyle(COLORS.GOLD);
      g.fillCircle(12, 12, 10);

      // Inner detail ring
      g.fillStyle(COLORS.GOLD_DARK);
      g.strokeCircle(12, 12, 7);

      // Embossed center
      g.fillStyle(0xffdd44);
      g.fillCircle(12, 11, 6);

      // Star/emblem in center
      g.fillStyle(0xeeaa00);
      g.fillTriangle(12, 7, 9, 13, 15, 13);
      g.fillTriangle(12, 15, 9, 10, 15, 10);

      // Shine highlight
      g.fillStyle(COLORS.FIRE_WHITE, 0.9);
      g.fillCircle(8, 8, 3);
      g.fillStyle(COLORS.WHITE, 0.7);
      g.fillCircle(7, 7, 2);
    });
  }

  /**
   * Attack burst effect
   * @param {Phaser.Scene} scene
   */
  static createAttackEffect(scene) {
    createTexture(scene, 'attack-effect', 40, 40, (g) => {
      // Burst effect with triangles
      g.fillStyle(COLORS.FIRE_YELLOW, 0.8);
      g.fillTriangle(20, 0, 15, 20, 25, 20);   // Top spike
      g.fillTriangle(40, 20, 20, 15, 20, 25);  // Right spike
      g.fillTriangle(20, 40, 25, 20, 15, 20);  // Bottom spike
      g.fillTriangle(0, 20, 20, 25, 20, 15);   // Left spike

      // Center glow
      g.fillStyle(COLORS.WHITE, 0.9);
      g.fillCircle(20, 20, 6);
    });
  }
}
