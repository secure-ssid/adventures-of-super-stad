/**
 * AssetLoader - Central orchestrator for procedural asset generation
 *
 * This module coordinates all factories to generate game assets.
 * Supports V1 mode (fire theme only) and Full Vision mode (all themes).
 */

import { ParticleFactory } from './ParticleFactory.js';
import { UIFactory } from './UIFactory.js';
import { PowerupFactory } from './PowerupFactory.js';
import { EnvironmentFactory } from './EnvironmentFactory.js';
import { CharacterFactory } from './CharacterFactory.js';
import { BossFactory } from './BossFactory.js';
import { FireTheme } from './themes/FireTheme.js';
import { WaterTheme } from './themes/WaterTheme.js';
import { RainTheme } from './themes/RainTheme.js';

export class AssetLoader {
  /**
   * Generate only V1 MVP assets (Fire theme + Super Stad)
   * This is the recommended mode for the current development phase.
   * @param {Phaser.Scene} scene
   */
  static generateV1Assets(scene) {
    console.log('Generating V1 assets (Fire theme only)...');

    // Core gameplay assets (theme-agnostic)
    ParticleFactory.generateV1Textures(scene);
    UIFactory.generateTextures(scene);
    PowerupFactory.generateTextures(scene);
    EnvironmentFactory.generateTextures(scene);

    // Super Stad character (procedural fallback)
    CharacterFactory.generateSuperStad(scene);

    // Fire theme only
    FireTheme.generateAssets(scene);

    console.log('V1 assets generated successfully');
  }

  /**
   * Generate all assets for Full Vision (3 themes, 3 heroes, bosses)
   * Use this when implementing the complete game.
   * @param {Phaser.Scene} scene
   */
  static generateAllAssets(scene) {
    console.log('Generating Full Vision assets...');

    // Core gameplay assets
    ParticleFactory.generateTextures(scene);
    UIFactory.generateTextures(scene);
    PowerupFactory.generateTextures(scene);
    EnvironmentFactory.generateTextures(scene);

    // All characters
    CharacterFactory.generateSuperStad(scene);
    CharacterFactory.generateRowdyRowan(scene);
    CharacterFactory.generateHelCat(scene);

    // All themes
    FireTheme.generateAssets(scene);
    WaterTheme.generateAssets(scene);
    RainTheme.generateAssets(scene);

    // All bosses
    BossFactory.generateTextures(scene);

    // Boss UI
    UIFactory.createBossHealthBarBg(scene);
    UIFactory.createBossHealthBarFill(scene);

    console.log('Full Vision assets generated successfully');
  }

  /**
   * Lazy load theme assets at runtime
   * Use this to load theme-specific assets when entering a themed level.
   * @param {Phaser.Scene} scene
   * @param {string} theme - 'fire' | 'water' | 'rain'
   */
  static loadThemeAssets(scene, theme) {
    console.log(`Loading ${theme} theme assets...`);

    switch (theme) {
      case 'fire':
        FireTheme.generateAssets(scene);
        break;
      case 'water':
        WaterTheme.generateAssets(scene);
        break;
      case 'rain':
        RainTheme.generateAssets(scene);
        break;
      default:
        console.warn(`Unknown theme: ${theme}`);
    }
  }

  /**
   * Load boss assets for a specific theme
   * @param {Phaser.Scene} scene
   * @param {string} theme - 'fire' | 'water' | 'rain'
   */
  static loadBossAssets(scene, theme) {
    UIFactory.createBossHealthBarBg(scene);
    UIFactory.createBossHealthBarFill(scene);

    switch (theme) {
      case 'fire':
        BossFactory.generateFireBoss(scene);
        break;
      case 'water':
        BossFactory.createWaterBoss(scene);
        BossFactory.createWaterProjectile(scene);
        break;
      case 'rain':
        BossFactory.createStormBoss(scene);
        BossFactory.createLightningProjectile(scene);
        break;
    }
  }
}

// Re-export individual factories for direct use if needed
export {
  ParticleFactory,
  UIFactory,
  PowerupFactory,
  EnvironmentFactory,
  CharacterFactory,
  BossFactory,
  FireTheme,
  WaterTheme,
  RainTheme,
};
