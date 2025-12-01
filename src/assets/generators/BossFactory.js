/**
 * BossFactory - Generates boss sprite and projectile textures
 * Extracted from BootScene.js lines 1259-1457
 * Note: Bosses are Full Vision feature, not needed for V1
 */

import { COLORS, createTexture } from './constants.js';

export class BossFactory {
  /**
   * Generate all boss textures
   * @param {Phaser.Scene} scene
   */
  static generateTextures(scene) {
    this.createFireBoss(scene);
    this.createWaterBoss(scene);
    this.createStormBoss(scene);
    this.createProjectiles(scene);
    this.createEyeLaser(scene);
  }

  /**
   * Generate only fire boss (for fire theme)
   * @param {Phaser.Scene} scene
   */
  static generateFireBoss(scene) {
    this.createFireBoss(scene);
    this.createFireProjectile(scene);
    this.createEyeLaser(scene);
  }

  /**
   * Fire Golem boss
   */
  static createFireBoss(scene) {
    createTexture(scene, 'boss-fire', 80, 100, (g) => {
      // Massive molten body
      g.fillStyle(0x2a0a0a);
      g.fillEllipse(40, 60, 75, 80);
      g.fillStyle(0x4a1a0a);
      g.fillEllipse(40, 55, 65, 70);

      // Lava cracks throughout body
      g.fillStyle(COLORS.FIRE_RED, 0.8);
      g.fillRect(15, 40, 6, 30);
      g.fillRect(60, 35, 6, 35);
      g.fillRect(30, 70, 20, 5);

      // Glowing core
      g.fillStyle(COLORS.FIRE_ORANGE, 0.6);
      g.fillCircle(40, 50, 15);
      g.fillStyle(COLORS.FIRE_YELLOW, 0.4);
      g.fillCircle(40, 50, 10);

      // Massive angry eyes
      g.fillStyle(0x0a0303);
      g.fillEllipse(25, 40, 15, 12);
      g.fillEllipse(55, 40, 15, 12);
      g.fillStyle(COLORS.FIRE_ORANGE);
      g.fillCircle(25, 40, 8);
      g.fillCircle(55, 40, 8);
      g.fillStyle(COLORS.FIRE_YELLOW);
      g.fillCircle(26, 39, 4);
      g.fillCircle(56, 39, 4);

      // Crown of flames
      for (let i = 0; i < 5; i++) {
        const x = 20 + i * 10;
        g.fillStyle(COLORS.FIRE_RED);
        g.fillTriangle(x, 20, x + 5, 5, x + 10, 20);
        g.fillStyle(COLORS.FIRE_YELLOW, 0.7);
        g.fillTriangle(x + 2, 18, x + 5, 8, x + 8, 18);
      }

      // Jagged mouth
      g.fillStyle(0x050202);
      g.fillRect(20, 60, 40, 15);
      g.fillStyle(COLORS.LAVA_DEEP, 0.8);
      g.fillRect(22, 62, 36, 11);
    });
  }

  /**
   * Kraken boss (water)
   */
  static createWaterBoss(scene) {
    createTexture(scene, 'boss-water', 100, 100, (g) => {
      // Main body
      g.fillStyle(0x1a3344);
      g.fillEllipse(50, 40, 80, 60);
      g.fillStyle(0x2a4455);
      g.fillEllipse(50, 38, 70, 50);

      // Tentacles
      const tentaclePositions = [[10, 70], [30, 80], [50, 85], [70, 80], [90, 70]];
      tentaclePositions.forEach(([x, y]) => {
        g.fillStyle(0x2a4455);
        g.fillRect(x - 4, y, 8, 25);
        g.fillStyle(0x3a5566);
        g.fillCircle(x, y + 25, 5);
      });

      // Angry eyes
      g.fillStyle(0x001122);
      g.fillEllipse(35, 35, 18, 14);
      g.fillEllipse(65, 35, 18, 14);
      g.fillStyle(COLORS.FIRE_YELLOW);
      g.fillCircle(35, 35, 8);
      g.fillCircle(65, 35, 8);
      g.fillStyle(0x001122);
      g.fillCircle(36, 36, 4);
      g.fillCircle(66, 36, 4);

      // Beak
      g.fillStyle(0x553322);
      g.fillTriangle(40, 50, 50, 65, 60, 50);
    });
  }

