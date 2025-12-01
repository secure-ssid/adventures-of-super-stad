/**
 * Shared color constants and utilities for procedural asset generation
 */

// Character colors
export const COLORS = {
  // Super Stad (Hero 1)
  GOLD: 0xffcc00,
  GOLD_DARK: 0xcc9900,
  GOLD_LIGHT: 0xffee66,
  BLACK_SUIT: 0x1a1a1a,
  BLACK_DEEP: 0x111111,
  BLACK_HIGHLIGHT: 0x333333,

  // Rowdy Rowan (Hero 2)
  CYAN: 0x00ffff,
  CYAN_DARK: 0x00aaaa,
  CYAN_LIGHT: 0x88ffff,
  PURPLE_SUIT: 0x4a1a6b,
  PURPLE_LIGHT: 0x6b2a8c,

  // Hel-Cat (Hero 3)
  TIGER_ORANGE: 0xff8833,
  TIGER_DARK: 0xcc6622,

  // Skin tones
  SKIN: 0xe8b89d,
  SKIN_SHADOW: 0xd4a57b,
  SKIN_HIGHLIGHT: 0xf0c8a8,

  // Fire theme
  FIRE_RED: 0xff4400,
  FIRE_ORANGE: 0xff6600,
  FIRE_YELLOW: 0xffaa00,
  FIRE_WHITE: 0xffffcc,
  LAVA_DEEP: 0x4a0a00,
  LAVA_MID: 0x8a2000,
  VOLCANIC_ROCK: 0x2a1a15,
  VOLCANIC_ROCK_LIGHT: 0x3a2520,

  // Water theme
  WATER_DEEP: 0x001122,
  WATER_MID: 0x003355,
  WATER_LIGHT: 0x0088cc,
  WATER_SURFACE: 0x66aacc,
  ICE: 0x88ccff,

  // Rain/Storm theme
  STORM_DARK: 0x1a1a2a,
  STORM_MID: 0x2a2a4a,
  STORM_LIGHT: 0x4a4a6a,
  LIGHTNING: 0xffffcc,
  LIGHTNING_CORE: 0xffff00,

  // UI colors
  HEART_RED: 0xff0000,
  HEART_PINK: 0xff6666,
  HEART_DARK: 0x660000,
  SHIELD_BLUE: 0x0088cc,
  SHIELD_LIGHT: 0x44ddff,

  // Generic
  WHITE: 0xffffff,
  BLACK: 0x000000,
};

// Theme color palettes for easy switching
export const THEME_COLORS = {
  fire: {
    primary: COLORS.FIRE_ORANGE,
    secondary: COLORS.FIRE_RED,
    accent: COLORS.FIRE_YELLOW,
    background: COLORS.VOLCANIC_ROCK,
    danger: COLORS.LAVA_MID,
  },
  water: {
    primary: COLORS.WATER_LIGHT,
    secondary: COLORS.WATER_MID,
    accent: COLORS.ICE,
    background: COLORS.WATER_DEEP,
    danger: COLORS.WATER_DEEP,
  },
  rain: {
    primary: COLORS.STORM_LIGHT,
    secondary: COLORS.STORM_MID,
    accent: COLORS.LIGHTNING,
    background: COLORS.STORM_DARK,
    danger: COLORS.LIGHTNING_CORE,
  },
};

/**
 * Creates a graphics object, executes draw commands, generates texture, and cleans up
 * This ensures no memory leaks from graphics objects
 *
 * @param {Phaser.Scene} scene - The scene to create graphics in
 * @param {string} textureKey - The key for the generated texture
 * @param {number} width - Texture width
 * @param {number} height - Texture height
 * @param {Function} drawFn - Function that receives graphics object and draws on it
 * @returns {boolean} - True if texture was created, false if it already existed
 */
export function createTexture(scene, textureKey, width, height, drawFn) {
  // Skip if texture already exists
  if (scene.textures.exists(textureKey)) {
    return false;
  }

  const g = scene.make.graphics({ x: 0, y: 0, add: false });
  drawFn(g);
  g.generateTexture(textureKey, width, height);
  g.destroy(); // Critical: prevent memory leak

  return true;
}

/**
 * Creates a simple circular particle texture
 */
export function createParticleTexture(scene, name, color, radius) {
  return createTexture(scene, name, radius * 2, radius * 2, (g) => {
    g.fillStyle(color);
    g.fillCircle(radius, radius, radius);
  });
}

/**
 * Draws eyes with pupils at specified positions
 */
export function drawEyes(g, x1, y1, x2, y2, eyeWidth, eyeHeight, eyeColor = COLORS.WHITE, pupilColor = 0x2244aa) {
  // Eye whites
  g.fillStyle(eyeColor);
  g.fillEllipse(x1, y1, eyeWidth, eyeHeight);
  g.fillEllipse(x2, y2, eyeWidth, eyeHeight);

  // Pupils
  g.fillStyle(pupilColor);
  g.fillCircle(x1 + 1, y1, 1);
  g.fillCircle(x2 + 1, y2, 1);
}

/**
 * Draws a layered flame effect
 */
export function drawFlame(g, x, y, width, height, layers = 4) {
  const colors = [COLORS.LAVA_MID, COLORS.FIRE_RED, COLORS.FIRE_ORANGE, COLORS.FIRE_YELLOW, COLORS.FIRE_WHITE];

  for (let i = 0; i < layers && i < colors.length; i++) {
    const shrink = i * (width / (layers * 2));
    const heightReduce = i * (height / (layers * 1.5));

    g.fillStyle(colors[i], i === layers - 1 ? 0.9 : 1);
    g.fillTriangle(
      x, y + height,
      x + width / 2, y + heightReduce,
      x + width, y + height
    );
  }
}

/**
 * Draws a glowing circle with inner highlight
 */
export function drawGlowingCircle(g, x, y, radius, baseColor, glowColor, highlightColor) {
  // Outer glow
  g.fillStyle(glowColor, 0.3);
  g.fillCircle(x, y, radius + 4);

  // Base circle
  g.fillStyle(baseColor);
  g.fillCircle(x, y, radius);

  // Inner highlight
  g.fillStyle(highlightColor, 0.8);
  g.fillCircle(x - radius / 3, y - radius / 3, radius / 3);
}
