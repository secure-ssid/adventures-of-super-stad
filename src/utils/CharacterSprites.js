// Super Stad Character Sprite Generator
// Creates animated pixel art character: 64px tall superhero
// - Black bodysuit with yellow "S" on chest
// - Yellow flowing cape
// - Black domino mask
// - Yellow belt and gloves

export function createSuperStadSprites(scene) {
  const frameWidth = 64;
  const frameHeight = 80;

  // Create idle frames (2 frames - subtle breathing)
  createIdleFrame(scene, 'superstad-idle-1', frameWidth, frameHeight, 0);
  createIdleFrame(scene, 'superstad-idle-2', frameWidth, frameHeight, 1);

  // Create run frames (6 frames - full run cycle)
  for (let i = 0; i < 6; i++) {
    createRunFrame(scene, `superstad-run-${i + 1}`, frameWidth, frameHeight, i);
  }

  // Create jump frame
  createJumpFrame(scene, 'superstad-jump', frameWidth, frameHeight);
}

function createIdleFrame(scene, key, w, h, variant) {
  const g = scene.make.graphics({ x: 0, y: 0, add: false });
  const yOffset = variant === 1 ? 1 : 0; // Subtle breathing

  // Cape (behind body) - flowing yellow
  drawCape(g, 24, 22 + yOffset, 0, 'idle');

  // Body
  drawBody(g, 24, 28 + yOffset);

  // Legs (standing)
  drawLegs(g, 24, 52 + yOffset, 0, 0, 'idle');

  // Arms
  drawArms(g, 24, 35 + yOffset, 'idle', 0);

  // Head
  drawHead(g, 32, 16 + yOffset);

  g.generateTexture(key, w, h);
  g.destroy();
}

function createRunFrame(scene, key, w, h, frame) {
  const g = scene.make.graphics({ x: 0, y: 0, add: false });

  // Run cycle positions (frame 0-5)
  const legPhases = [0, 1, 2, 3, 4, 5];
  const armPhases = [0, 1, 2, 1, 0, -1];
  const bodyBob = [0, -2, -1, 0, -2, -1];

  const legPhase = legPhases[frame];
  const armPhase = armPhases[frame];
  const yOff = bodyBob[frame];

  // Cape (flowing behind based on run phase)
  drawCape(g, 24, 22 + yOff, frame, 'run');

  // Body
  drawBody(g, 24, 28 + yOff);

  // Legs (running)
  drawLegs(g, 24, 52 + yOff, legPhase, frame, 'run');

  // Arms (pumping)
  drawArms(g, 24, 35 + yOff, 'run', armPhase);

  // Head
  drawHead(g, 32, 16 + yOff);

  g.generateTexture(key, w, h);
  g.destroy();
}

function createJumpFrame(scene, key, w, h) {
  const g = scene.make.graphics({ x: 0, y: 0, add: false });

  // Cape (flowing up/back)
  drawCape(g, 24, 20, 0, 'jump');

  // Body
  drawBody(g, 24, 26);

  // Legs (tucked for jump)
  drawLegs(g, 24, 50, 0, 0, 'jump');

  // Arms (raised heroically)
  drawArms(g, 24, 33, 'jump', 0);

  // Head
  drawHead(g, 32, 14);

  g.generateTexture(key, w, h);
  g.destroy();
}

// ===== COMPONENT DRAWING FUNCTIONS =====

