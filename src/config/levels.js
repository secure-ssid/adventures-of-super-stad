// Level definitions for Adventures of Super Stad
// V1 Weekend Build: 1 level to validate "is dodging obstacles fun?"

export const LEVELS = [
  {
    id: 1,
    name: "Fire Level 1",
    theme: "fire",
    length: 3500,           // ~60 seconds at 160 speed
    scrollSpeed: 160,
    groundColor: 0x8B4513,
    bgColor: 0x2d1b0e,
    obstacles: [
      // Section 1: Learn to jump over spikes
      { type: "spike", x: 400 },
      { type: "spike", x: 650 },
      { type: "spike", x: 900 },

      // Section 2: Introduce lava (2 damage, must jump)
      { type: "lava", x: 1200 },
      { type: "spike", x: 1500 },

      // Section 3: First pit! (instant death)
      { type: "pit", x: 1850 },
      { type: "spike", x: 2150 },

      // Section 4: Mix it up
      { type: "lava", x: 2450 },
      { type: "spike", x: 2750 },
      { type: "pit", x: 3100 },
    ],
    powerups: [
      // Hearts placed before challenging sections
      { type: "heart", x: 1100 },
      { type: "heart", x: 2050 },
      { type: "heart", x: 2650 },
    ]
  }
];

// Obstacle damage values (V1: spikes, lava, pits only)
export const OBSTACLE_DAMAGE = {
  spike: 1,
  lava: 2,
  pit: 999  // Instant death
};

// Power-up effects (V1: heart only)
export const POWERUP_EFFECTS = {
  heart: { type: 'heal', amount: 1 }
};