  /**
   * Storm Titan boss (rain)
   */
  static createStormBoss(scene) {
    createTexture(scene, 'boss-storm', 80, 100, (g) => {
      // Stormy body
      g.fillStyle(0x2a2a4a);
      g.fillEllipse(40, 55, 70, 85);
      g.fillStyle(0x3a3a5a);
      g.fillEllipse(40, 50, 60, 70);

      // Electric veins
      g.fillStyle(COLORS.LIGHTNING_CORE, 0.7);
      g.fillRect(20, 30, 3, 40);
      g.fillRect(57, 25, 3, 45);
      g.fillRect(35, 60, 10, 3);

      // Lightning crown
      g.fillStyle(COLORS.LIGHTNING);
      g.fillTriangle(25, 15, 30, 0, 35, 15);
      g.fillTriangle(45, 12, 50, -5, 55, 12);
      g.fillStyle(COLORS.WHITE, 0.8);
      g.fillTriangle(28, 14, 30, 3, 32, 14);
      g.fillTriangle(48, 11, 50, -2, 52, 11);

      // Electric eyes
      g.fillStyle(0x111133);
      g.fillCircle(28, 40, 10);
      g.fillCircle(52, 40, 10);
      g.fillStyle(COLORS.LIGHTNING);
      g.fillCircle(28, 40, 7);
      g.fillCircle(52, 40, 7);
      g.fillStyle(COLORS.WHITE);
      g.fillCircle(29, 39, 3);
      g.fillCircle(53, 39, 3);

      // Static mouth
      g.fillStyle(0x111133);
      g.fillRect(30, 60, 20, 10);
      g.fillStyle(COLORS.LIGHTNING_CORE, 0.6);
      g.fillRect(32, 62, 16, 6);
    });
  }

  /**
   * Create all projectile types
   */
  static createProjectiles(scene) {
    this.createFireProjectile(scene);
    this.createWaterProjectile(scene);
    this.createLightningProjectile(scene);
  }

  static createFireProjectile(scene) {
    createTexture(scene, 'projectile-fire', 20, 20, (g) => {
      g.fillStyle(COLORS.FIRE_RED, 0.5);
      g.fillCircle(10, 10, 10);
      g.fillStyle(COLORS.FIRE_ORANGE);
      g.fillCircle(10, 10, 7);
      g.fillStyle(COLORS.FIRE_YELLOW);
      g.fillCircle(10, 10, 4);
    });
  }

  static createWaterProjectile(scene) {
    createTexture(scene, 'projectile-water', 20, 20, (g) => {
      g.fillStyle(COLORS.WATER_MID, 0.5);
      g.fillCircle(10, 10, 10);
      g.fillStyle(COLORS.WATER_LIGHT);
      g.fillCircle(10, 10, 7);
      g.fillStyle(COLORS.WHITE, 0.7);
      g.fillCircle(8, 8, 3);
    });
  }

  static createLightningProjectile(scene) {
    createTexture(scene, 'projectile-lightning', 20, 20, (g) => {
      g.fillStyle(COLORS.LIGHTNING, 0.4);
      g.fillCircle(10, 10, 10);
      g.fillStyle(COLORS.LIGHTNING_CORE);
      g.fillRect(8, 2, 4, 16);
      g.fillRect(2, 8, 16, 4);
      g.fillStyle(COLORS.WHITE);
      g.fillCircle(10, 10, 3);
    });
  }

  /**
   * Eye laser for hero attacks
   */
  static createEyeLaser(scene) {
    createTexture(scene, 'eye-laser', 40, 10, (g) => {
      // Outer glow
      g.fillStyle(COLORS.FIRE_YELLOW, 0.4);
      g.fillRoundedRect(0, 0, 40, 10, 5);
      // Core beam
      g.fillStyle(COLORS.GOLD);
      g.fillRoundedRect(2, 2, 36, 6, 3);
      // Hot center
      g.fillStyle(COLORS.WHITE, 0.8);
      g.fillRoundedRect(4, 3, 32, 4, 2);
    });
  }
}
