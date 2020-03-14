import { renderExitActive } from './render/exit';

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

export { animateActiveExit };
