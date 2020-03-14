import { renderExitActive } from './render/exit';

function animateActiveExit(index: number, x: number, y: number): void {
  let start: number = performance.now();
  let state = 1;

  const animate = (time: number): void => {
    const [offsetY, offsetX] = this.offset;

    if (time - start > 500) {
      renderExitActive.call(this, x - offsetX, y - offsetY, state);

      start = time;
      state = state === 1 ? 2 : 1;
    }

    this.animateExits[index] = requestAnimationFrame(animate);
  };

  this.animateExits[index] = requestAnimationFrame(animate);
}

export { animateActiveExit };