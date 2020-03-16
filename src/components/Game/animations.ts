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
    let sizeDenominator = 20;

    const animate = (): void => {
      if (sizeDenominator <= 1) {
        cancelAnimationFrame(this.animations.explosions[index]);

        return resolve();
      }

      const [offsetY, offsetX] = this.offset;

      renderExplosion.call(this, x - offsetX, y - offsetY, sizeDenominator);

      sizeDenominator -= 2;

      this.animations.explosions[index] = requestAnimationFrame(animate);
    };

    this.animations.explosions[index] = requestAnimationFrame(animate);
  });
}

export {
  animateActiveExit,
  animateExplosion,
};
