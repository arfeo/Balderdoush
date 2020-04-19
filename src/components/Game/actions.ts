import { Game } from './index';
import { Menu } from '../Menu';

import { MapItems, TOTAL_MAP_WIDTH } from '../../constants/game';
import { LEVELS } from '../../constants/levels';

import { renderMapItem, renderPanel, rerenderCellWithNeighbors } from './render';
import { changeMapValue, getMapItemsByType } from '../../utils/game';
import { animateActiveExit, animateExplosion } from './animations';
import { isEmpty } from '../../utils/common';
import { saveStorageData } from '../../utils/storage';

import {
  dropItem,
  isAvatarInCell,
  isEmptyCell,
  isGameActive,
  isItemFalling,
  isLavaInCell,
  moveMapItem,
  removeFallingItem,
} from './helpers';

function checkMovePossibility(targetX: number, targetY: number): boolean {
  const items: number[][] = getMapItemsByType(this.levelMap, MapItems.Avatar);

  if (this.levelMap[targetY] === undefined || this.levelMap[targetY][targetX] === undefined || !items.length) {
    return false;
  }

  const [, avatarX] = items[0];
  const mapItem: number = this.levelMap[targetY][targetX];
  const isNormalState: boolean = ['idle', 'walkLeft', 'walkRight'].indexOf(this.avatarState) > -1;
  const isMovingLeft: boolean = avatarX > targetX;
  const isMovingRight: boolean = avatarX < targetX;
  const isEmptySpace: boolean = mapItem === MapItems.EmptySpace;
  const isSoil: boolean = mapItem === MapItems.Soil;
  const isDiamond: boolean = mapItem === MapItems.Diamond;
  const isActiveExit: boolean = mapItem === MapItems.Exit && this.diamondsToGet === 0;
  const isBoulder: boolean = mapItem === MapItems.Boulder;

  if (isMovingLeft) {
    this.avatarState = isBoulder ? 'pushLeft' : 'walkLeft';
  } else if (isMovingRight) {
    this.avatarState = isBoulder ? 'pushRight' : 'walkRight';
  } else {
    this.avatarState = 'idle';
  }

  return (
    isEmptySpace
    || isSoil
    || isDiamond
    || isActiveExit
    || (!isNormalState && (
      (isMovingLeft && isEmptyCell.call(this, targetX - 1, targetY))
      || (isMovingRight && isEmptyCell.call(this, targetX + 1, targetY))
    ))
  );
}

function handleGravitation(): void {
  const items: number[][] = getMapItemsByType(this.levelMap, [MapItems.Boulder, MapItems.Diamond]);

  if (!items.length || this.isExploding) {
    return;
  }

  for (const item of items) {
    const [itemY, itemX] = item;
    const itemType: number = this.levelMap[itemY][itemX];
    const isFalling: boolean = isItemFalling.call(this, itemX, itemY);

    if (this.levelMap[itemY + 1] === undefined) {
      continue;
    }

    if ([MapItems.Diamond, MapItems.Boulder, MapItems.BrickWall].indexOf(this.levelMap[itemY + 1][itemX]) > -1) {
      if (isEmptyCell.call(this, itemX - 1, itemY) && isEmptyCell.call(this, itemX - 1, itemY + 1)) {
        dropItem.call(this, itemX, itemY, itemX - 1, itemY + 1, itemType);
      } else if (isEmptyCell.call(this, itemX + 1, itemY) && isEmptyCell.call(this, itemX + 1, itemY + 1)) {
        dropItem.call(this, itemX, itemY, itemX + 1, itemY + 1, itemType);
      } else {
        this.fallingItems = removeFallingItem.call(this, itemX, itemY);
      }
    } else if (isEmptyCell.call(this, itemX, itemY + 1)) {
      dropItem.call(this, itemX, itemY, itemX, itemY + 1, itemType);
    } else if (isAvatarInCell.call(this, itemX, itemY + 1)) {
      if (isFalling) {
        this.isGameOver = true;
      } else {
        this.avatarState = 'prop';
      }
    } else if (this.levelMap[itemY + 1][itemX] === MapItems.Square && isFalling) {
      explodeSquare.call(this, itemX, itemY + 1);
    } else if (this.levelMap[itemY + 1][itemX] === MapItems.Butterfly && isFalling) {
      explodeButterfly.call(this, itemX, itemY + 1);
    } else if (this.levelMap[itemY + 1][itemX] === MapItems.BrickWallSpecial && isFalling) {
      if (!this.isBrickWallSpecialActive && !this.isBrickWallSpecialUsed) {
        this.isBrickWallSpecialActive = true;
        this.isBrickWallSpecialUsed = true;
      }

      this.levelMap = changeMapValue(this.levelMap, itemX, itemY, MapItems.EmptySpace);

      if (isEmptyCell.call(this, itemX, itemY + 2) && this.isBrickWallSpecialActive) {
        this.levelMap = changeMapValue(
          this.levelMap,
          itemX,
          itemY + 2,
          itemType === MapItems.Diamond ? MapItems.Boulder : MapItems.Diamond,
        );

        renderMapItem.call(this, itemX, itemY + 2);
      }

      renderMapItem.call(this, itemX, itemY);
    } else {
      this.fallingItems = removeFallingItem.call(this, itemX, itemY);
    }
  }
}

