// Touch controls for mobile browsers
// Detects swipe up (jump) and swipe down (slide)

export default class TouchControls {
  constructor(scene, callbacks) {
    this.scene = scene;
    this.callbacks = callbacks;

    // Touch tracking
    this.startX = 0;
    this.startY = 0;
    this.startTime = 0;
    this.isTracking = false;

    // Thresholds
    this.swipeThreshold = 30;     // Minimum distance for a swipe
    this.swipeTimeLimit = 300;    // Maximum time for a swipe (ms)
    this.tapThreshold = 10;       // Maximum movement for a tap

    // Set up event listeners
    this.setupListeners();

    // Track if currently sliding (for hold detection)
    this.slideInterval = null;
  }

  setupListeners() {
    const input = this.scene.input;

    input.on('pointerdown', (pointer) => {
      this.startX = pointer.x;
      this.startY = pointer.y;
      this.startTime = Date.now();
      this.isTracking = true;

      // Start slide detection on hold
      this.slideInterval = this.scene.time.addEvent({
        delay: 150,
        callback: () => {
          // If still holding and moved down, slide
          if (this.isTracking && this.callbacks.onSlideStart) {
            this.callbacks.onSlideStart();
          }
        }
      });
    });

    input.on('pointermove', (pointer) => {
      if (!this.isTracking) return;

      const deltaY = pointer.y - this.startY;

      // If swiping down while holding, slide
      if (deltaY > this.swipeThreshold && this.callbacks.onSlideStart) {
        this.callbacks.onSlideStart();
      }
    });

    input.on('pointerup', (pointer) => {
      if (!this.isTracking) return;

      const endTime = Date.now();
      const deltaTime = endTime - this.startTime;
      const deltaX = pointer.x - this.startX;
      const deltaY = pointer.y - this.startY;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

      // Clear slide interval
      if (this.slideInterval) {
        this.slideInterval.remove();
        this.slideInterval = null;
      }

      // Stop sliding
      if (this.callbacks.onSlideEnd) {
        this.callbacks.onSlideEnd();
      }

      // Check for swipe
      if (deltaTime < this.swipeTimeLimit && distance > this.swipeThreshold) {
        // Determine direction
        if (Math.abs(deltaY) > Math.abs(deltaX)) {
          // Vertical swipe
          if (deltaY < -this.swipeThreshold && this.callbacks.onSwipeUp) {
            this.callbacks.onSwipeUp();
          } else if (deltaY > this.swipeThreshold && this.callbacks.onSwipeDown) {
            this.callbacks.onSwipeDown();
          }
        }
      } else if (distance < this.tapThreshold && this.callbacks.onTap) {
        // It's a tap
        this.callbacks.onTap();
      }

      this.isTracking = false;
    });
  }

  destroy() {
    if (this.slideInterval) {
      this.slideInterval.remove();
    }
  }
}
