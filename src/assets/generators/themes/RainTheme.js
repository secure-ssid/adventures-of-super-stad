/**
 * RainTheme - Generates storm/rain theme backgrounds and assets
 * Extracted from BootScene.js lines 1001-1254
 */

import { COLORS, createTexture } from '../constants.js';
import { ObstacleFactory } from '../ObstacleFactory.js';
import { EnemyFactory } from '../EnemyFactory.js';
import { EnvironmentFactory } from '../EnvironmentFactory.js';

export class RainTheme {
  /**
   * Generate all rain theme assets
   * @param {Phaser.Scene} scene
   */
  static generateAssets(scene) {
    this.generateBackgrounds(scene);
    ObstacleFactory.generateRainTextures(scene);
    EnemyFactory.generateRainEnemy(scene);
    EnvironmentFactory.generateRainGround(scene);
  }

  /**
   * Generate rain theme backgrounds
   * @param {Phaser.Scene} scene
   */
  static generateBackgrounds(scene) {
    this.createFarBackground(scene);
    this.createMidBackground(scene);
  }

  /**
   * Far background - stormy sky with lightning
   * Note: Uses deterministic patterns instead of Math.random()
   */
  static createFarBackground(scene) {
    createTexture(scene, 'bg-far-rain', 800, 400, (g) => {
      // Storm sky gradient
      g.fillGradientStyle(COLORS.STORM_DARK, COLORS.STORM_DARK, COLORS.STORM_MID, COLORS.STORM_MID);
      g.fillRect(0, 0, 800, 400);

      // Storm clouds
      g.fillStyle(0x222233, 0.8);
      g.fillEllipse(100, 60, 120, 50);
      g.fillEllipse(300, 40, 150, 60);
      g.fillEllipse(550, 70, 130, 55);
      g.fillEllipse(750, 50, 100, 45);

      // Darker cloud centers
      g.fillStyle(0x111122, 0.6);
      g.fillEllipse(100, 55, 80, 35);
      g.fillEllipse(300, 35, 100, 40);
      g.fillEllipse(550, 65, 90, 38);

      // Distant hills in storm
      g.fillStyle(COLORS.STORM_LIGHT, 0.5);
      g.fillTriangle(-50, 400, 150, 280, 350, 400);
      g.fillTriangle(250, 400, 450, 260, 650, 400);
      g.fillTriangle(550, 400, 700, 300, 850, 400);

      // Rain streaks (deterministic positions)
      g.fillStyle(0x6677aa, 0.3);
      const rainPositions = [50, 120, 200, 280, 350, 430, 510, 580, 660, 740];
      rainPositions.forEach((x, i) => {
        const y = (i * 37) % 200;
        const height = 15 + (i * 7) % 15;
        g.fillRect(x, y, 1, height);
        g.fillRect(x + 30, y + 100, 1, height);
        g.fillRect(x + 15, y + 200, 1, height);
      });

      // Lightning flash hint
      g.fillStyle(COLORS.LIGHTNING, 0.1);
      g.fillRect(0, 0, 800, 400);
    });
  }

  /**
   * Mid background - closer storm elements
   */
  static createMidBackground(scene) {
    createTexture(scene, 'bg-mid-rain', 800, 400, (g) => {
      // Transparent base
      g.fillStyle(0x000000, 0);
      g.fillRect(0, 0, 800, 400);

      // Closer hills
      g.fillStyle(0x333344);
      g.fillTriangle(-30, 400, 100, 320, 230, 400);
      g.fillTriangle(180, 400, 350, 300, 520, 400);
      g.fillTriangle(450, 400, 600, 330, 750, 400);
      g.fillTriangle(680, 400, 780, 310, 880, 400);

      // Wet highlights
      g.fillStyle(0x4a4a5a, 0.5);
      g.fillTriangle(100, 320, 120, 320, 160, 370);
      g.fillTriangle(350, 300, 370, 300, 410, 360);
      g.fillTriangle(600, 330, 620, 330, 650, 380);

      // Puddle reflections at base
      g.fillStyle(0x5566aa, 0.3);
      g.fillEllipse(150, 395, 40, 8);
      g.fillEllipse(400, 392, 50, 10);
      g.fillEllipse(650, 396, 35, 7);

      // Heavy rain in foreground
      g.fillStyle(0x8899cc, 0.4);
      const fgRainPositions = [30, 90, 160, 240, 320, 400, 480, 560, 640, 720, 780];
      fgRainPositions.forEach((x, i) => {
        const height = 20 + (i * 5) % 15;
        g.fillRect(x, 50, 2, height);
        g.fillRect(x + 20, 150, 2, height);
        g.fillRect(x + 10, 250, 2, height);
        g.fillRect(x + 25, 350, 2, height);
      });
    });
  }
}