function handleMonsters(): void {
  if (!isGameActive.call(this) || isEmpty(this.monsters)) {
    return;
  }

  handleMonstersByType.call(this, MapItems.Square);
  handleMonstersByType.call(this, MapItems.Butterfly);
}

function setMonsterDirection(direction: MonsterDirection, x: number, y: number): [number[], MonsterDirection] {
  let newPosition: number[] = [y, x];
  let newDirection: MonsterDirection = direction;

  const isAllowedCell = (cellX: number, cellY: number): boolean => {
    return isEmptyCell.call(this, cellX, cellY)
      || isAvatarInCell.call(this, cellX, cellY)
      || isLavaInCell.call(this, cellX, cellY);
  };

  switch (direction) {
    case 'up':
      if (isAllowedCell(x + 1, y)) {
        newPosition = [y, x + 1];
        newDirection = 'right';
      } else if (isAllowedCell(x, y - 1)) {
        newPosition = [y - 1, x];
      } else if (isAllowedCell(x - 1, y)) {
        newPosition = [y, x - 1];
        newDirection = 'left';
      } else if (isAllowedCell(x, y + 1)) {
        newPosition = [y + 1, x];
        newDirection = 'down';
      }
      break;
    case 'right':
      if (isAllowedCell(x, y + 1)) {
        newPosition = [y + 1, x];
        newDirection = 'down';
      } else if (isAllowedCell(x + 1, y)) {
        newPosition = [y, x + 1];
      } else if (isAllowedCell(x, y - 1)) {
        newPosition = [y - 1, x];
        newDirection = 'up';
      } else if (isAllowedCell(x - 1, y)) {
        newPosition = [y, x - 1];
        newDirection = 'left';
      }
      break;
    case 'down':
      if (isAllowedCell(x - 1, y)) {
        newPosition = [y, x - 1];
        newDirection = 'left';
      } else if (isAllowedCell(x, y + 1)) {
        newPosition = [y + 1, x];
      } else if (isAllowedCell(x + 1, y)) {
        newPosition = [y, x + 1];
        newDirection = 'right';
      } else if (isAllowedCell(x, y - 1)) {
        newPosition = [y - 1, x];
        newDirection = 'up';
      }
      break;
    case 'left':
      if (isAllowedCell(x, y - 1)) {
        newPosition = [y - 1, x];
        newDirection = 'up';
      } else if (isAllowedCell(x - 1, y)) {
        newPosition = [y, x - 1];
      } else if (isAllowedCell(x, y + 1)) {
        newPosition = [y + 1, x];
        newDirection = 'down';
      } else if (isAllowedCell(x + 1, y)) {
        newPosition = [y, x + 1];
        newDirection = 'right';
      }
      break;
    default: break;
  }

  return [newPosition, newDirection];
}

