/**
 * EnemyFactory - Generates enemy sprite textures
 * Extracted from BootScene.js lines 434-549, 956-990, 1209-1248
 */

import { COLORS, createTexture } from './constants.js';

export class EnemyFactory {
  /**
   * Generate fire theme enemy
   * @param {Phaser.Scene} scene
   */
  static generateFireEnemy(scene) {
    this.createWhop(scene);
  }

  /**
   * Generate water theme enemy
   * @param {Phaser.Scene} scene
   */
  static generateWaterEnemy(scene) {
    this.createJellyfish(scene);
  }

  /**
   * Generate rain theme enemy
   * @param {Phaser.Scene} scene
   */
  static generateRainEnemy(scene) {
    this.createStormSlime(scene);
  }

  /**
   * Whop - volcanic fire demon (fire theme)
   */
  static createWhop(scene) {
    createTexture(scene, 'whop', 48, 54, (g) => {
      // Outer flame aura
      g.fillStyle(COLORS.FIRE_ORANGE, 0.15);
      g.fillCircle(24, 28, 30);
      g.fillStyle(COLORS.FIRE_RED, 0.2);
      g.fillCircle(24, 28, 26);

      // Ground shadow
      g.fillStyle(0x1a0505, 0.6);
      g.fillEllipse(24, 50, 38, 8);

      // Ember particles floating around
      g.fillStyle(0xff8800, 0.6);
      g.fillCircle(6, 12, 2);
      g.fillCircle(42, 16, 2);
      g.fillCircle(10, 8, 1);
      g.fillCircle(38, 10, 1);

      // Body - molten rock form with crust
      g.fillStyle(0x1a0505);
      g.fillEllipse(24, 34, 42, 36);
      g.fillStyle(0x2a0a0a);
      g.fillEllipse(24, 32, 40, 34);

      // Deep magma cracks
      g.fillStyle(COLORS.LAVA_MID);
      g.fillEllipse(24, 30, 36, 30);

      // Glowing lava veins with depth
      g.fillStyle(0xff2200, 0.7);
      g.fillRect(8, 28, 4, 16);
      g.fillRect(36, 26, 4, 18);
      g.fillRect(16, 40, 16, 4);
      g.fillStyle(COLORS.FIRE_ORANGE, 0.8);
      g.fillRect(9, 30, 2, 12);
      g.fillRect(37, 28, 2, 14);
      g.fillRect(18, 41, 12, 2);

      // Face area - darker volcanic rock
      g.fillStyle(0x2a1008);
      g.fillEllipse(24, 26, 32, 24);
      g.fillStyle(0x3a1510);
      g.fillEllipse(24, 25, 30, 22);

      // Evil eye sockets
      g.fillStyle(0x0a0303);
      g.fillEllipse(14, 24, 13, 11);
      g.fillEllipse(34, 24, 13, 11);

      // Eye fire glow - layered
      g.fillStyle(0xcc2200);
      g.fillCircle(14, 24, 7);
      g.fillCircle(34, 24, 7);
      g.fillStyle(COLORS.FIRE_ORANGE);
      g.fillCircle(14, 24, 5);
      g.fillCircle(34, 24, 5);

      // Burning pupils - menacing
      g.fillStyle(COLORS.FIRE_YELLOW);
      g.fillCircle(15, 24, 3);
      g.fillCircle(35, 24, 3);
      g.fillStyle(0xffee00);
      g.fillCircle(15, 23, 2);
      g.fillCircle(35, 23, 2);
      g.fillStyle(COLORS.WHITE, 0.9);
      g.fillCircle(15, 22, 1);
      g.fillCircle(35, 22, 1);

      // Angry brow ridges
      g.fillStyle(0x0a0303);
      g.fillTriangle(2, 18, 20, 18, 8, 24);
      g.fillTriangle(46, 18, 28, 18, 40, 24);
      g.fillStyle(0x1a0505);
      g.fillTriangle(4, 18, 18, 18, 8, 22);
      g.fillTriangle(44, 18, 30, 18, 40, 22);

      // Jagged flame mouth
      g.fillStyle(0x050202);
      g.fillRect(10, 34, 28, 10);

      // Inner mouth glow
      g.fillStyle(COLORS.LAVA_DEEP, 0.6);
      g.fillRect(12, 36, 24, 6);

      // Flame teeth
      g.fillStyle(0xcc2200);
      g.fillTriangle(12, 34, 18, 34, 15, 42);
      g.fillTriangle(20, 34, 26, 34, 23, 43);
      g.fillTriangle(28, 34, 34, 34, 31, 42);
      g.fillStyle(COLORS.FIRE_RED);
      g.fillTriangle(13, 34, 17, 34, 15, 40);
      g.fillTriangle(21, 34, 25, 34, 23, 41);
      g.fillTriangle(29, 34, 33, 34, 31, 40);
      g.fillStyle(COLORS.FIRE_YELLOW);
      g.fillTriangle(14, 34, 16, 34, 15, 38);
      g.fillTriangle(22, 34, 24, 34, 23, 39);
      g.fillTriangle(30, 34, 32, 34, 31, 38);
    });
  }

