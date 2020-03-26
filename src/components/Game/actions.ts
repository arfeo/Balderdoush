import { Game } from './index';
import { Alert } from '../common/Alert';

import { APP, MapItems } from '../../constants/game';
import { LEVELS } from '../../constants/levels';

import { renderMap, renderPanel } from './render';
import { changeMapValue, getMapItemsByType } from '../../utils/game';
import { animateActiveExit, animateExplosion } from './animations';
import { renderEmpty } from './render/empty';
import { isEmpty } from '../../utils/common';

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

  const [avatarY, avatarX] = items[0];
  const mapItem: number = this.levelMap[targetY][targetX];
  const isNormalState: boolean = this.avatarState === 'idle' || this.avatarState === 'walk';
  const isMovingLeft: boolean = avatarX > targetX;
  const isMovingRight: boolean = avatarX < targetX;
  const isEmptySpace: boolean = mapItem === MapItems.EmptySpace;
  const isSoil: boolean = mapItem === MapItems.Soil;
  const isDiamond: boolean = mapItem === MapItems.Diamond;
  const isActiveExit: boolean = mapItem === MapItems.Exit && this.diamondsToGet === 0;
  const isBoulder: boolean = mapItem === MapItems.Boulder;

  if (isBoulder) {
    if (isMovingLeft) {
      this.avatarState = 'pushLeft';
    }

    if (isMovingRight) {
      this.avatarState = 'pushRight';
    }

    if (avatarX === targetX && avatarY > targetY) {
      this.avatarState = 'prop';
    }
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
  let shouldRerender = false;

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

        shouldRerender = true;
      } else if (isEmptyCell.call(this, itemX + 1, itemY) && isEmptyCell.call(this, itemX + 1, itemY + 1)) {
        dropItem.call(this, itemX, itemY, itemX + 1, itemY + 1, itemType);

        shouldRerender = true;
      } else {
        this.fallingItems = removeFallingItem.call(this, itemX, itemY);
      }
    } else if (isEmptyCell.call(this, itemX, itemY + 1)) {
      dropItem.call(this, itemX, itemY, itemX, itemY + 1, itemType);

      shouldRerender = true;
    } else if (isAvatarInCell.call(this, itemX, itemY + 1) && isFalling) {
      this.isGameOver = true;
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
      }

      shouldRerender = true;
    } else {
      this.fallingItems = removeFallingItem.call(this, itemX, itemY);
    }
  }

  shouldRerender && renderMap.call(this);
}

function handleMonsters(): void {
  if (!isGameActive.call(this) || isEmpty(this.monsters)) {
    return;
  }

  handleMonstersByType.call(this, MapItems.Square);
  handleMonstersByType.call(this, MapItems.Butterfly);
}

