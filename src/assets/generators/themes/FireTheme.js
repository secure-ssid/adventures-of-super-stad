/**
 * FireTheme - Generates fire/volcanic theme backgrounds and assets
 * Extracted from BootScene.js lines 647-724
 */

import { COLORS, createTexture } from '../constants.js';
import { ObstacleFactory } from '../ObstacleFactory.js';
import { EnemyFactory } from '../EnemyFactory.js';
import { EnvironmentFactory } from '../EnvironmentFactory.js';

export class FireTheme {
  /**
   * Generate all fire theme assets
   * @param {Phaser.Scene} scene
   */
  static generateAssets(scene) {
    this.generateBackgrounds(scene);
    ObstacleFactory.generateFireTextures(scene);
    EnemyFactory.generateFireEnemy(scene);
    EnvironmentFactory.generateFireGround(scene);
  }

  /**
   * Generate fire theme backgrounds
   * @param {Phaser.Scene} scene
   */
  static generateBackgrounds(scene) {
    this.createFarBackground(scene);
    this.createMidBackground(scene);
  }

  /**
   * Far background - volcanic mountains with lava glow
   */
  static createFarBackground(scene) {
    createTexture(scene, 'bg-far', 800, 400, (g) => {
      // Sky gradient - dark red to deep purple (volcanic atmosphere)
      g.fillGradientStyle(0x1a0505, 0x1a0505, 0x2d1520, 0x2d1520);
      g.fillRect(0, 0, 800, 400);

      // Distant volcanic glow on horizon
      g.fillStyle(0x4a1a0a, 0.4);
      g.fillRect(0, 280, 800, 120);
      g.fillStyle(0x6b2510, 0.3);
      g.fillRect(0, 320, 800, 80);

      // Far mountain range (silhouettes)
      g.fillStyle(0x1a0808);
      g.fillTriangle(-50, 400, 120, 180, 290, 400);
      g.fillTriangle(200, 400, 380, 140, 560, 400);
      g.fillTriangle(450, 400, 600, 190, 750, 400);
      g.fillTriangle(650, 400, 780, 160, 900, 400);

      // Volcanic peaks with lava glow
      g.fillStyle(0x2a1010);
      g.fillTriangle(350, 400, 450, 120, 550, 400);

      // Lava glow at peak
      g.fillStyle(COLORS.FIRE_RED, 0.3);
      g.fillCircle(450, 130, 15);
      g.fillStyle(COLORS.FIRE_ORANGE, 0.2);
      g.fillCircle(450, 125, 25);

      // Smoke/ash particles in sky
      g.fillStyle(0x3a2020, 0.5);
      g.fillCircle(100, 80, 20);
      g.fillCircle(250, 50, 15);
      g.fillCircle(400, 70, 25);
      g.fillCircle(550, 40, 18);
      g.fillCircle(700, 90, 22);

      // Stars/embers
      g.fillStyle(0xff8844, 0.6);
      g.fillCircle(150, 100, 2);
      g.fillCircle(320, 60, 1);
      g.fillCircle(480, 85, 2);
      g.fillCircle(620, 45, 1);
      g.fillCircle(750, 75, 2);
    });
  }

  /**
   * Mid background - closer volcanic hills with detail
   */
  static createMidBackground(scene) {
    createTexture(scene, 'bg-mid', 800, 400, (g) => {
      // Transparent base
      g.fillStyle(0x000000, 0);
      g.fillRect(0, 0, 800, 400);

      // Rocky hills with craggy texture
      g.fillStyle(0x2a1510);
      g.fillTriangle(-30, 400, 80, 280, 200, 400);
      g.fillTriangle(150, 400, 300, 250, 450, 400);
      g.fillTriangle(380, 400, 520, 270, 660, 400);
      g.fillTriangle(580, 400, 700, 290, 830, 400);

      // Hill highlights (catching volcanic glow)
      g.fillStyle(0x4a2520, 0.7);
      g.fillTriangle(80, 280, 100, 280, 140, 340);
      g.fillTriangle(300, 250, 320, 250, 360, 320);
      g.fillTriangle(520, 270, 540, 270, 580, 330);

      // Lava streams between hills
      g.fillStyle(COLORS.FIRE_RED, 0.4);
      g.fillRect(195, 380, 8, 20);
      g.fillRect(445, 385, 6, 15);
      g.fillRect(655, 390, 5, 10);

      // Glow around lava
      g.fillStyle(COLORS.FIRE_ORANGE, 0.2);
      g.fillCircle(199, 385, 12);
      g.fillCircle(448, 388, 10);
      g.fillCircle(658, 392, 8);
    });
  }
}
