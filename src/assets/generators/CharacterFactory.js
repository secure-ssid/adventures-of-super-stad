/**
 * CharacterFactory - Generates procedural fallback character sprites
 * These are only used when actual sprite sheets are not available
 *
 * Extracted from BootScene.js lines 53-221, 1458-2196
 *
 * Note: Super Stad uses sprite sheets (superstad-run-sheet, superstad-jump-sheet)
 * and CharacterSprites.js handles the animation creation.
 * This factory provides procedural fallbacks only.
 */

import { COLORS, createTexture, drawEyes } from './constants.js';

export class CharacterFactory {
  /**
   * Generate fallback sprites for Super Stad (Hero 1)
   * Only generates if sprite sheets are not loaded
   * @param {Phaser.Scene} scene
   */
  static generateSuperStad(scene) {
    // Check if sprite sheets exist - prefer them over procedural
    if (scene.textures.exists('superstad-run-sheet')) {
      console.log('Using sprite sheet for Super Stad');
      return;
    }

    console.log('Generating procedural Super Stad fallback');
    this.createSuperStadRun(scene);
    this.createSuperStadSlide(scene);
    this.createSuperStadIdle(scene);
    this.createSuperStadFiring(scene);
  }

  /**
   * Generate Rowdy Rowan sprites (Hero 2) - Full Vision
   * @param {Phaser.Scene} scene
   */
  static generateRowdyRowan(scene) {
    this.createHero2Run(scene);
    this.createHero2Slide(scene);
    this.createHero2Idle(scene);
    this.createHero2Firing(scene);
    this.createHero2Laser(scene);
  }

  /**
   * Generate Hel-Cat sprites (Hero 3) - Full Vision
   * @param {Phaser.Scene} scene
   */
  static generateHelCat(scene) {
    this.createHero3Run(scene);
    this.createHero3Slide(scene);
    this.createHero3Idle(scene);
    this.createHero3Firing(scene);
    this.createHero3Laser(scene);
  }

  // ============ SUPER STAD (Hero 1) ============

  static createSuperStadRun(scene) {
    createTexture(scene, 'player', 48, 62, (g) => {
      // Ground shadow
      g.fillStyle(COLORS.BLACK, 0.3);
      g.fillEllipse(21, 58, 24, 6);

      // Cape - yellow/gold
      g.fillStyle(COLORS.GOLD_DARK);
      g.fillTriangle(26, 18, 46, 56, 16, 56);
      g.fillStyle(COLORS.GOLD);
      g.fillTriangle(28, 18, 44, 55, 18, 55);
      g.fillStyle(COLORS.GOLD_LIGHT, 0.6);
      g.fillTriangle(31, 22, 36, 48, 22, 50);

      // Boots - black with gold trim
      g.fillStyle(COLORS.BLACK_DEEP);
      g.fillRoundedRect(8, 48, 12, 10, 2);
      g.fillRoundedRect(22, 48, 12, 10, 2);
      g.fillStyle(COLORS.GOLD);
      g.fillRect(8, 48, 12, 2);
      g.fillRect(22, 48, 12, 2);

      // Legs - black
      g.fillStyle(COLORS.BLACK_SUIT);
      g.fillRect(10, 38, 8, 12);
      g.fillRect(24, 38, 8, 12);

      // Body - black suit
      g.fillStyle(COLORS.BLACK_DEEP);
      g.fillRoundedRect(7, 17, 28, 24, 4);
      g.fillStyle(COLORS.BLACK_SUIT);
      g.fillRoundedRect(8, 18, 26, 22, 3);

      // Yellow "S" logo on chest
      g.fillStyle(COLORS.FIRE_YELLOW, 0.4);
      g.fillRoundedRect(13, 19, 16, 18, 3);
      g.fillStyle(COLORS.GOLD);
      g.fillRoundedRect(14, 20, 14, 4, 2);
      g.fillRoundedRect(14, 20, 5, 6, 2);
      g.fillRoundedRect(15, 25, 12, 4, 2);
      g.fillRoundedRect(22, 28, 5, 6, 2);
      g.fillRoundedRect(14, 32, 14, 4, 2);

      // Belt
      g.fillStyle(COLORS.GOLD_DARK);
      g.fillRect(8, 36, 26, 4);
      g.fillStyle(COLORS.GOLD);
      g.fillRect(8, 36, 26, 3);
      g.fillStyle(0xffee00);
      g.fillRoundedRect(17, 35, 8, 5, 1);

      // Arms - black
      g.fillStyle(COLORS.BLACK_DEEP);
      g.fillRoundedRect(1, 19, 10, 18, 3);
      g.fillRoundedRect(31, 19, 10, 18, 3);
      g.fillStyle(COLORS.BLACK_SUIT);
      g.fillRect(2, 20, 8, 16);
      g.fillRect(32, 20, 8, 16);

      // Hands - gold gloves
      g.fillStyle(COLORS.GOLD_DARK);
      g.fillCircle(6, 38, 5);
      g.fillCircle(36, 38, 5);
      g.fillStyle(COLORS.GOLD);
      g.fillCircle(6, 38, 4);
      g.fillCircle(36, 38, 4);

      // Head
      g.fillStyle(COLORS.SKIN_SHADOW);
      g.fillCircle(21, 11, 10);
      g.fillStyle(COLORS.SKIN);
      g.fillCircle(21, 10, 9);

      // Mask - black domino
      g.fillStyle(0x0a0a0a);
      g.fillEllipse(15, 9, 9, 6);
      g.fillEllipse(27, 9, 9, 6);
      g.fillStyle(COLORS.BLACK_SUIT);
      g.fillEllipse(15, 9, 8, 5);
      g.fillEllipse(27, 9, 8, 5);

      // Eyes
      drawEyes(g, 15, 9, 27, 9, 4, 3, COLORS.WHITE, 0x2244aa);

      // Hair
      g.fillStyle(0x0a0a0a);
      g.fillTriangle(11, 5, 21, -1, 31, 5);
      g.fillStyle(COLORS.BLACK_SUIT);
      g.fillTriangle(12, 4, 21, 0, 30, 4);

      // Mouth
      g.lineStyle(2, 0x8b5a3c);
      g.lineBetween(17, 15, 25, 15);
    });
  }

