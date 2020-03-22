import { MapItems } from '../../constants/game';

import { renderExitActive } from './render/exit';
import { renderExplosion } from './render/explosion';
import { renderPanel } from './render';
import { renderSquare } from './render/square';
import { getMapItemsByType } from '../../utils/game';

function animateActiveExit(index: number, x: number, y: number): void {
  let start: number = performance.now();
  let state = 1;

  const animate = (time: number): void => {
    const [offsetY, offsetX] = this.offset;

    renderExitActive.call(this, x - offsetX, y - offsetY, state);

    if (!this.isPaused && time - start > 300) {
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

function animateTimer(): void {
  let start: number = performance.now();

  const animate = (time: number): void => {
    if (this.isGameOver || this.isLevelCompleted) {
      return cancelAnimationFrame(this.animations.timer);
    }

    if (!this.isPaused && time - start > 1000) {
      start = time;

      this.time -= 1;

      if (this.time === 0) {
        this.isGameOver = true;
      }

      renderPanel.call(this);
    }

    this.animations.timer = requestAnimationFrame(animate);
  };

  this.animations.timer = requestAnimationFrame(animate);
}

function animateSquare(id: number): void {
  let start = performance.now();
  let state = 1;

  const animate = (time: number): void => {
    const squares: number[][] = getMapItemsByType(this.levelMap, MapItems.Square);
    const [offsetY, offsetX] = this.offset;

    if (time - start > 100) {
      start = time;
      state += state < 4 ? 1 : -3;
    }

    squares.forEach((square: number[]) => {
      renderSquare.call(this, square[1] - offsetX, square[0] - offsetY, state);
    });

    this.animations.monsters[id] = requestAnimationFrame(animate);
  };

  this.animations.monsters[id] = requestAnimationFrame(animate);
}

function animateMonsters(): void {
  const squares: number[][] = getMapItemsByType(this.levelMap, MapItems.Square);

  if (squares.length) {
    animateSquare.call(this, this.animations.monsters.length);
  }
}

export {
  animateActiveExit,
  animateExplosion,
  animateTimer,
  animateMonsters,
};
