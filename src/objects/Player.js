import Phaser from 'phaser';

// V1 Weekend Build: Animated Super Stad with jump only

export default class Player {
  constructor(scene, x, y, runSpeed = 200) {
    this.scene = scene;

    // Stats
    this.maxHearts = 3;
    this.hearts = 3;
    this.runSpeed = runSpeed;
    this.jumpForce = -420;

    // State
    this.canJump = true;
    this.isInvulnerable = false;

    // Create animated sprite - use new sprite sheet if available, else fallback
    const useNewSprites = scene.textures.exists('superstad-run-sheet');
    console.log('Using new sprite sheets:', useNewSprites);
    console.log('Available textures:', scene.textures.list);

    if (useNewSprites) {
      // New sprite sheet: 284x318 per frame
      this.sprite = scene.physics.add.sprite(x, y, 'superstad-run-sheet', 0);
      this.sprite.setScale(0.22);  // Slightly larger: 318px * 0.22 = ~70px display height

      // Hitbox in ORIGINAL frame coords (284x318)
      // Character is centered horizontally, feet near bottom of frame
      // Using tighter hitbox for better gameplay feel
      this.sprite.body.setSize(120, 220);   // Tighter hitbox
      this.sprite.body.setOffset(82, 70);   // (284-120)/2=82, top offset for head room
    } else {
      // Fallback: procedural sprites (64x80 per frame)
      this.sprite = scene.physics.add.sprite(x, y, 'superstad-idle-1');
      this.sprite.setScale(0.8);
      this.sprite.body.setSize(40, 60);
      this.sprite.body.setOffset(12, 15);
    }

    // Play idle animation
    if (scene.anims.exists('superstad-idle')) {
      this.sprite.play('superstad-idle');
    }

    this.sprite.setCollideWorldBounds(false);
    this.sprite.setBounce(0);
  }

  update(isRunning) {
    // Check if on ground
    const wasOnGround = this.canJump;
    this.canJump = this.sprite.body.touching.down || this.sprite.body.blocked.down;

    // Landing dust particles
    if (!wasOnGround && this.canJump && this.sprite.body.velocity.y > 100) {
      this.onLanding();
    }

    // Movement
    if (isRunning) {
      this.sprite.setVelocityX(this.runSpeed);
    } else {
      this.sprite.setVelocityX(0);
    }

    // Animation switching
    this.updateAnimation(isRunning);
  }

  updateAnimation(isRunning) {
    const currentAnim = this.sprite.anims.currentAnim?.key;

    if (!this.canJump) {
      // In the air - play jump animation
      if (currentAnim !== 'superstad-jump') {
        this.sprite.play('superstad-jump');
      }
    } else if (isRunning) {
      // Running on ground
      if (currentAnim !== 'superstad-run') {
        this.sprite.play('superstad-run');
      }
    } else {
      // Idle
      if (currentAnim !== 'superstad-idle') {
        this.sprite.play('superstad-idle');
      }
    }
  }

  onLanding() {
    if (this.scene.dustParticles) {
      this.scene.dustParticles.emitParticleAt(
        this.sprite.x,
        this.sprite.y + 30,
        5
      );
    }
  }

  jump() {
    if (this.canJump) {
      this.sprite.setVelocityY(this.jumpForce);
      this.canJump = false;
      return true;
    }
    return false;
  }

  takeDamage(amount) {
    if (this.isInvulnerable) return;

    this.hearts = Math.max(0, this.hearts - amount);

    // Brief invulnerability with flash
    this.isInvulnerable = true;
    this.scene.tweens.add({
      targets: this.sprite,
      alpha: 0.5,
      duration: 100,
      yoyo: true,
      repeat: 5,
      onComplete: () => {
        this.sprite.alpha = 1;
        this.isInvulnerable = false;
      }
    });
  }

  heal(amount) {
    this.hearts = Math.min(this.maxHearts, this.hearts + amount);

    // Heal effect - green tint
    this.scene.tweens.add({
      targets: this.sprite,
      tint: 0x00ff00,
      duration: 200,
      yoyo: true,
      onComplete: () => {
        this.sprite.clearTint();
      }
    });
  }
}