  static createSuperStadSlide(scene) {
    createTexture(scene, 'player-slide', 58, 24, (g) => {
      // Cape trailing
      g.fillStyle(COLORS.GOLD);
      g.fillTriangle(0, 8, 12, 5, 8, 18);

      // Body horizontal
      g.fillStyle(COLORS.BLACK_SUIT);
      g.fillRoundedRect(8, 8, 38, 14, 3);

      // Yellow stripe
      g.fillStyle(COLORS.GOLD);
      g.fillRect(20, 8, 4, 14);

      // Head forward
      g.fillStyle(COLORS.SKIN);
      g.fillCircle(50, 12, 7);

      // Mask
      g.fillStyle(COLORS.BLACK_SUIT);
      g.fillEllipse(52, 11, 6, 4);

      // Hair
      g.fillStyle(COLORS.BLACK_SUIT);
      g.fillTriangle(48, 5, 55, 8, 52, 10);

      // Arms stretched
      g.fillStyle(COLORS.BLACK_SUIT);
      g.fillRect(44, 14, 6, 4);
      g.fillStyle(COLORS.GOLD);
      g.fillCircle(54, 16, 3);
    });
  }

  static createSuperStadIdle(scene) {
    createTexture(scene, 'player-idle', 45, 60, (g) => {
      // Similar to run but standing straight
      // Cape hanging
      g.fillStyle(COLORS.GOLD);
      g.fillTriangle(26, 18, 38, 55, 20, 55);

      // Boots
      g.fillStyle(COLORS.BLACK_DEEP);
      g.fillRoundedRect(8, 48, 12, 10, 2);
      g.fillRoundedRect(22, 48, 12, 10, 2);
      g.fillStyle(COLORS.GOLD);
      g.fillRect(8, 48, 12, 2);
      g.fillRect(22, 48, 12, 2);

      // Legs
      g.fillStyle(COLORS.BLACK_SUIT);
      g.fillRect(10, 38, 8, 12);
      g.fillRect(24, 38, 8, 12);

      // Body
      g.fillStyle(COLORS.BLACK_SUIT);
      g.fillRoundedRect(8, 18, 26, 22, 3);

      // S logo
      g.fillStyle(COLORS.GOLD);
      g.fillRoundedRect(14, 22, 14, 12, 2);

      // Belt
      g.fillStyle(COLORS.GOLD);
      g.fillRect(8, 36, 26, 3);

      // Arms at sides
      g.fillStyle(COLORS.BLACK_SUIT);
      g.fillRect(2, 20, 8, 18);
      g.fillRect(32, 20, 8, 18);
      g.fillStyle(COLORS.GOLD);
      g.fillCircle(6, 40, 4);
      g.fillCircle(36, 40, 4);

      // Head
      g.fillStyle(COLORS.SKIN);
      g.fillCircle(21, 10, 9);

      // Mask
      g.fillStyle(COLORS.BLACK_SUIT);
      g.fillEllipse(15, 9, 8, 5);
      g.fillEllipse(27, 9, 8, 5);
      drawEyes(g, 15, 9, 27, 9, 4, 3);

      // Hair
      g.fillStyle(COLORS.BLACK_SUIT);
      g.fillTriangle(12, 4, 21, 0, 30, 4);
    });
  }

