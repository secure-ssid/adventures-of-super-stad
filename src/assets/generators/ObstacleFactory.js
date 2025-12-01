/**
 * ObstacleFactory - Generates obstacle textures
 * Extracted from BootScene.js lines 223-335
 */

import { COLORS, createTexture, drawFlame } from './constants.js';

export class ObstacleFactory {
  /**
   * Generate fire theme obstacles (V1)
   * @param {Phaser.Scene} scene
   */
  static generateFireTextures(scene) {
    this.createSpike(scene);
    this.createLava(scene);
    this.createPit(scene);
    this.createFirewall(scene);
  }

  /**
   * Generate water theme obstacles
   * @param {Phaser.Scene} scene
   */
  static generateWaterTextures(scene) {
    this.createUrchin(scene);
    this.createWhirlpool(scene);
    this.createTrench(scene);
    this.createWaterjet(scene);
  }

  /**
   * Generate rain theme obstacles
   * @param {Phaser.Scene} scene
   */
  static generateRainTextures(scene) {
    this.createLightning(scene);
    this.createFlood(scene);
    this.createCliff(scene);
    this.createThundercloud(scene);
  }

  /**
   * Spikes - obsidian volcanic crystals
   */
  static createSpike(scene) {
    createTexture(scene, 'spike', 50, 40, (g) => {
      // Volcanic rock base
      g.fillStyle(COLORS.VOLCANIC_ROCK);
      g.fillRect(0, 32, 50, 8);
      g.fillStyle(COLORS.VOLCANIC_ROCK_LIGHT);
      g.fillRect(5, 34, 40, 4);

      // Crystal spikes - dark obsidian with fiery glow
      const spikePositions = [[10, 38], [25, 38], [40, 38]];
      spikePositions.forEach(([x, baseY], i) => {
        const height = i === 1 ? 38 : 30;

        // Obsidian body
        g.fillStyle(0x1a0a0a);
        g.fillTriangle(x, baseY - height, x - 7, baseY, x + 7, baseY);

        // Inner fire glow
        g.fillStyle(0x4a1a0a, 0.6);
        g.fillTriangle(x, baseY - height + 8, x - 4, baseY - 5, x + 4, baseY - 5);

        // Hot edge
        g.fillStyle(COLORS.FIRE_RED, 0.4);
        g.fillTriangle(x, baseY - height, x - 2, baseY - height + 10, x + 2, baseY - height + 10);

        // Sharp tip glow
        g.fillStyle(COLORS.FIRE_ORANGE, 0.7);
        g.fillCircle(x, baseY - height + 3, 2);
      });
    });
  }

  /**
   * Lava - bubbling molten pool
   */
  static createLava(scene) {
    createTexture(scene, 'lava', 70, 25, (g) => {
      // Deep magma core
      g.fillStyle(COLORS.LAVA_DEEP);
      g.fillRect(0, 15, 70, 10);

      // Mid layer - hot orange
      g.fillStyle(COLORS.LAVA_MID);
      g.fillRect(0, 10, 70, 10);

      // Active surface - bright orange/yellow
      g.fillStyle(0xcc4400);
      g.fillRect(0, 5, 70, 10);
      g.fillStyle(0xff5500);
      g.fillRect(3, 3, 64, 8);

      // Molten surface texture
      g.fillStyle(0xff7700);
      g.fillEllipse(15, 8, 12, 6);
      g.fillEllipse(40, 6, 15, 5);
      g.fillEllipse(58, 9, 10, 5);

      // White-hot spots
      g.fillStyle(COLORS.FIRE_YELLOW);
      g.fillCircle(12, 6, 4);
      g.fillCircle(38, 5, 5);
      g.fillCircle(55, 7, 3);

      // Bubbles
      g.fillStyle(COLORS.GOLD);
      g.fillCircle(20, 4, 3);
      g.fillCircle(45, 3, 2);

      // Bright glow on bubbles
      g.fillStyle(COLORS.FIRE_WHITE, 0.8);
      g.fillCircle(11, 4, 2);
      g.fillCircle(37, 3, 2);

      // Edge crust
      g.fillStyle(0x2a1510);
      g.fillRect(0, 0, 4, 25);
      g.fillRect(66, 0, 4, 25);
    });
  }