function drawCape(g, x, y, frame, pose) {
  // Cape color gradient
  const capeMain = 0xffcc00;
  const capeDark = 0xcc9900;
  const capeLight = 0xffdd44;

  if (pose === 'jump') {
    // Cape flows upward during jump
    g.fillStyle(capeDark);
    g.fillTriangle(x - 8, y, x - 20, y + 35, x + 2, y + 30);
    g.fillStyle(capeMain);
    g.fillTriangle(x - 6, y + 2, x - 18, y + 32, x, y + 28);
    g.fillStyle(capeLight, 0.6);
    g.fillTriangle(x - 4, y + 4, x - 14, y + 25, x - 2, y + 22);
  } else if (pose === 'run') {
    // Cape flows back during run (animated)
    const wave = Math.sin(frame * 1.2) * 3;
    g.fillStyle(capeDark);
    g.fillTriangle(x - 6, y, x - 25 + wave, y + 38, x + 4, y + 32);
    g.fillStyle(capeMain);
    g.fillTriangle(x - 4, y + 2, x - 22 + wave, y + 35, x + 2, y + 30);
    g.fillStyle(capeLight, 0.5);
    g.fillTriangle(x - 2, y + 4, x - 18 + wave, y + 28, x, y + 24);
  } else {
    // Idle cape hangs down
    g.fillStyle(capeDark);
    g.fillTriangle(x - 4, y, x - 12, y + 42, x + 8, y + 40);
    g.fillStyle(capeMain);
    g.fillTriangle(x - 2, y + 2, x - 10, y + 40, x + 6, y + 38);
    g.fillStyle(capeLight, 0.5);
    g.fillTriangle(x, y + 4, x - 6, y + 32, x + 4, y + 30);
  }
}

function drawBody(g, x, y) {
  // Black bodysuit
  g.fillStyle(0x1a1a1a);
  g.fillRoundedRect(x - 10, y, 28, 26, 4);

  // Body highlights (muscle definition)
  g.fillStyle(0x2a2a2a, 0.5);
  g.fillRoundedRect(x - 8, y + 3, 10, 10, 2);
  g.fillRoundedRect(x + 6, y + 3, 10, 10, 2);

  // Yellow "S" logo
  g.fillStyle(0xffaa00, 0.4);
  g.fillRoundedRect(x - 6, y + 4, 20, 18, 3);
  g.fillStyle(0xffcc00);
  // S shape
  g.fillRoundedRect(x - 4, y + 5, 16, 4, 2);
  g.fillRoundedRect(x - 4, y + 5, 6, 7, 2);
  g.fillRoundedRect(x - 2, y + 10, 12, 4, 2);
  g.fillRoundedRect(x + 6, y + 12, 6, 7, 2);
  g.fillRoundedRect(x - 4, y + 17, 16, 4, 2);

  // Yellow belt
  g.fillStyle(0xcc9900);
  g.fillRect(x - 10, y + 22, 28, 5);
  g.fillStyle(0xffcc00);
  g.fillRect(x - 10, y + 22, 28, 4);
  // Belt buckle
  g.fillStyle(0xffee00);
  g.fillRoundedRect(x - 1, y + 21, 10, 6, 2);
}