function handleMonstersByType(monsterType: number): void {
  const monsters: MonsterInfo[] = this.monsters[`monster-${monsterType}`];
  const result: MonsterInfo[] = [];

  if (!monsters) {
    return;
  }

  monsters.forEach((monster: MonsterInfo): void => {
    const { position, direction } = monster;
    const [monsterY, monsterX] = position;
    const [newPos, newDir] = setMonsterDirection.call(this, direction, monsterX, monsterY);
    const [newPosY, newPosX] = newPos;

    if (isAvatarInCell.call(this, newPosX, newPosY)) {
      this.isGameOver = true;

      if (monsterType === MapItems.Butterfly) {
        this.lives -= 1;

        return explodeButterfly.call(this, newPosX, newPosY);
      }
    } else if (this.levelMap[newPosY] !== undefined && this.levelMap[newPosY][newPosX] === MapItems.GreenLava) {
      if (monsterType === MapItems.Square) {
        return explodeSquare.call(this, monsterX, monsterY);
      }

      if (monsterType === MapItems.Butterfly) {
        return explodeButterfly.call(this, monsterX, monsterY);
      }
    } else if (!(newPosX === monsterX && newPosY === monsterY)) {
      moveMapItem.call(
        this,
        { x: monsterX, y: monsterY },
        { x: newPosX, y: newPosY },
        monsterType,
      );

      renderMapItem.call(this, monsterX, monsterY);
      renderMapItem.call(this, newPosX, newPosY);
    }

    result.push({
      position: newPos,
      direction: newDir,
    });
  });

  this.monsters = {
    ...this.monsters,
    [`monster-${monsterType}`]: result,
  };
}

function handleExits(): void {
  if (this.diamondsToGet > 0 || this.animations.exits.length) {
    return;
  }

  const items: number[][] = getMapItemsByType(this.levelMap, MapItems.Exit);

  for (let i = 0; i < items.length; i += 1) {
    const [exitY, exitX] = items[i];

    animateActiveExit.call(this, i, exitX, exitY);
  }
}

function checkGreenLavaNeighbors(lavaItems: number[][]): number[][] {
  const allowedCellTypes: number[] = [
    MapItems.EmptySpace,
    MapItems.Soil,
  ];

  const result: number[][] = [];

  if (!lavaItems.length) {
    return result;
  }

  const pushUnique = (itemX: number, itemY: number): void => {
    if (result.some((item: number[]) => item[1] === itemX && item[0] === itemY)) {
      return;
    }

    result.push([itemY, itemX]);
  };

  lavaItems.forEach((lava: number[]) => {
    const [y, x] = lava;

    if (this.levelMap[y] !== undefined) {
      if (allowedCellTypes.indexOf(this.levelMap[y][x + 1]) > -1) {
        pushUnique(x + 1, y);
      }

      if (allowedCellTypes.indexOf(this.levelMap[y][x - 1]) > -1) {
        pushUnique(x - 1, y);
      }
    }

    if (this.levelMap[y + 1] !== undefined && allowedCellTypes.indexOf(this.levelMap[y + 1][x]) > -1) {
      pushUnique(x, y + 1);
    }

    if (this.levelMap[y - 1] !== undefined && allowedCellTypes.indexOf(this.levelMap[y - 1][x]) > -1) {
      pushUnique(x, y - 1);
    }
  });

  return result;
}