  /**
   * Pit - deadly void (instant death)
   */
  static createPit(scene) {
    createTexture(scene, 'pit', 100, 60, (g) => {
      // Pure black void
      g.fillStyle(0x050505);
      g.fillRect(0, 0, 100, 60);

      // Subtle lava glow at the very bottom
      g.fillStyle(0x330a00, 0.6);
      g.fillRect(10, 45, 80, 15);
      g.fillStyle(COLORS.FIRE_RED, 0.2);
      g.fillRect(20, 50, 60, 10);

      // Thin danger line at top edge
      g.fillStyle(0xff2200, 0.4);
      g.fillRect(0, 0, 100, 2);
    });
  }

  /**
   * Firewall - roaring flame barrier (player must slide under)
   */
  static createFirewall(scene) {
    createTexture(scene, 'firewall', 30, 60, (g) => {
      // Brazier/emitter base
      g.fillStyle(COLORS.VOLCANIC_ROCK);
      g.fillRect(5, 50, 20, 10);
      g.fillStyle(COLORS.VOLCANIC_ROCK_LIGHT);
      g.fillRect(7, 52, 16, 6);

      // Glowing coals in brazier
      g.fillStyle(COLORS.FIRE_RED, 0.6);
      g.fillCircle(10, 54, 3);
      g.fillCircle(20, 55, 3);

      // Main flame body - layered for depth
      g.fillStyle(COLORS.LAVA_MID);
      g.fillTriangle(2, 50, 15, 5, 28, 50);
      g.fillStyle(0xcc4400);
      g.fillTriangle(5, 48, 15, 8, 25, 48);
      g.fillStyle(0xff5500);
      g.fillTriangle(7, 45, 15, 12, 23, 45);

      // Inner hot core
      g.fillStyle(0xff7700);
      g.fillTriangle(9, 42, 15, 15, 21, 42);
      g.fillStyle(COLORS.FIRE_YELLOW);
      g.fillTriangle(11, 38, 15, 18, 19, 38);

      // White-hot center
      g.fillStyle(COLORS.GOLD);
      g.fillTriangle(13, 35, 15, 22, 17, 35);

      // Flame tips
      g.fillStyle(0xffdd44, 0.9);
      g.fillTriangle(14, 28, 15, 20, 16, 28);

      // Side flickers
      g.fillStyle(COLORS.FIRE_ORANGE, 0.7);
      g.fillTriangle(3, 35, 8, 20, 10, 40);
      g.fillTriangle(27, 35, 22, 20, 20, 40);
    });
  }

  /**
   * Water theme: Sea urchin
   */
  static createUrchin(scene) {
    createTexture(scene, 'urchin', 40, 40, (g) => {
      // Body - dark purple
      g.fillStyle(0x2a1a3a);
      g.fillCircle(20, 20, 12);
      g.fillStyle(0x3a2a4a);
      g.fillCircle(20, 20, 10);

      // Spikes radiating out
      const spikeCount = 12;
      for (let i = 0; i < spikeCount; i++) {
        const angle = (i / spikeCount) * Math.PI * 2;
        const x1 = 20 + Math.cos(angle) * 10;
        const y1 = 20 + Math.sin(angle) * 10;
        const x2 = 20 + Math.cos(angle) * 18;
        const y2 = 20 + Math.sin(angle) * 18;

        g.fillStyle(0x4a3a5a);
        g.fillTriangle(
          x1 - 2, y1,
          x2, y2,
          x1 + 2, y1
        );
      }

      // Eye
      g.fillStyle(0xff4444);
      g.fillCircle(20, 18, 4);
      g.fillStyle(0xffffff);
      g.fillCircle(19, 17, 2);
    });
  }

  /**
   * Water theme: Deadly whirlpool
   */
  static createWhirlpool(scene) {
    createTexture(scene, 'whirlpool', 70, 25, (g) => {
      // Swirling water layers
      g.fillStyle(0x003366);
      g.fillEllipse(35, 12, 35, 12);
      g.fillStyle(0x004488);
      g.fillEllipse(35, 12, 28, 10);
      g.fillStyle(0x0066aa);
      g.fillEllipse(35, 12, 20, 8);
      g.fillStyle(0x0088cc);
      g.fillEllipse(35, 12, 12, 5);

      // Dark center
      g.fillStyle(0x001122);
      g.fillCircle(35, 12, 4);

      // Foam/splash
      g.fillStyle(0xaaccff, 0.6);
      g.fillCircle(15, 8, 3);
      g.fillCircle(55, 10, 3);
      g.fillCircle(25, 18, 2);
    });
  }