function drawLegs(g, x, y, phase, frame, pose) {
  const legColor = 0x1a1a1a;
  const bootColor = 0x111111;
  const bootTrim = 0xffcc00;

  if (pose === 'jump') {
    // Legs tucked
    g.fillStyle(legColor);
    g.fillRoundedRect(x - 8, y, 10, 16, 3);
    g.fillRoundedRect(x + 6, y, 10, 16, 3);
    // Boots
    g.fillStyle(bootColor);
    g.fillRoundedRect(x - 8, y + 12, 10, 10, 2);
    g.fillRoundedRect(x + 6, y + 12, 10, 10, 2);
    g.fillStyle(bootTrim);
    g.fillRect(x - 8, y + 12, 10, 2);
    g.fillRect(x + 6, y + 12, 10, 2);
  } else if (pose === 'run') {
    // Running leg positions
    const positions = [
      { l: { x: -4, y: 0, h: 20 }, r: { x: 6, y: 6, h: 16 } },
      { l: { x: -2, y: 4, h: 18 }, r: { x: 4, y: 0, h: 22 } },
      { l: { x: 2, y: 8, h: 14 }, r: { x: 1, y: -2, h: 24 } },
      { l: { x: 4, y: 6, h: 16 }, r: { x: -2, y: 0, h: 22 } },
      { l: { x: 2, y: 0, h: 22 }, r: { x: -4, y: 4, h: 18 } },
      { l: { x: -2, y: -2, h: 24 }, r: { x: -2, y: 8, h: 14 } },
    ];
    const pos = positions[phase % 6];

    // Left leg
    g.fillStyle(legColor);
    g.fillRoundedRect(x + pos.l.x - 5, y + pos.l.y, 9, pos.l.h, 3);
    g.fillStyle(bootColor);
    g.fillRoundedRect(x + pos.l.x - 5, y + pos.l.y + pos.l.h - 8, 9, 10, 2);
    g.fillStyle(bootTrim);
    g.fillRect(x + pos.l.x - 5, y + pos.l.y + pos.l.h - 8, 9, 2);

    // Right leg
    g.fillStyle(legColor);
    g.fillRoundedRect(x + pos.r.x - 3, y + pos.r.y, 9, pos.r.h, 3);
    g.fillStyle(bootColor);
    g.fillRoundedRect(x + pos.r.x - 3, y + pos.r.y + pos.r.h - 8, 9, 10, 2);
    g.fillStyle(bootTrim);
    g.fillRect(x + pos.r.x - 3, y + pos.r.y + pos.r.h - 8, 9, 2);
  } else {
    // Standing
    g.fillStyle(legColor);
    g.fillRoundedRect(x - 8, y, 9, 18, 3);
    g.fillRoundedRect(x + 6, y, 9, 18, 3);
    // Boots
    g.fillStyle(bootColor);
    g.fillRoundedRect(x - 9, y + 14, 11, 12, 2);
    g.fillRoundedRect(x + 5, y + 14, 11, 12, 2);
    g.fillStyle(bootTrim);
    g.fillRect(x - 9, y + 14, 11, 2);
    g.fillRect(x + 5, y + 14, 11, 2);
  }
}

function drawArms(g, x, y, pose, phase) {
  const armColor = 0x1a1a1a;
  const gloveColor = 0xffcc00;
  const gloveDark = 0xcc9900;

  if (pose === 'jump') {
    // Right arm raised (heroic pose)
    g.fillStyle(armColor);
    g.fillRoundedRect(x + 14, y - 20, 8, 22, 3);
    g.fillStyle(gloveDark);
    g.fillCircle(x + 18, y - 22, 5);
    g.fillStyle(gloveColor);
    g.fillCircle(x + 18, y - 22, 4);

    // Left arm back
    g.fillStyle(armColor);
    g.fillRoundedRect(x - 14, y + 2, 8, 14, 3);
    g.fillStyle(gloveDark);
    g.fillCircle(x - 10, y + 16, 4);
    g.fillStyle(gloveColor);
    g.fillCircle(x - 10, y + 16, 3);
  } else if (pose === 'run') {
    // Arms pumping
    const armSwing = phase * 4;

    // Right arm
    g.fillStyle(armColor);
    g.fillRoundedRect(x + 12, y - 4 - armSwing, 8, 16, 3);
    g.fillStyle(gloveDark);
    g.fillCircle(x + 16, y + 12 - armSwing, 4);
    g.fillStyle(gloveColor);
    g.fillCircle(x + 16, y + 12 - armSwing, 3);

    // Left arm (opposite phase)
    g.fillStyle(armColor);
    g.fillRoundedRect(x - 12, y - 4 + armSwing, 8, 16, 3);
    g.fillStyle(gloveDark);
    g.fillCircle(x - 8, y + 12 + armSwing, 4);
    g.fillStyle(gloveColor);
    g.fillCircle(x - 8, y + 12 + armSwing, 3);
  } else {
    // Arms at sides (idle)
    g.fillStyle(armColor);
    g.fillRoundedRect(x - 14, y, 8, 18, 3);
    g.fillRoundedRect(x + 14, y, 8, 18, 3);
    // Gloves
    g.fillStyle(gloveDark);
    g.fillCircle(x - 10, y + 18, 5);
    g.fillCircle(x + 18, y + 18, 5);
    g.fillStyle(gloveColor);
    g.fillCircle(x - 10, y + 18, 4);
    g.fillCircle(x + 18, y + 18, 4);
  }
}

