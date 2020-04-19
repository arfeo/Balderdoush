import { MapItems } from '../../constants/game';

import { renderExitActive } from './render/exit';
import { renderExplosion } from './render/explosion';
import { renderMapItem, renderPanel } from './render';
import { renderAvatar } from './render/avatar';
import { renderBrickWall } from './render/brickWall';
import { renderSquare } from './render/square';
import { renderButterfly } from './render/butterfly';
import { getRandomNum, isEmpty, isObject } from '../../utils/common';
import { changeMapValue, getMapItemsByType } from '../../utils/game';
import { checkGreenLavaNeighbors } from './actions';
import { isGameActive } from './helpers';

import { MonsterInfo } from './types';

function animateActiveExit(index: number, x: number, y: number): void {
  let start: number = performance.now();
  let state = 1;

  const animate = (time: number): void => {
    renderExitActive.call(this, x, y, state);

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
      if (time - start > 5) {
        renderExplosion.call(this, x, y, sizeNumerator);

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

function animateAvatar(): void {
  let start: number = performance.now();

  this.avatarAnimationState = 1;

  const animate = (time: number): void => {
    if (this.storedAvatarState !== this.avatarState) {
      const avatarItems: number[][] = getMapItemsByType(this.levelMap, MapItems.Avatar);

      if (!avatarItems.length) {
        return cancelAnimationFrame(this.animations.avatar);
      }

      const [avatarY, avatarX] = avatarItems[0];

      renderAvatar.call(this, avatarX, avatarY, this.avatarAnimationState);

      this.storedAvatarState = this.avatarState;

      this.avatarAnimationState = 1;
    } else {
      if (time - start > 100) {
        if (['pushLeft', 'pushRight', 'walkLeft', 'walkRight'].indexOf(this.avatarState) > -1) {
          const avatarItems: number[][] = getMapItemsByType(this.levelMap, MapItems.Avatar);

          if (!avatarItems.length) {
            return cancelAnimationFrame(this.animations.avatar);
          }

          const [avatarY, avatarX] = avatarItems[0];

          renderAvatar.call(this, avatarX, avatarY, this.avatarAnimationState);

          this.avatarAnimationState += this.avatarAnimationState < 4 ? 1 : -3;
          start = time;
        }
      }
    }

    this.animations.avatar = requestAnimationFrame(animate);
  };

  this.animations.avatar = requestAnimationFrame(animate);
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
  let start: number = performance.now();
  let state = 1;

  const animate = (time: number): void => {
    const squares: MonsterInfo[] = this.monsters[`monster-${MapItems.Square}`];

    if (isGameActive.call(this) && time - start > this.loopTimeout) {
      start = time;
      state += state < 4 ? 1 : -3;

      squares.forEach((square: MonsterInfo) => {
        const [squareY, squareX] = square.position;

        renderSquare.call(this, squareX, squareY, state);
      });
    }

    this.animations.monsters[id] = requestAnimationFrame(animate);
  };

  this.animations.monsters[id] = requestAnimationFrame(animate);
}

function animateButterfly(id: number): void {
  let start: number = performance.now();
  let state = 1;

  const animate = (time: number): void => {
    const butterflies: MonsterInfo[] = this.monsters[`monster-${MapItems.Butterfly}`];

    if (isGameActive.call(this) && time - start > this.loopTimeout) {
      start = time;
      state = state === 1 ? 2 : 1;

      butterflies.forEach((butterfly: MonsterInfo) => {
        const [butterflyY, butterflyX] = butterfly.position;

        renderButterfly.call(this, butterflyX, butterflyY, state);
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
  let start: number = performance.now();
  let wait: number = getRandomNum(500, 2000);

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

          renderMapItem.call(this, itemX, itemY);
        });

        return cancelAnimationFrame(this.animations.greenLava);
      }

      const randomNeighbor: number[] = neighbors[getRandomNum(0, neighbors.length - 1)];
      const [neighborY, neighborX] = randomNeighbor;

      this.levelMap = changeMapValue(this.levelMap, neighborX, neighborY, MapItems.GreenLava);

      start = time;
      wait = getRandomNum(250, 1500);

      renderMapItem.call(this, neighborX, neighborY);
    }

    this.animations.greenLava = requestAnimationFrame(animate);
  };

  this.animations.greenLava = requestAnimationFrame(animate);
}

function animateBrickWallSpecial(): void {
  const memorisedStart: number = performance.now();
  let start: number = memorisedStart;
  let state = 1;

  const animate = (time: number): void => {
    if (isGameActive.call(this) && this.isBrickWallSpecialActive && time - start > this.loopTimeout * 2) {
      const brickWallSpecialItems: number[][] = getMapItemsByType(this.levelMap, MapItems.BrickWallSpecial);

      if (!brickWallSpecialItems.length) {
        return;
      }

      brickWallSpecialItems.forEach((item: number[]) => {
        const [itemY, itemX] = item;

        renderBrickWall.call(this, itemX, itemY, state);
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
  animateAvatar.call(this);
  animateMonsters.call(this);

  lavaItems.length && animateGreenLavaFlow.call(this);
  brickWallSpecialItems.length && animateBrickWallSpecial.call(this);
}

export {
  animateActiveExit,
  animateExplosion,
  startAnimations,
};