  static createSuperStadFiring(scene) {
    createTexture(scene, 'player-firing', 45, 60, (g) => {
      // Similar to idle but with glowing eyes and raised arms
      // Cape
      g.fillStyle(COLORS.GOLD);
      g.fillTriangle(26, 18, 38, 55, 20, 55);

      // Body and legs same as idle
      g.fillStyle(COLORS.BLACK_DEEP);
      g.fillRoundedRect(8, 48, 12, 10, 2);
      g.fillRoundedRect(22, 48, 12, 10, 2);
      g.fillStyle(COLORS.BLACK_SUIT);
      g.fillRect(10, 38, 8, 12);
      g.fillRect(24, 38, 8, 12);
      g.fillRoundedRect(8, 18, 26, 22, 3);
      g.fillStyle(COLORS.GOLD);
      g.fillRoundedRect(14, 22, 14, 12, 2);
      g.fillRect(8, 36, 26, 3);

      // Arms raised forward
      g.fillStyle(COLORS.BLACK_SUIT);
      g.fillRect(2, 18, 8, 14);
      g.fillRect(32, 18, 8, 14);
      g.fillStyle(COLORS.GOLD);
      g.fillCircle(6, 34, 4);
      g.fillCircle(36, 34, 4);

      // Head
      g.fillStyle(COLORS.SKIN);
      g.fillCircle(21, 10, 9);

      // Mask with glow
      g.fillStyle(COLORS.BLACK_SUIT);
      g.fillEllipse(15, 9, 8, 5);
      g.fillEllipse(27, 9, 8, 5);

      // Glowing eyes
      g.fillStyle(COLORS.GOLD, 0.5);
      g.fillCircle(15, 9, 7);
      g.fillCircle(27, 9, 7);
      g.fillStyle(COLORS.GOLD);
      g.fillEllipse(15, 9, 5, 4);
      g.fillEllipse(27, 9, 5, 4);
      g.fillStyle(COLORS.WHITE);
      g.fillCircle(14, 8, 2);
      g.fillCircle(26, 8, 2);

      // Hair
      g.fillStyle(COLORS.BLACK_SUIT);
      g.fillTriangle(12, 4, 21, 0, 30, 4);
    });
  }

  // ============ ROWDY ROWAN (Hero 2) - Simplified placeholders ============