  /**
   * Jellyfish - water theme enemy
   */
  static createJellyfish(scene) {
    createTexture(scene, 'jellyfish', 40, 50, (g) => {
      // Outer glow
      g.fillStyle(0xff66ff, 0.2);
      g.fillEllipse(20, 15, 22, 18);

      // Bell/dome
      g.fillStyle(0x9944aa);
      g.fillEllipse(20, 15, 18, 14);
      g.fillStyle(0xaa66cc);
      g.fillEllipse(20, 14, 15, 11);
      g.fillStyle(0xcc88dd, 0.8);
      g.fillEllipse(20, 13, 10, 8);

      // Bioluminescent spots
      g.fillStyle(0xff88ff, 0.7);
      g.fillCircle(14, 12, 3);
      g.fillCircle(26, 12, 3);
      g.fillStyle(COLORS.WHITE, 0.6);
      g.fillCircle(13, 11, 2);
      g.fillCircle(25, 11, 2);

      // Tentacles
      const tentacleX = [8, 15, 25, 32];
      tentacleX.forEach((x, i) => {
        const wave = (i % 2 === 0) ? 2 : -2;
        g.fillStyle(0x7733aa, 0.7);
        g.fillRect(x, 25, 3, 10);
        g.fillRect(x + wave, 35, 3, 8);
        g.fillRect(x, 43, 2, 6);
      });

      // Stinger tips
      g.fillStyle(0xff44ff, 0.6);
      tentacleX.forEach(x => {
        g.fillCircle(x + 1, 48, 2);
      });
    });
  }

  /**
   * Storm Slime - rain theme enemy
   */
  static createStormSlime(scene) {
    createTexture(scene, 'stormslime', 44, 40, (g) => {
      // Outer static aura
      g.fillStyle(0x8888ff, 0.2);
      g.fillCircle(22, 24, 22);

      // Shadow
      g.fillStyle(0x222244, 0.5);
      g.fillEllipse(22, 38, 20, 5);

      // Body - storm grey with electric tint
      g.fillStyle(0x3a3a5a);
      g.fillEllipse(22, 26, 40, 28);
      g.fillStyle(0x4a4a6a);
      g.fillEllipse(22, 24, 36, 24);
      g.fillStyle(0x5a5a7a);
      g.fillEllipse(22, 22, 30, 20);

      // Electric veins
      g.fillStyle(COLORS.LIGHTNING_CORE, 0.6);
      g.fillRect(10, 20, 2, 10);
      g.fillRect(32, 18, 2, 12);
      g.fillRect(18, 28, 8, 2);

      // Face
      // Eyes - electric glow
      g.fillStyle(0x222244);
      g.fillCircle(14, 22, 6);
      g.fillCircle(30, 22, 6);
      g.fillStyle(COLORS.LIGHTNING);
      g.fillCircle(14, 22, 4);
      g.fillCircle(30, 22, 4);
      g.fillStyle(COLORS.WHITE);
      g.fillCircle(15, 21, 2);
      g.fillCircle(31, 21, 2);

      // Angry brows
      g.fillStyle(0x2a2a4a);
      g.fillTriangle(6, 16, 18, 18, 10, 22);
      g.fillTriangle(38, 16, 26, 18, 34, 22);

      // Grumpy mouth
      g.fillStyle(0x222244);
      g.fillRect(16, 30, 12, 4);

      // Lightning sparks on top
      g.fillStyle(COLORS.LIGHTNING_CORE, 0.8);
      g.fillTriangle(18, 8, 20, 0, 22, 8);
      g.fillTriangle(24, 6, 26, -2, 28, 6);
    });
  }
}