function drawHead(g, x, y) {
  // Head base (skin)
  g.fillStyle(0xd4a57b);
  g.fillCircle(x, y, 12);
  g.fillStyle(0xe8b89d);
  g.fillCircle(x, y - 1, 11);

  // Face highlight
  g.fillStyle(0xf0c8a8, 0.5);
  g.fillCircle(x - 3, y - 3, 5);

  // Hair (dark, heroic style)
  g.fillStyle(0x1a1a1a);
  g.fillTriangle(x - 12, y - 4, x, y - 16, x + 12, y - 4);
  g.fillStyle(0x2a2a2a);
  g.fillTriangle(x - 10, y - 5, x, y - 14, x + 10, y - 5);

  // Black domino mask
  g.fillStyle(0x0a0a0a);
  g.fillEllipse(x - 6, y - 2, 10, 7);
  g.fillEllipse(x + 6, y - 2, 10, 7);
  g.fillStyle(0x1a1a1a);
  g.fillEllipse(x - 6, y - 2, 9, 6);
  g.fillEllipse(x + 6, y - 2, 9, 6);

  // Eyes (white with pupils)
  g.fillStyle(0xffffff);
  g.fillEllipse(x - 6, y - 2, 5, 4);
  g.fillEllipse(x + 6, y - 2, 5, 4);
  // Pupils (looking forward/right)
  g.fillStyle(0x2244aa);
  g.fillCircle(x - 4, y - 2, 2);
  g.fillCircle(x + 8, y - 2, 2);

  // Determined expression (mouth)
  g.fillStyle(0x8b5a3c);
  g.fillRect(x - 4, y + 6, 8, 2);
}

export function createSuperStadAnimations(scene) {
  // Check if sprite sheets are loaded - if so, use them instead of procedural sprites
  const useNewSprites = scene.textures.exists('superstad-run-sheet');

  if (useNewSprites) {
    // === NEW SPRITE SHEET ANIMATIONS ===

    // Idle animation - use first few frames of run sheet
    scene.anims.create({
      key: 'superstad-idle',
      frames: scene.anims.generateFrameNumbers('superstad-run-sheet', { start: 0, end: 3 }),
      frameRate: 6,
      repeat: -1
    });

    // Run animation - use all 36 frames of run sheet for smooth cycle
    scene.anims.create({
      key: 'superstad-run',
      frames: scene.anims.generateFrameNumbers('superstad-run-sheet', { start: 0, end: 35 }),
      frameRate: 24,  // 36 frames at 24fps = 1.5 second cycle
      repeat: -1
    });

    // Jump animation - use frames 10-24 of jump sheet (the actual jump portion)
    scene.anims.create({
      key: 'superstad-jump',
      frames: scene.anims.generateFrameNumbers('superstad-jump-sheet', { start: 10, end: 24 }),
      frameRate: 15,
      repeat: 0
    });
  } else {
    // === FALLBACK: PROCEDURAL SPRITE ANIMATIONS ===

    // Idle animation (2 frames, slow)
    scene.anims.create({
      key: 'superstad-idle',
      frames: [
        { key: 'superstad-idle-1' },
        { key: 'superstad-idle-2' }
      ],
      frameRate: 2,
      repeat: -1
    });

    // Run animation (6 frames, fast)
    scene.anims.create({
      key: 'superstad-run',
      frames: [
        { key: 'superstad-run-1' },
        { key: 'superstad-run-2' },
        { key: 'superstad-run-3' },
        { key: 'superstad-run-4' },
        { key: 'superstad-run-5' },
        { key: 'superstad-run-6' }
      ],
      frameRate: 12,
      repeat: -1
    });

    // Jump animation (single frame)
    scene.anims.create({
      key: 'superstad-jump',
      frames: [{ key: 'superstad-jump' }],
      frameRate: 1,
      repeat: 0
    });
  }
}
