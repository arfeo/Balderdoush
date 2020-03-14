import { renderExitActive } from './render/exit';
import { renderExplosion } from './render/explosion';

export const FADE_OUT_ANIMATION_SPEED = 1;

function animateActiveExit(index: number, x: number, y: number): void {
  let start: number = performance.now();
  let state = 1;

  const animate = (time: number): void => {
    const [offsetY, offsetX] = this.offset;

    renderExitActive.call(this, x - offsetX, y - offsetY, state);

    if (time - start > 300) {
      start = time;
      state = state === 1 ? 2 : 1;
    }

    this.animations.exits[index] = requestAnimationFrame(animate);
  };

  this.animations.exits[index] = requestAnimationFrame(animate);
}

function animateExplosion(index: number, x: number, y: number): void {
  let alpha = 1;

  const animate = (): void => {
    if (alpha < 0) {
      return cancelAnimationFrame(this.animations.explosions[index]);
    }

    const [offsetY, offsetX] = this.offset;

    renderExplosion.call(this, x - offsetX, y - offsetY, alpha);

    alpha -= FADE_OUT_ANIMATION_SPEED / 4;

    this.animations.explosions[index] = requestAnimationFrame(animate);
  };

  this.animations.explosions[index] = requestAnimationFrame(animate);
}

export {
  animateActiveExit,
  animateExplosion,
};
