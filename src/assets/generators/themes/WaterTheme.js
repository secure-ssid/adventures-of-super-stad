/**
 * WaterTheme - Generates underwater theme backgrounds and assets
 * Extracted from BootScene.js lines 762-998
 */

import { COLORS, createTexture } from '../constants.js';
import { ObstacleFactory } from '../ObstacleFactory.js';
import { EnemyFactory } from '../EnemyFactory.js';
import { EnvironmentFactory } from '../EnvironmentFactory.js';

export class WaterTheme {
  /**
   * Generate all water theme assets
   * @param {Phaser.Scene} scene
   */
  static generateAssets(scene) {
    this.generateBackgrounds(scene);
    ObstacleFactory.generateWaterTextures(scene);
    EnemyFactory.generateWaterEnemy(scene);
    EnvironmentFactory.generateWaterGround(scene);
  }

  /**
   * Generate water theme backgrounds
   * @param {Phaser.Scene} scene
   */
  static generateBackgrounds(scene) {
    this.createFarBackground(scene);
    this.createMidBackground(scene);
  }

  /**
   * Far background - underwater cavern with light rays
   */
  static createFarBackground(scene) {
    createTexture(scene, 'bg-far-water', 800, 400, (g) => {
      // Deep ocean gradient
      g.fillGradientStyle(COLORS.WATER_DEEP, COLORS.WATER_DEEP, COLORS.WATER_MID, COLORS.WATER_MID);
      g.fillRect(0, 0, 800, 400);

      // Light rays from above
      g.fillStyle(0x0066aa, 0.15);
      g.fillTriangle(100, 0, 80, 400, 180, 400);
      g.fillTriangle(350, 0, 300, 400, 420, 400);
      g.fillTriangle(600, 0, 550, 400, 680, 400);
      g.fillStyle(COLORS.SHIELD_BLUE, 0.1);
      g.fillTriangle(120, 0, 110, 400, 160, 400);
      g.fillTriangle(380, 0, 350, 400, 400, 400);

      // Distant underwater mountains/coral
      g.fillStyle(0x002244);
      g.fillTriangle(-50, 400, 100, 200, 250, 400);
      g.fillTriangle(180, 400, 350, 160, 520, 400);
      g.fillTriangle(450, 400, 580, 180, 710, 400);
      g.fillTriangle(640, 400, 750, 150, 860, 400);

      // Coral silhouettes
      g.fillStyle(0x003366);
      g.fillEllipse(120, 350, 40, 60);
      g.fillEllipse(400, 340, 50, 70);
      g.fillEllipse(680, 355, 35, 55);

      // Bubbles
      g.fillStyle(COLORS.WATER_SURFACE, 0.4);
      g.fillCircle(80, 120, 4);
      g.fillCircle(220, 80, 3);
      g.fillCircle(450, 100, 5);
      g.fillCircle(600, 60, 3);
      g.fillCircle(720, 140, 4);
    });
  }

  /**
   * Mid background - coral reef silhouettes
   */
  static createMidBackground(scene) {
    createTexture(scene, 'bg-mid-water', 800, 400, (g) => {
      // Transparent base
      g.fillStyle(0x000000, 0);
      g.fillRect(0, 0, 800, 400);

      // Coral formations
      g.fillStyle(0x004466);
      g.fillEllipse(80, 360, 60, 80);
      g.fillEllipse(280, 350, 80, 100);
      g.fillEllipse(500, 365, 55, 70);
      g.fillEllipse(720, 355, 70, 90);

      // Coral detail colors
      g.fillStyle(0x006688, 0.6);
      g.fillEllipse(80, 340, 40, 50);
      g.fillEllipse(280, 330, 50, 60);
      g.fillEllipse(500, 345, 35, 45);
      g.fillEllipse(720, 335, 45, 55);

      // Seaweed
      g.fillStyle(0x226644, 0.7);
      g.fillRect(150, 320, 8, 80);
      g.fillRect(400, 330, 6, 70);
      g.fillRect(620, 340, 7, 60);

      // More bubbles
      g.fillStyle(COLORS.WHITE, 0.3);
      g.fillCircle(100, 280, 3);
      g.fillCircle(350, 260, 4);
      g.fillCircle(550, 290, 3);
    });
  }
}
