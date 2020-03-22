import { Alert } from '../common/Alert';

import { MapItems } from '../../constants/game';

import { renderMap, renderPanel } from './render';
import { changeMapValue, getMapItemsByType } from '../../utils/game';
import { animateActiveExit, animateExplosion } from './animations';
import { renderEmpty } from './render/empty';
import { isEmptyCell, moveMapItem } from './helpers';
import { isEmpty } from '../../utils/common';

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
      (isMovingLeft && this.levelMap[targetY][targetX - 1] === MapItems.EmptySpace)
      || (isMovingRight && this.levelMap[targetY][targetX + 1] === MapItems.EmptySpace)
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
    const itemType = this.levelMap[itemY][itemX];

    if (this.levelMap[itemY + 1] === undefined) {
      continue;
    }

    if ([MapItems.Diamond, MapItems.Boulder].indexOf(this.levelMap[itemY + 1][itemX]) > -1) {
      if (isEmptyCell.call(this, itemX - 1, itemY) && isEmptyCell.call(this, itemX - 1, itemY + 1)) {
        this.levelMap = moveMapItem.call(this, { x: itemX, y: itemY }, { x: itemX - 1, y: itemY + 1 }, itemType);

        if (this.levelMap[itemY + 2] && this.levelMap[itemY + 2][itemX - 1] === MapItems.Avatar) {
          this.isGameOver = true;
        }

        shouldRerender = true;
      }

      if (isEmptyCell.call(this, itemX + 1, itemY) && isEmptyCell.call(this, itemX + 1, itemY + 1)) {
        this.levelMap = moveMapItem.call(this, { x: itemX, y: itemY }, { x: itemX + 1, y: itemY + 1 }, itemType);

        if (this.levelMap[itemY + 2] && this.levelMap[itemY + 2][itemX + 1] === MapItems.Avatar) {
          this.isGameOver = true;
        }

        shouldRerender = true;
      }
    }

    if (isEmptyCell.call(this, itemX, itemY + 1)) {
      if (this.levelMap[itemY + 2] && this.levelMap[itemY + 2][itemX] === MapItems.Avatar) {
        this.isGameOver = true;
      } else {
        this.levelMap = moveMapItem.call(this, { x: itemX, y: itemY }, { x: itemX, y: itemY + 1 }, itemType);

        shouldRerender = true;
      }
    }
  }

  shouldRerender && renderMap.call(this);
}

function handleMonsters(): void {
  if (this.isPaused || isEmpty(this.monsters)) {
    return;
  }

  handleSquareMonsters.call(this);
}

function handleSquareMonsters(): void {
  const monsterType: number = MapItems.Square;
  const squares: MonsterInfo[] = this.monsters[`monster-${monsterType}`];

  if (!squares) {
    return;
  }

  let shouldRerender = false;

  this.monsters = {
    ...this.monsters,
    [`monster-${monsterType}`]: squares.map((square: MonsterInfo): MonsterInfo => {
      const { position, direction } = square;
      const [squareY, squareX] = position;
      let newPosition: number[] = [];

      if (isEmptyCell.call(this, squareX + 1, squareY)) {
        newPosition = [squareY, squareX + 1];
      } else if (isEmptyCell.call(this, squareX, squareY + 1)) {
        newPosition = [squareY + 1, squareX];
      } else if (isEmptyCell.call(this, squareX - 1, squareY)) {
        newPosition = [squareY, squareX - 1];
      } else if (isEmptyCell.call(this, squareX, squareY - 1)) {
        newPosition = [squareY - 1, squareX];
      }

      if (newPosition.length) {
        this.levelMap = moveMapItem.call(
          this,
          { x: squareX, y: squareY },
          { x: newPosition[1], y: newPosition[0] },
          monsterType,
        );

        shouldRerender = true;
      }

      return {
        position: newPosition,
        direction,
      };
    }),
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

function handleGameOver(): void {
  const items: number[][] = getMapItemsByType(this.levelMap, MapItems.Avatar);

  if (!this.isGameOver || !items.length) {
    return;
  }

  const [offsetY, offsetX] = this.offset;
  const [avatarY, avatarX] = items[0];
  const explosionsPromises = [];
  let explosionIndex = 0;

  this.isExploding = true;

  for (let y = avatarY - 1; y <= avatarY + 1; y += 1) {
    for (let x = avatarX - 1; x <= avatarX + 1; x += 1) {
      if (this.levelMap[y] && this.levelMap[y][x] !== MapItems.Wall && this.levelMap[y][x] !== MapItems.Exit) {
        explosionsPromises.push(animateExplosion.call(this, explosionIndex, x, y));

        explosionIndex += 1;

        this.levelMap = changeMapValue(this.levelMap, x, y, MapItems.EmptySpace);

        renderEmpty.call(this, x - offsetX, y - offsetY);
      }
    }
  }

  Promise.all(explosionsPromises).then(() => {
    this.isExploding = false;
    this.lives -= 1;

    renderMap.call(this);
  });
}

function handleTarget(targetX: number, targetY: number): void {
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

        new Alert(this, 'Level completed.');
      }
      break;
    case MapItems.Boulder:
      if (avatarX > targetX && this.levelMap[targetY][targetX - 1] === MapItems.EmptySpace) {
        this.levelMap = moveMapItem.call(this, { x: targetX, y: targetY }, { x: targetX - 1, y: targetY }, mapItem);
      }

      if (avatarX < targetX && this.levelMap[targetY][targetX + 1] === MapItems.EmptySpace) {
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
  if (!checkMovePossibility.call(this, targetX, targetY) || this.isGameOver || this.isLevelCompleted || this.isPaused) {
    return;
  }

  handleTarget.call(this, targetX, targetY);

  this.levelMap = moveMapItem.call(this, { x: itemX, y: itemY }, { x: targetX, y: targetY }, MapItems.Avatar);

  adjustOffset.call(this, targetX, targetY);

  renderMap.call(this);
}

export {
  handleGravitation,
  handleGameOver,
  handleMonsters,
  handleExits,
  makeMove,
};
