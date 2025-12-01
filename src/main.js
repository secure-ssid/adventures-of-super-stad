import Phaser from 'phaser';
import BootScene from './scenes/BootScene.js';
import TitleScene from './scenes/TitleScene.js';
import GameScene from './scenes/GameScene.js';

// V1 Weekend Build: Minimal scene list
// Boot → Title → Game (with overlays for GameOver/LevelComplete)

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 400,
  parent: 'game-container',
  backgroundColor: '#2d1b0e',
  pixelArt: true,
  roundPixels: true,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 800 },
      debug: true  // Temporarily enabled to see hitboxes
    }
  },
  scene: [BootScene, TitleScene, GameScene],
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  render: {
    antialias: false,
    antialiasGL: false,
    pixelArt: true,
    roundPixels: true,
    powerPreference: 'high-performance'
  },
  fps: {
    target: 60,
    forceSetTimeOut: false
  },
  callbacks: {
    postBoot: function (game) {
      game.canvas.style.imageRendering = 'pixelated';
      game.canvas.style.imageRendering = 'crisp-edges';
    }
  }
};

const game = new Phaser.Game(config);

export default game;
