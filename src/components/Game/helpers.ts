import { MapItems, VISIBLE_MAP_HEIGHT, VISIBLE_MAP_WIDTH } from '../../constants/game';

import { getMapItemsByType } from '../../core/utils/game';
import { renderMapItem } from './render';

import { MapItemCoords, MonsterDirection, Monsters } from './types';

function getInitialOffset(): number[] {
  const items: number[][] = getMapItemsByType(this.levelMap, MapItems.Avatar);

  if (!items.length) {
    return [0, 0];
  }

  const [avatarY, avatarX] = items[0];

  const offsetY: number = this.levelMap[avatarY - 9]
    ? (this.levelMap[avatarY + 3] ? avatarY - 9 : (21 - VISIBLE_MAP_HEIGHT + 1))
    : 0;

  const offsetX: number = this.levelMap[offsetY][avatarX - 15] !== undefined
    ? (this.levelMap[offsetY][avatarX + 4] !== undefined ? avatarX - 15 : (39 - VISIBLE_MAP_WIDTH + 1))
    : 0;

  return [offsetY, offsetX];
}

function isEmptyCell(x: number, y: number): boolean {
  return this.levelMap[y] && this.levelMap[y][x] === MapItems.EmptySpace;
}

function isAvatarInCell(x: number, y: number): boolean {
  return this.levelMap[y] && this.levelMap[y][x] === MapItems.Avatar;
}

function isLavaInCell(x: number, y: number): boolean {
  return this.levelMap[y] && this.levelMap[y][x] === MapItems.GreenLava;
}

function moveMapItem(moveFrom: MapItemCoords, moveTo: MapItemCoords, value: number): void {
  this.levelMap = this.levelMap.map((row: number[], rowIndex: number) => {
    return row.map((column: number, columnIndex: number) => {
      if (rowIndex === moveFrom.y && columnIndex === moveFrom.x) {
        return MapItems.EmptySpace;
      }

      return rowIndex === moveTo.y && columnIndex === moveTo.x ? value : this.levelMap[rowIndex][columnIndex];
    });
  });
}

function getMonsters(): Monsters {
  let result: Monsters = {};
  const items: number[][] = getMapItemsByType(this.levelMap, [
    MapItems.Square,
    MapItems.Butterfly,
  ]);

  items.forEach((item: number[]) => {
    const [itemY, itemX] = item;
    const itemType: number = this.levelMap[itemY][itemX];
    const itemName = `monster-${itemType}`;

    const getInitialDirection = (): MonsterDirection => {
      switch (itemType) {
        case MapItems.Square:
          return 'right';
        case MapItems.Butterfly:
          return 'left';
        default: break;
      }
    };

    if (!result[itemName]) {
      result[itemName] = [];
    }

    result = {
      ...result,
      [itemName]: [
        ...result[itemName],
        {
          position: item,
          direction: getInitialDirection(),
        },
      ],
    };
  });

  return result;
}

function isItemFalling(x: number, y: number): boolean {
  return this.fallingItems.filter((item: number[]) => item[0] === y && item[1] === x).length > 0;
}

function dropItem(initialX: number, initialY: number, targetX: number, targetY: number, itemType: number): void {
  const fallingItemsCopy = isItemFalling.call(this, initialX, initialY)
    ? removeFallingItem.call(this, initialX, initialY)
    : [...this.fallingItems];

  fallingItemsCopy.push([targetY, targetX]);

  moveMapItem.call(this, { x: initialX, y: initialY }, { x: targetX, y: targetY }, itemType);
  renderMapItem.call(this, initialX, initialY);
  renderMapItem.call(this, targetX, targetY);

  this.fallingItems = fallingItemsCopy;
}

function removeFallingItem(x: number, y: number): number[][] {
  return this.fallingItems.filter((item: number[]) => !(item[0] === y && item[1] === x));
}

function isGameActive(): boolean {
  return !this.isPaused && !this.isGameOver && !this.isLevelCompleted;
}

export {
  getInitialOffset,
  isEmptyCell,
  isAvatarInCell,
  isLavaInCell,
  moveMapItem,
  getMonsters,
  isItemFalling,
  dropItem,
  removeFallingItem,
  isGameActive,
};