function explodeMonster(x: number, y: number, itemType: number, onDone: (coords: number[][]) => void): void {
  const [explosionsPromises, explosionsCoords] = getExplosionParams.call(this, x, y);
  const itemName = `monster-${itemType}`;

  this.isExploding = true;

  this.monsters = {
    ...this.monsters,
    [itemName]: this.monsters[itemName].filter((monster: MonsterInfo): boolean => {
      const [positionY, positionX] = monster.position || [];

      return !(positionY === y && positionX === x);
    }),
  };

  this.levelMap = changeMapValue(this.levelMap, x, y, MapItems.EmptySpace);

  Promise.all(explosionsPromises).then((): void => {
    typeof onDone === 'function' && onDone(explosionsCoords);
  });
}

function explodeSquare(x: number, y: number): void {
  explodeMonster.call(this, x, y, MapItems.Square, (explosionsCoords: number[][]) => {
    this.isExploding = false;

    explosionsCoords.map((explosion: number[]) => {
      const [explosionY, explosionX] = explosion;

      rerenderCellWithNeighbors.call(this, explosionX, explosionY);
    });
  });
}

function explodeButterfly(x: number, y: number): void {
  explodeMonster.call(this, x, y, MapItems.Butterfly, (explosionsCoords: number[][]) => {
    this.isExploding = false;

    explosionsCoords.forEach((explosion: number[]) => {
      const [explosionY, explosionX] = explosion;

      this.levelMap = changeMapValue(this.levelMap, explosionX, explosionY, MapItems.Diamond);

      rerenderCellWithNeighbors.call(this, explosionX, explosionY);
    });
  });
}

function handleGameOver(): void {
  const items: number[][] = getMapItemsByType(this.levelMap, MapItems.Avatar);

  if (!this.isGameOver || !items.length) {
    return;
  }

  const [avatarY, avatarX] = items[0];
  const [explosionsPromises, explosionsCoords] = getExplosionParams.call(this, avatarX, avatarY);

  this.isExploding = true;

  Promise.all(explosionsPromises).then(() => {
    this.isExploding = false;
    this.lives -= 1;

    explosionsCoords.forEach((explosion: number[]) => {
      const [explosionY, explosionX] = explosion;

      rerenderCellWithNeighbors.call(this, explosionX, explosionY);
    });
  });
}

function getExplosionParams(centerX: number, centerY: number): [Promise<void>[], number[][]] {
  const explosionsPromises: Promise<void>[] = [];
  const explosionsCoords: number[][] = [];
  let explosionIndex = 0;

  for (let y = centerY - 1; y <= centerY + 1; y += 1) {
    for (let x = centerX - 1; x <= centerX + 1; x += 1) {
      if (
        this.levelMap[y] !== undefined
        && this.levelMap[y][x] !== MapItems.Wall
        && this.levelMap[y][x] !== MapItems.Exit
      ) {
        explosionsPromises.push(animateExplosion.call(this, explosionIndex, x, y));
        explosionsCoords.push([y, x]);

        explosionIndex += 1;

        if (this.levelMap[y][x] === MapItems.Avatar) {
          this.isGameOver = true;
        }

        this.levelMap = changeMapValue(this.levelMap, x, y, MapItems.EmptySpace);
        this.fallingItems = removeFallingItem.call(this, x, y);

        renderMapItem.call(this, x, y);
      }
    }
  }

  return [explosionsPromises, explosionsCoords];
}

