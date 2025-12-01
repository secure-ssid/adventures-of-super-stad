#!/usr/bin/env node
/**
 * Validates the game project structure and level configurations.
 * Run with: npm run validate
 */

import { readFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, '..');

let errors = [];
let warnings = [];

// Check required files exist
const requiredFiles = [
  'src/main.js',
  'src/scenes/BootScene.js',
  'src/scenes/TitleScene.js',
  'src/scenes/GameScene.js',
  'src/scenes/GameOverScene.js',
  'src/scenes/LevelCompleteScene.js',
  'src/objects/Player.js',
  'src/config/levels.js',
  'index.html',
  'package.json'
];

console.log('🎮 Adventures of Super Stad - Project Validator\n');
console.log('Checking required files...');

requiredFiles.forEach(file => {
  const fullPath = join(projectRoot, file);
  if (!existsSync(fullPath)) {
    errors.push(`Missing required file: ${file}`);
  }
});

// Validate levels.js structure
console.log('Checking level configurations...');

try {
  const levelsPath = join(projectRoot, 'src/config/levels.js');
  const levelsContent = readFileSync(levelsPath, 'utf-8');

  // Parse LEVELS array (simple extraction)
  const levelsMatch = levelsContent.match(/export const LEVELS = \[([\s\S]*?)\];/);
  if (levelsMatch) {
    // Count levels
    const levelCount = (levelsContent.match(/id:\s*\d+/g) || []).length;
    console.log(`  Found ${levelCount} level(s)`);

    // Check for required properties in level definitions
    const requiredProps = ['id', 'name', 'theme', 'length', 'scrollSpeed', 'obstacles', 'powerups'];
    requiredProps.forEach(prop => {
      const propCount = (levelsContent.match(new RegExp(`${prop}:`, 'g')) || []).length;
      if (propCount < levelCount) {
        warnings.push(`Some levels may be missing '${prop}' property`);
      }
    });

    // Check obstacle damage definitions
    if (!levelsContent.includes('OBSTACLE_DAMAGE')) {
      warnings.push('Missing OBSTACLE_DAMAGE export');
    }

    // Check powerup effects definitions
    if (!levelsContent.includes('POWERUP_EFFECTS')) {
      warnings.push('Missing POWERUP_EFFECTS export');
    }
  }
} catch (e) {
  errors.push(`Could not parse levels.js: ${e.message}`);
}

// Check main.js has all scenes registered
console.log('Checking scene registration...');

try {
  const mainPath = join(projectRoot, 'src/main.js');
  const mainContent = readFileSync(mainPath, 'utf-8');

  const sceneFiles = requiredFiles.filter(f => f.includes('/scenes/'));
  sceneFiles.forEach(sceneFile => {
    const sceneName = sceneFile.split('/').pop().replace('.js', '');
    if (!mainContent.includes(sceneName)) {
      errors.push(`Scene ${sceneName} not imported/registered in main.js`);
    }
  });
} catch (e) {
  errors.push(`Could not check main.js: ${e.message}`);
}

// Print results
console.log('\n' + '='.repeat(50));

if (errors.length === 0 && warnings.length === 0) {
  console.log('✅ All checks passed!\n');
  process.exit(0);
} else {
  if (errors.length > 0) {
    console.log(`\n❌ ${errors.length} Error(s):`);
    errors.forEach(e => console.log(`   - ${e}`));
  }

  if (warnings.length > 0) {
    console.log(`\n⚠️  ${warnings.length} Warning(s):`);
    warnings.forEach(w => console.log(`   - ${w}`));
  }

  console.log('');
  process.exit(errors.length > 0 ? 1 : 0);
}
