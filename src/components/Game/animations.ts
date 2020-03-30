import { MapItems } from '../../constants/game';

import { renderExitActive } from './render/exit';
import { renderExplosion } from './render/explosion';
import { renderPanel } from './render';
import { renderBrickWall } from './render/brickWall';
import { renderSquare } from './render/square';
import { renderButterfly } from './render/butterfly';
import { renderGreenLava } from './render/greenLava';
import { getRandomNum, isEmpty, isObject } from '../../utils/common';
import { changeMapValue, getMapItemsByType } from '../../utils/game';
import { checkGreenLavaNeighbors } from './actions';
import { isGameActive } from './helpers';

function animateActiveExit(index: number, x: number, y: number): void {
  let start: number = performance.now();
  let state = 1;

  const animate = (time: number): void => {
    const [offsetY, offsetX] = this.offset;

    renderExitActive.call(this, x - offsetX, y - offsetY, state);

    if (isGameActive.call(this) && time - start > 300) {
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
    const squares: MonsterInfo[] = this.monsters[`monster-${MapItems.Square}`];
    const [offsetY, offsetX] = this.offset;

    if (isGameActive.call(this) && time - start > this.loopTimeout / 4) {
      start = time;
      state += state < 4 ? 1 : -3;

      squares.forEach((square: MonsterInfo) => {
        const [squareY, squareX] = square.position;

        !this.shouldRerenderMap && renderSquare.call(this, squareX - offsetX, squareY - offsetY, state);
      });
    }

    this.animations.monsters[id] = requestAnimationFrame(animate);
  };

  this.animations.monsters[id] = requestAnimationFrame(animate);
}

function animateButterfly(id: number): void {
  let start = performance.now();
  let state = 1;

  const animate = (time: number): void => {
    const butterflies: MonsterInfo[] = this.monsters[`monster-${MapItems.Butterfly}`];
    const [offsetY, offsetX] = this.offset;

    if (isGameActive.call(this) && time - start > this.loopTimeout / 2) {
      start = time;
      state = state === 1 ? 2 : 1;

      butterflies.forEach((butterfly: MonsterInfo) => {
        const [butterflyY, butterflyX] = butterfly.position;

        !this.shouldRerenderMap && renderButterfly.call(this, butterflyX - offsetX, butterflyY - offsetY, state);
      });
    }

    this.animations.monsters[id] = requestAnimationFrame(animate);
  };

  this.animations.monsters[id] = requestAnimationFrame(animate);
}

function animateMonsters(): void {
  if (!isObject(this.monsters) || isEmpty(this.monsters)) {
    return;
  }

  this.monsters[`monster-${MapItems.Square}`] && animateSquare.call(this, this.animations.monsters.length);
  this.monsters[`monster-${MapItems.Butterfly}`] && animateButterfly.call(this, this.animations.monsters.length);
}

function animateGreenLavaFlow(): void {
  let start = performance.now();
  let wait = getRandomNum(250, 1500);

  const animate = (time: number): void => {
    if (isGameActive.call(this) && time - start > wait) {
      const lavaItems: number[][] = getMapItemsByType(this.levelMap, MapItems.GreenLava);

      if (!lavaItems.length) {
        return;
      }

      const neighbors: number[][] = checkGreenLavaNeighbors.call(this, lavaItems);

      if (!neighbors.length) {
        lavaItems.forEach((item: number[]) => {
          const [itemY, itemX] = item;

          this.levelMap = changeMapValue(this.levelMap, itemX, itemY, MapItems.Diamond);
        });

        return cancelAnimationFrame(this.animations.greenLava);
      }

      const randomNeighbor: number[] = neighbors[getRandomNum(0, neighbors.length - 1)];
      const [neighborY, neighborX] = randomNeighbor;
      const [offsetY, offsetX] = this.offset;

      this.levelMap = changeMapValue(this.levelMap, neighborX, neighborY, MapItems.GreenLava);

      start = time;
      wait = getRandomNum(250, 1500);

      renderGreenLava.call(this, neighborX - offsetX, neighborY - offsetY);
    }

    this.animations.greenLava = requestAnimationFrame(animate);
  };

  this.animations.greenLava = requestAnimationFrame(animate);
}

function animateBrickWallSpecial(): void {
  const memorisedStart = performance.now();
  let start = memorisedStart;
  let state = 1;

  const animate = (time: number): void => {
    if (isGameActive.call(this) && this.isBrickWallSpecialActive && time - start > this.loopTimeout * 2) {
      const brickWallSpecialItems: number[][] = getMapItemsByType(this.levelMap, MapItems.BrickWallSpecial);
      const [offsetY, offsetX] = this.offset;

      if (!brickWallSpecialItems.length) {
        return;
      }

      brickWallSpecialItems.forEach((item: number[]) => {
        const [itemY, itemX] = item;

        renderBrickWall.call(this, itemX - offsetX, itemY - offsetY, 2);
      });

      start = time;
      state = state === 1 ? 2 : 1;

      if (time - memorisedStart > 100000) {
        this.isBrickWallSpecialActive = false;
      }
    }

    this.animations.brickWallSpecial = requestAnimationFrame(animate);
  };

  this.animations.brickWallSpecial = requestAnimationFrame(animate);
}

function startAnimations(): void {
  const lavaItems: number[][] = getMapItemsByType(this.levelMap, MapItems.GreenLava);
  const brickWallSpecialItems: number[][] = getMapItemsByType(this.levelMap, MapItems.BrickWallSpecial);

  animateTimer.call(this);
  animateMonsters.call(this);

  lavaItems.length && animateGreenLavaFlow.call(this);
  brickWallSpecialItems.length && animateBrickWallSpecial.call(this);
}

export {
  animateActiveExit,
  animateExplosion,
  startAnimations,
};