function checkTarget(targetX: number, targetY: number): void {
  const items: number[][] = getMapItemsByType(this.levelMap, MapItems.Avatar);

  if (!items.length) {
    return;
  }

  const [, avatarX] = items[0];
  const mapItem: number = this.levelMap[targetY] && this.levelMap[targetY][targetX];

  switch (mapItem) {
    case MapItems.Exit:
      if (this.diamondsToGet === 0) {
        const nextLevelId: number = this.levelId + 1;

        this.isLevelCompleted = true;

        this.destroy();

        if (LEVELS.some((level: Level) => level.id === nextLevelId)) {
          saveStorageData('levelId', nextLevelId);

          new Game(nextLevelId, this.score, this.lives);
        } else {
          new Menu();
        }
      }
      break;
    case MapItems.Boulder:
      if (avatarX > targetX && isEmptyCell.call(this, targetX - 1, targetY)) {
        moveMapItem.call(this, { x: targetX, y: targetY }, { x: targetX - 1, y: targetY }, mapItem);
        renderMapItem.call(this, targetX - 1, targetY);
      }

      if (avatarX < targetX && isEmptyCell.call(this, targetX + 1, targetY)) {
        moveMapItem.call(this, { x: targetX, y: targetY }, { x: targetX + 1, y: targetY }, mapItem);
        renderMapItem.call(this, targetX + 1, targetY);
      }
      break;
    case MapItems.Diamond:
      this.score += this.diamondValue;

      if (this.diamondsToGet > 0) {
        this.diamondsToGet -= 1;
      }

      renderPanel.call(this);
      break;
    default: break;
  }
}

function adjustOffset(x: number, y: number): boolean {
  const [offsetY, offsetX] = this.offset;
  let isAdjusted = false;

  if ((x - offsetX) < 3 && offsetX > 0) {
    this.offset = [offsetY, offsetX - 1];
    isAdjusted = true;
  }

  if ((x - offsetX) >= 17 && this.levelMap && this.levelMap[0] && (offsetX + 20) < this.levelMap[0].length) {
    this.offset = [offsetY, offsetX + 1];
    isAdjusted = true;
  }

  if ((y - offsetY) < 3 && offsetY > 0) {
    this.offset = [offsetY - 1, offsetX];
    isAdjusted = true;
  }

  if ((y - offsetY) >= 10 && this.levelMap && (offsetY + 13) < this.levelMap.length) {
    this.offset = [offsetY + 1, offsetX];
    isAdjusted = true;
  }

  return isAdjusted;
}

function makeMove(itemX: number, itemY: number, targetX: number, targetY: number): void {
  if (!checkMovePossibility.call(this, targetX, targetY) || !isGameActive.call(this)) {
    return;
  }

  checkTarget.call(this, targetX, targetY);

  moveMapItem.call(this, { x: itemX, y: itemY }, { x: targetX, y: targetY }, MapItems.Avatar);

  renderMapItem.call(this, itemX, itemY);
  renderMapItem.call(this, targetX, targetY);

  if (adjustOffset.call(this, targetX, targetY)) {
    moveMapCanvas.call(this);
  }
}

function handleKeysPressed(): void {
  const { ArrowUp, ArrowRight, ArrowDown, ArrowLeft } = this.keysPressed;
  const items: number[][] = getMapItemsByType(this.levelMap, MapItems.Avatar);
  const [avatarY, avatarX] = items.length ? items[0] : [];
  let newAvatarX = avatarX;
  let newAvatarY = avatarY;

  if (ArrowUp) {
    newAvatarY -= 1;
  }

  if (ArrowRight) {
    newAvatarX += 1;
  }

  if (ArrowDown) {
    newAvatarY += 1;
  }

  if (ArrowLeft) {
    newAvatarX -= 1;
  }

  if (newAvatarX !== avatarX || newAvatarY !== avatarY) {
    makeMove.call(this, avatarX, avatarY, newAvatarX, newAvatarY);
  }
}

function moveMapCanvas(): void {
  const actualCellSize: number = this.mapCanvas.getBoundingClientRect().width / TOTAL_MAP_WIDTH;
  const [offsetY, offsetX] = this.offset;

  this.mapCanvas.style.top = `${-actualCellSize * offsetY}px`;
  this.mapCanvas.style.left = `${-actualCellSize * offsetX}px`;
}

export {
  handleGravitation,
  handleGameOver,
  handleMonsters,
  handleExits,
  handleKeysPressed,
  checkGreenLavaNeighbors,
  makeMove,
  moveMapCanvas,
};