  static createHero2Run(scene) {
    createTexture(scene, 'player2', 48, 62, (g) => {
      // Cyan/purple superhero
      g.fillStyle(COLORS.BLACK, 0.3);
      g.fillEllipse(21, 58, 24, 6);

      // Cape - cyan
      g.fillStyle(COLORS.CYAN_DARK);
      g.fillTriangle(26, 18, 46, 56, 16, 56);
      g.fillStyle(COLORS.CYAN);
      g.fillTriangle(28, 18, 44, 55, 18, 55);

      // Body - purple suit
      g.fillStyle(COLORS.PURPLE_SUIT);
      g.fillRoundedRect(7, 17, 28, 24, 4);
      g.fillRect(10, 38, 8, 12);
      g.fillRect(24, 38, 8, 12);
      g.fillRoundedRect(8, 48, 12, 10, 2);
      g.fillRoundedRect(22, 48, 12, 10, 2);

      // Arms and hands
      g.fillStyle(COLORS.PURPLE_SUIT);
      g.fillRoundedRect(1, 19, 10, 18, 3);
      g.fillRoundedRect(31, 19, 10, 18, 3);
      g.fillStyle(COLORS.CYAN);
      g.fillCircle(6, 38, 4);
      g.fillCircle(36, 38, 4);

      // Head
      g.fillStyle(COLORS.SKIN);
      g.fillCircle(21, 10, 9);
      g.fillStyle(COLORS.CYAN_DARK);
      g.fillEllipse(15, 9, 8, 5);
      g.fillEllipse(27, 9, 8, 5);
      drawEyes(g, 15, 9, 27, 9, 4, 3, COLORS.WHITE, COLORS.CYAN);
    });
  }

  static createHero2Slide(scene) {
    createTexture(scene, 'player2-slide', 58, 24, (g) => {
      g.fillStyle(COLORS.CYAN);
      g.fillTriangle(0, 8, 12, 5, 8, 18);
      g.fillStyle(COLORS.PURPLE_SUIT);
      g.fillRoundedRect(8, 8, 38, 14, 3);
      g.fillStyle(COLORS.SKIN);
      g.fillCircle(50, 12, 7);
    });
  }

  static createHero2Idle(scene) {
    createTexture(scene, 'player2-idle', 45, 60, (g) => {
      g.fillStyle(COLORS.CYAN);
      g.fillTriangle(26, 18, 38, 55, 20, 55);
      g.fillStyle(COLORS.PURPLE_SUIT);
      g.fillRoundedRect(8, 18, 26, 40, 3);
      g.fillStyle(COLORS.SKIN);
      g.fillCircle(21, 10, 9);
      drawEyes(g, 15, 9, 27, 9, 4, 3, COLORS.WHITE, COLORS.CYAN);
    });
  }

  static createHero2Firing(scene) {
    createTexture(scene, 'player2-firing', 45, 60, (g) => {
      g.fillStyle(COLORS.CYAN);
      g.fillTriangle(26, 18, 38, 55, 20, 55);
      g.fillStyle(COLORS.PURPLE_SUIT);
      g.fillRoundedRect(8, 18, 26, 40, 3);
      g.fillStyle(COLORS.SKIN);
      g.fillCircle(21, 10, 9);
      // Glowing cyan eyes
      g.fillStyle(COLORS.CYAN, 0.5);
      g.fillCircle(15, 9, 7);
      g.fillCircle(27, 9, 7);
      g.fillStyle(COLORS.WHITE);
      g.fillCircle(15, 9, 4);
      g.fillCircle(27, 9, 4);
    });
  }

  static createHero2Laser(scene) {
    createTexture(scene, 'eye-laser2', 40, 10, (g) => {
      g.fillStyle(COLORS.CYAN, 0.4);
      g.fillRoundedRect(0, 0, 40, 10, 5);
      g.fillStyle(COLORS.CYAN);
      g.fillRoundedRect(2, 2, 36, 6, 3);
      g.fillStyle(COLORS.WHITE, 0.8);
      g.fillRoundedRect(4, 3, 32, 4, 2);
    });
  }

  // ============ HEL-CAT (Hero 3) - Simplified placeholders ============

