import { Alert } from '../common/Alert';

import { MapItems } from '../../constants/game';

import { renderMap, renderPanel } from './render';
import { changeMapValue, getMapItemsByType } from '../../utils/game';
import { animateActiveExit, animateExplosion } from './animations';
import { renderEmpty } from './render/empty';
import { isEmptyCell } from './helpers';

function checkMovePossibility(targetX: number, targetY: number): boolean {
  if (this.levelMap[targetY] === undefined || this.levelMap[targetY][targetX] === undefined) {
    return false;
  }

  const mapItem: number = this.levelMap[targetY][targetX];
  const isEmptySpace: boolean = mapItem === MapItems.EmptySpace;
  const isSoil: boolean = mapItem === MapItems.Soil;
  const isDiamond: boolean = mapItem === MapItems.Diamond;
  const isActiveExit: boolean = mapItem === MapItems.Exit && this.diamondsToGet === 0;

  return isEmptySpace || isSoil || isDiamond || isActiveExit;
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
        this.levelMap = changeMapValue(this.levelMap, itemX, itemY, MapItems.EmptySpace);
        this.levelMap = changeMapValue(this.levelMap, itemX - 1, itemY + 1, itemType);

        if (this.levelMap[itemY + 2] && this.levelMap[itemY + 2][itemX - 1] === MapItems.Avatar) {
          this.isGameOver = true;
        }

        shouldRerender = true;
      }

      if (isEmptyCell.call(this, itemX + 1, itemY) && isEmptyCell.call(this, itemX + 1, itemY + 1)) {
        this.levelMap = changeMapValue(this.levelMap, itemX, itemY, MapItems.EmptySpace);
        this.levelMap = changeMapValue(this.levelMap, itemX + 1, itemY + 1, itemType);

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
        this.levelMap = changeMapValue(this.levelMap, itemX, itemY, MapItems.EmptySpace);
        this.levelMap = changeMapValue(this.levelMap, itemX, itemY + 1, itemType);

        shouldRerender = true;
      }
    }
  }

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
  });
}

function handleTarget(targetX: number, targetY: number): void {
  const mapItem: number = this.levelMap[targetY] && this.levelMap[targetY][targetX];

  switch (mapItem) {
    case MapItems.Exit:
      if (this.diamondsToGet === 0) {
        this.isLevelCompleted = true;

        new Alert(this, 'Level completed.');
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
  if (!checkMovePossibility.call(this, targetX, targetY) || this.isGameOver || this.isLevelCompleted) {
    return;
  }

  handleTarget.call(this, targetX, targetY);

  this.levelMap = changeMapValue(this.levelMap, itemX, itemY, MapItems.EmptySpace);
  this.levelMap = changeMapValue(this.levelMap, targetX, targetY, MapItems.Avatar);

  adjustOffset.call(this, targetX, targetY);

  renderMap.call(this);
}

export {
  handleGravitation,
  handleGameOver,
  handleExits,
  makeMove,
};
