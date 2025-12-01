#!/usr/bin/env node
/**
 * Lists all levels with their configurations.
 * Run with: npm run levels
 */

import { LEVELS, OBSTACLE_DAMAGE, POWERUP_EFFECTS } from '../src/config/levels.js';

console.log('🎮 Adventures of Super Stad - Level Overview\n');
console.log('='.repeat(60) + '\n');

LEVELS.forEach(level => {
  console.log(`📍 Level ${level.id}: ${level.name}`);
  console.log(`   Theme: ${level.theme}`);
  console.log(`   Length: ${level.length}px | Speed: ${level.scrollSpeed}px/s`);
  console.log(`   Est. time: ~${Math.round(level.length / level.scrollSpeed)}s`);

  // Obstacle breakdown
  const obstacleCounts = {};
  level.obstacles.forEach(obs => {
    obstacleCounts[obs.type] = (obstacleCounts[obs.type] || 0) + 1;
  });
  console.log(`   Obstacles (${level.obstacles.length} total):`);
  Object.entries(obstacleCounts).forEach(([type, count]) => {
    const dmg = OBSTACLE_DAMAGE[type];
    console.log(`      - ${type}: ${count}x (${dmg === 999 ? 'instant death' : dmg + ' dmg'})`);
  });

  // Power-up breakdown
  const powerupCounts = {};
  level.powerups.forEach(pu => {
    powerupCounts[pu.type] = (powerupCounts[pu.type] || 0) + 1;
  });
  console.log(`   Power-ups (${level.powerups.length} total):`);
  Object.entries(powerupCounts).forEach(([type, count]) => {
    const effect = POWERUP_EFFECTS[type];
    const desc = effect.type === 'heal' ? `+${effect.amount} heart` : effect.type;
    console.log(`      - ${type}: ${count}x (${desc})`);
  });

  // Difficulty assessment
  const difficulty = level.scrollSpeed <= 170 ? 'Easy' :
                    level.scrollSpeed <= 195 ? 'Medium' : 'Hard';
  const pitCount = obstacleCounts['pit'] || 0;
  console.log(`   Difficulty: ${difficulty}${pitCount > 0 ? ` (${pitCount} death pit${pitCount > 1 ? 's' : ''})` : ''}`);

  console.log('');
});

// Summary
console.log('='.repeat(60));
console.log('\n📊 Summary:');
console.log(`   Total levels: ${LEVELS.length}`);
console.log(`   Total obstacles: ${LEVELS.reduce((sum, l) => sum + l.obstacles.length, 0)}`);
console.log(`   Total power-ups: ${LEVELS.reduce((sum, l) => sum + l.powerups.length, 0)}`);
console.log(`   Combined length: ${LEVELS.reduce((sum, l) => sum + l.length, 0)}px`);
console.log('');
