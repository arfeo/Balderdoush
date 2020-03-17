import { renderExitActive } from './render/exit';
import { renderExplosion } from './render/explosion';

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

function animateExplosion(index: number, x: number, y: number): Promise<void> {
  return new Promise((resolve) => {
    let start: number = performance.now();
    let sizeNumerator = 1;

    const animate = (time: number): void => {
      const [offsetY, offsetX] = this.offset;

      if (time - start > 5) {
        renderExplosion.call(this, x - offsetX, y - offsetY, sizeNumerator);

        start = time;
        sizeNumerator += sizeNumerator <= 20 ? 6 : 1;

        if (sizeNumerator > 30) {
          cancelAnimationFrame(this.animations.explosions[index]);

          return resolve();
        }
      }

      this.animations.explosions[index] = requestAnimationFrame(animate);
    };

    this.animations.explosions[index] = requestAnimationFrame(animate);
  });
}

export {
  animateActiveExit,
  animateExplosion,
};