function setMonsterDirection(direction: MonsterDirection, x: number, y: number): [number[], MonsterDirection] {
  let newPosition: number[] = [];
  let newDirection: MonsterDirection = direction;

  const isAllowedCell = (cellX: number, cellY: number): boolean => {
    return isEmptyCell.call(this, cellX, cellY)
      || isAvatarInCell.call(this, cellX, cellY)
      || isLavaInCell.call(this, cellX, cellY);
  };

  switch (direction) {
    case 'up':
      if (isAllowedCell(x - 1, y)) {
        newPosition = [y, x - 1];
        newDirection = 'left';
      } else if (isAllowedCell(x, y - 1)) {
        newPosition = [y - 1, x];
      } else if (isAllowedCell(x + 1, y)) {
        newPosition = [y, x + 1];
        newDirection = 'right';
      } else if (isAllowedCell(x, y + 1)) {
        newPosition = [y + 1, x];
        newDirection = 'down';
      }
      break;
    case 'right':
      if (isAllowedCell(x, y - 1)) {
        newPosition = [y - 1, x];
        newDirection = 'up';
      } else if (isAllowedCell(x + 1, y)) {
        newPosition = [y, x + 1];
      } else if (isAllowedCell(x, y + 1)) {
        newPosition = [y + 1, x];
        newDirection = 'down';
      } else if (isAllowedCell(x - 1, y)) {
        newPosition = [y, x - 1];
        newDirection = 'left';
      }
      break;
    case 'down':
      if (isAllowedCell(x + 1, y)) {
        newPosition = [y, x + 1];
        newDirection = 'right';
      } else if (isAllowedCell(x, y + 1)) {
        newPosition = [y + 1, x];
      } else if (isAllowedCell(x - 1, y)) {
        newPosition = [y, x - 1];
        newDirection = 'left';
      } else if (isAllowedCell(x, y - 1)) {
        newPosition = [y - 1, x];
        newDirection = 'up';
      }
      break;
    case 'left':
      if (isAllowedCell(x, y + 1)) {
        newPosition = [y + 1, x];
        newDirection = 'down';
      } else if (isAllowedCell(x - 1, y)) {
        newPosition = [y, x - 1];
      } else if (isAllowedCell(x, y - 1)) {
        newPosition = [y - 1, x];
        newDirection = 'up';
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

  let shouldRerender = false;

  monsters.forEach((butterfly: MonsterInfo): void => {
    const { position, direction } = butterfly;
    const [squareY, squareX] = position;
    const [newPosition, newDirection] = setMonsterDirection.call(this, direction, squareX, squareY);
    const [newPositionY, newPositionX] = newPosition;

    if (isAvatarInCell.call(this, newPositionX, newPositionY)) {
      this.isGameOver = true;

      if (monsterType === MapItems.Butterfly) {
        return explodeButterfly.call(this, newPositionX, newPositionY);
      }
    } else if (this.levelMap[newPositionY] && this.levelMap[newPositionY][newPositionX] === MapItems.GreenLava) {
      if (monsterType === MapItems.Square) {
        return explodeSquare.call(this, squareX, squareY);
      }

      if (monsterType === MapItems.Butterfly) {
        return explodeButterfly.call(this, squareX, squareY);
      }
    } else if (newPosition.length) {
      this.levelMap = moveMapItem.call(
        this,
        { x: squareX, y: squareY },
        { x: newPositionX, y: newPositionY },
        monsterType,
      );

      shouldRerender = true;
    }

    result.push({
      position: newPosition,
      direction: newDirection,
    });
  });

  this.monsters = {
    ...this.monsters,
    [`monster-${monsterType}`]: result,
  };

  shouldRerender && renderMap.call(this);
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

    if (this.levelMap[y]) {
      if (allowedCellTypes.indexOf(this.levelMap[y][x + 1]) > -1) {
        pushUnique(x + 1, y);
      }

      if (allowedCellTypes.indexOf(this.levelMap[y][x - 1]) > -1) {
        pushUnique(x - 1, y);
      }
    }

    if (this.levelMap[y + 1] && allowedCellTypes.indexOf(this.levelMap[y + 1][x]) > -1) {
      pushUnique(x, y + 1);
    }

    if (this.levelMap[y - 1] && allowedCellTypes.indexOf(this.levelMap[y - 1][x]) > -1) {
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
  explodeMonster.call(this, x, y, MapItems.Square, () => {
    this.isExploding = false;

    renderMap.call(this);
  });
}

function explodeButterfly(x: number, y: number): void {
  explodeMonster.call(this, x, y, MapItems.Butterfly, (explosionsCoords: number[][]) => {
    this.isExploding = false;

    explosionsCoords.forEach((explosion: number[]) => {
      const [explosionY, explosionX] = explosion;

      this.levelMap = changeMapValue(this.levelMap, explosionX, explosionY, MapItems.Diamond);
    });

    renderMap.call(this);
  });
}

function handleGameOver(): void {
  const items: number[][] = getMapItemsByType(this.levelMap, MapItems.Avatar);

  if (!this.isGameOver || !items.length) {
    return;
  }

  const [avatarY, avatarX] = items[0];
  const [explosionsPromises] = getExplosionParams.call(this, avatarX, avatarY);

  this.isExploding = true;

  Promise.all(explosionsPromises).then(() => {
    this.isExploding = false;
    this.lives -= 1;

    renderMap.call(this);
  });
}

function getExplosionParams(centerX: number, centerY: number): [Promise<void>[], number[][]] {
  const [offsetY, offsetX] = this.offset;
  const explosionsPromises: Promise<void>[] = [];
  const explosionsCoords: number[][] = [];
  let explosionIndex = 0;

  for (let y = centerY - 1; y <= centerY + 1; y += 1) {
    for (let x = centerX - 1; x <= centerX + 1; x += 1) {
      if (this.levelMap[y] && this.levelMap[y][x] !== MapItems.Wall && this.levelMap[y][x] !== MapItems.Exit) {
        explosionsPromises.push(animateExplosion.call(this, explosionIndex, x, y));
        explosionsCoords.push([y, x]);

        explosionIndex += 1;

        this.levelMap = changeMapValue(this.levelMap, x, y, MapItems.EmptySpace);
        this.fallingItems = removeFallingItem.call(this, x, y);

        renderEmpty.call(this, x - offsetX, y - offsetY);
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
        this.isLevelCompleted = true;

        this.destroy();

        if (LEVELS.some((level: Level) => level.id === this.levelId + 1)) {
          APP.pageInstance = new Game(this.levelId + 1, this.score, this.lives);
        } else {
          // TODO: modal dialog
          new Alert(this, 'Game over.');
        }
      }
      break;
    case MapItems.Boulder:
      if (avatarX > targetX && isEmptyCell.call(this, targetX - 1, targetY)) {
        this.levelMap = moveMapItem.call(this, { x: targetX, y: targetY }, { x: targetX - 1, y: targetY }, mapItem);
      }

      if (avatarX < targetX && isEmptyCell.call(this, targetX + 1, targetY)) {
        this.levelMap = moveMapItem.call(this, { x: targetX, y: targetY }, { x: targetX + 1, y: targetY }, mapItem);
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

function adjustOffset(x: number, y: number): void {
  const [offsetY, offsetX] = this.offset;

  if ((x - offsetX) < 3 && offsetX > 0) {
    this.offset = [offsetY, offsetX - 1];
  }

  if ((x - offsetX) >= 17 && this.levelMap && this.levelMap[0] && (offsetX + 20) < this.levelMap[0].length) {
    this.offset = [offsetY, offsetX + 1];
  }

  if ((y - offsetY) < 3 && offsetY > 0) {
    this.offset = [offsetY - 1, offsetX];
  }

  if ((y - offsetY) >= 10 && this.levelMap && (offsetY + 13) < this.levelMap.length) {
    this.offset = [offsetY + 1, offsetX];
  }
}

function makeMove(itemX: number, itemY: number, targetX: number, targetY: number): void {
  if (!checkMovePossibility.call(this, targetX, targetY) || !isGameActive.call(this)) {
    return;
  }

  checkTarget.call(this, targetX, targetY);

  this.levelMap = moveMapItem.call(this, { x: itemX, y: itemY }, { x: targetX, y: targetY }, MapItems.Avatar);

  adjustOffset.call(this, targetX, targetY);

  renderMap.call(this);
}

export {
  handleGravitation,
  handleGameOver,
  handleMonsters,
  handleExits,
  checkGreenLavaNeighbors,
  makeMove,
};