  static createHero3Run(scene) {
    createTexture(scene, 'player3', 48, 62, (g) => {
      // Tiger-stripe orange hero
      g.fillStyle(COLORS.BLACK, 0.3);
      g.fillEllipse(21, 58, 24, 6);

      // Tail
      g.fillStyle(COLORS.TIGER_ORANGE);
      g.fillTriangle(30, 36, 48, 50, 26, 50);

      // Body - orange with stripes
      g.fillStyle(COLORS.TIGER_ORANGE);
      g.fillRoundedRect(7, 17, 28, 24, 4);
      g.fillRect(10, 38, 8, 12);
      g.fillRect(24, 38, 8, 12);
      g.fillRoundedRect(8, 48, 12, 10, 2);
      g.fillRoundedRect(22, 48, 12, 10, 2);

      // Tiger stripes
      g.fillStyle(COLORS.BLACK_SUIT);
      g.fillRect(12, 20, 2, 8);
      g.fillRect(20, 22, 2, 6);
      g.fillRect(28, 20, 2, 8);

      // Arms and claws
      g.fillStyle(COLORS.TIGER_ORANGE);
      g.fillRoundedRect(1, 19, 10, 18, 3);
      g.fillRoundedRect(31, 19, 10, 18, 3);
      g.fillStyle(COLORS.BLACK_HIGHLIGHT);
      g.fillCircle(6, 38, 4);
      g.fillCircle(36, 38, 4);

      // Head with cat ears
      g.fillStyle(COLORS.SKIN);
      g.fillCircle(21, 10, 9);
      g.fillStyle(COLORS.TIGER_ORANGE);
      g.fillTriangle(10, 6, 14, -2, 16, 8);
      g.fillTriangle(26, 8, 28, -2, 32, 6);

      // Cat eyes
      g.fillStyle(COLORS.TIGER_ORANGE);
      g.fillEllipse(15, 9, 6, 4);
      g.fillEllipse(27, 9, 6, 4);
      g.fillStyle(0x44ff44);
      g.fillEllipse(15, 9, 4, 3);
      g.fillEllipse(27, 9, 4, 3);
    });
  }

  static createHero3Slide(scene) {
    createTexture(scene, 'player3-slide', 58, 24, (g) => {
      g.fillStyle(COLORS.TIGER_ORANGE);
      g.fillRoundedRect(0, 8, 12, 4, 2);
      g.fillRoundedRect(8, 6, 35, 14, 6);
      g.fillStyle(COLORS.BLACK_SUIT);
      g.fillRect(15, 6, 2, 14);
      g.fillRect(25, 6, 2, 14);
      g.fillStyle(COLORS.SKIN);
      g.fillCircle(48, 12, 8);
    });
  }

  static createHero3Idle(scene) {
    createTexture(scene, 'player3-idle', 45, 60, (g) => {
      g.fillStyle(COLORS.TIGER_ORANGE);
      g.fillTriangle(30, 36, 38, 55, 28, 55);
      g.fillRoundedRect(8, 18, 26, 40, 3);
      g.fillStyle(COLORS.BLACK_SUIT);
      g.fillRect(12, 20, 2, 8);
      g.fillRect(28, 20, 2, 8);
      g.fillStyle(COLORS.SKIN);
      g.fillCircle(21, 10, 9);
      g.fillStyle(COLORS.TIGER_ORANGE);
      g.fillTriangle(10, 6, 14, -2, 16, 8);
      g.fillTriangle(26, 8, 28, -2, 32, 6);
      g.fillStyle(0x44ff44);
      g.fillEllipse(15, 9, 4, 3);
      g.fillEllipse(27, 9, 4, 3);
    });
  }

  static createHero3Firing(scene) {
    createTexture(scene, 'player3-firing', 45, 60, (g) => {
      g.fillStyle(COLORS.TIGER_ORANGE);
      g.fillTriangle(30, 30, 42, 20, 28, 45);
      g.fillRoundedRect(8, 18, 26, 40, 3);
      g.fillStyle(COLORS.SKIN);
      g.fillCircle(21, 10, 9);
      // Glowing cat eyes
      g.fillStyle(0x44ff44, 0.5);
      g.fillCircle(15, 9, 7);
      g.fillCircle(27, 9, 7);
      g.fillStyle(0x88ff88);
      g.fillCircle(15, 9, 5);
      g.fillCircle(27, 9, 5);
    });
  }

  static createHero3Laser(scene) {
    // Claw slash effect
    createTexture(scene, 'eye-laser3', 42, 14, (g) => {
      g.fillStyle(0xffff88, 0.6);
      g.fillRect(0, 0, 40, 3);
      g.fillRect(0, 5, 40, 3);
      g.fillRect(0, 10, 40, 3);
      g.fillStyle(COLORS.WHITE);
      g.fillRect(0, 1, 40, 1);
      g.fillRect(0, 6, 40, 1);
      g.fillRect(0, 11, 40, 1);
      g.fillStyle(COLORS.FIRE_WHITE);
      g.fillCircle(38, 6, 4);
    });
  }
}
