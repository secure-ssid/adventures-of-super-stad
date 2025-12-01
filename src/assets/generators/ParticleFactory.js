/**
 * ParticleFactory - Generates particle effect textures
 * Extracted from BootScene.js lines 728-755, 991-995, 1249-1253
 */

import { COLORS, createParticleTexture } from './constants.js';

export class ParticleFactory {
  /**
   * Generate all particle textures for the game
   * @param {Phaser.Scene} scene
   */
  static generateTextures(scene) {
    // Core particles (used across all themes)
    this.createFireParticle(scene);
    this.createGoldParticle(scene);
    this.createDustParticle(scene);

    // Theme-specific particles
    this.createCyanParticle(scene);   // Shield effect
    this.createPinkParticle(scene);   // Heart effect
    this.createWaterParticle(scene);  // Water theme
    this.createRainParticle(scene);   // Rain theme
  }

  /**
   * Generate only V1 particles (fire theme)
   * @param {Phaser.Scene} scene
   */
  static generateV1Textures(scene) {
    this.createFireParticle(scene);
    this.createGoldParticle(scene);
    this.createDustParticle(scene);
    this.createCyanParticle(scene);
    this.createPinkParticle(scene);
  }

  // Fire/explosion particle (orange-red)
  static createFireParticle(scene) {
    createParticleTexture(scene, 'particle-fire', COLORS.FIRE_ORANGE, 4);
  }

  // Gold sparkle particle (for coins)
  static createGoldParticle(scene) {
    createParticleTexture(scene, 'particle-gold', COLORS.GOLD, 3);
  }

  // Cyan particle (for shield)
  static createCyanParticle(scene) {
    createParticleTexture(scene, 'particle-cyan', COLORS.CYAN, 3);
  }

  // Pink particle (for heart)
  static createPinkParticle(scene) {
    createParticleTexture(scene, 'particle-pink', 0xff66cc, 3);
  }

  // White dust particle (for landing)
  static createDustParticle(scene) {
    createParticleTexture(scene, 'particle-dust', 0xcccccc, 2);
  }

  // Water theme bubble particle
  static createWaterParticle(scene) {
    createParticleTexture(scene, 'particle-water', 0x66ccff, 3);
  }

  // Rain theme drop particle
  static createRainParticle(scene) {
    createParticleTexture(scene, 'particle-rain', 0xaa88ff, 3);
  }
}