  /**
   * Water theme: Deep trench (like pit)
   */
  static createTrench(scene) {
    createTexture(scene, 'trench', 100, 60, (g) => {
      // Deep ocean void
      g.fillStyle(0x000811);
      g.fillRect(0, 0, 100, 60);

      // Bioluminescent glow at bottom
      g.fillStyle(0x003355, 0.4);
      g.fillRect(10, 45, 80, 15);
      g.fillStyle(0x00aaff, 0.2);
      g.fillCircle(30, 50, 5);
      g.fillCircle(70, 52, 4);

      // Edge warning
      g.fillStyle(0x0066aa, 0.4);
      g.fillRect(0, 0, 100, 2);
    });
  }

  /**
   * Water theme: Water jet geyser
   */
  static createWaterjet(scene) {
    createTexture(scene, 'waterjet', 30, 60, (g) => {
      // Base vent
      g.fillStyle(0x334455);
      g.fillRect(5, 50, 20, 10);

      // Water jet - layered
      g.fillStyle(0x004488);
      g.fillTriangle(5, 50, 15, 5, 25, 50);
      g.fillStyle(0x0066aa);
      g.fillTriangle(8, 48, 15, 10, 22, 48);
      g.fillStyle(0x0088cc);
      g.fillTriangle(10, 45, 15, 15, 20, 45);
      g.fillStyle(0x66ccff, 0.8);
      g.fillTriangle(12, 40, 15, 20, 18, 40);

      // Foam at top
      g.fillStyle(0xaaddff, 0.7);
      g.fillCircle(15, 8, 6);
      g.fillCircle(10, 12, 4);
      g.fillCircle(20, 12, 4);
    });
  }

  /**
   * Rain theme: Lightning strike zone
   */
  static createLightning(scene) {
    createTexture(scene, 'lightning', 30, 60, (g) => {
      // Lightning bolt shape
      g.fillStyle(COLORS.LIGHTNING_CORE);
      g.fillRect(12, 0, 6, 15);
      g.fillRect(10, 15, 10, 5);
      g.fillRect(8, 20, 6, 15);
      g.fillRect(10, 35, 10, 5);
      g.fillRect(12, 40, 6, 20);

      // Bright core
      g.fillStyle(COLORS.WHITE, 0.9);
      g.fillRect(14, 2, 2, 12);
      g.fillRect(12, 22, 2, 12);
      g.fillRect(14, 42, 2, 16);

      // Glow
      g.fillStyle(COLORS.LIGHTNING, 0.3);
      g.fillRect(6, 0, 18, 60);
    });
  }

  /**
   * Rain theme: Flash flood water
   */
  static createFlood(scene) {
    createTexture(scene, 'flood', 70, 25, (g) => {
      // Murky water
      g.fillStyle(0x334455);
      g.fillRect(0, 5, 70, 20);

      // Surface waves
      g.fillStyle(0x556677);
      g.fillEllipse(15, 8, 15, 6);
      g.fillEllipse(45, 10, 18, 7);
      g.fillStyle(0x667788);
      g.fillEllipse(30, 6, 12, 4);

      // Foam
      g.fillStyle(0x99aabb, 0.6);
      g.fillCircle(10, 5, 4);
      g.fillCircle(35, 4, 3);
      g.fillCircle(60, 6, 4);
    });
  }

  /**
   * Rain theme: Crumbling cliff edge
   */
  static createCliff(scene) {
    createTexture(scene, 'cliff', 100, 60, (g) => {
      // Void below
      g.fillStyle(0x111122);
      g.fillRect(0, 0, 100, 60);

      // Rock crumbles
      g.fillStyle(0x444455, 0.6);
      g.fillRect(10, 10, 8, 8);
      g.fillRect(40, 25, 12, 10);
      g.fillRect(70, 15, 10, 12);

      // Warning edge
      g.fillStyle(0x666688, 0.5);
      g.fillRect(0, 0, 100, 3);
    });
  }

  /**
   * Rain theme: Thundercloud (spawns lightning)
   */
  static createThundercloud(scene) {
    createTexture(scene, 'thundercloud', 60, 40, (g) => {
      // Dark storm cloud
      g.fillStyle(0x222233);
      g.fillCircle(15, 20, 12);
      g.fillCircle(30, 15, 15);
      g.fillCircle(45, 20, 12);
      g.fillStyle(0x333344);
      g.fillCircle(20, 22, 10);
      g.fillCircle(40, 22, 10);

      // Lightning hint
      g.fillStyle(COLORS.LIGHTNING_CORE, 0.5);
      g.fillRect(28, 30, 4, 8);

      // Internal glow
      g.fillStyle(0x4444aa, 0.3);
      g.fillCircle(30, 18, 8);
    });
  }
}
