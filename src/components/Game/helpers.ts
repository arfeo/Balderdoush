import { MapItems, VISIBLE_MAP_HEIGHT, VISIBLE_MAP_WIDTH } from '../../constants/game';

import { getMapItemsByType } from '../../utils/game';

function getInitialOffset(): number[] {
  const items: number[][] = getMapItemsByType(this.levelMap, MapItems.Avatar);

  if (!items.length) {
    return [0, 0];
  }

  const [avatarY, avatarX] = items[0];
  const offsetY: number = this.levelMap[avatarY - 9]
    ? (this.levelMap[avatarY + 3] ? avatarY - 9 : 21 - VISIBLE_MAP_HEIGHT + 1)
    : 0;
  const offsetX: number = this.levelMap[offsetY][avatarX - 15]
    ? (this.levelMap[offsetY][avatarX + 4] ? avatarX - 15 : 39 - VISIBLE_MAP_WIDTH + 1)
    : 0;

  return [offsetY, offsetX];
}

function isEmptyCell(x: number, y: number): boolean {
  return this.levelMap[y][x] === MapItems.EmptySpace;
}

function moveMapItem(moveFrom: MapItemCoords, moveTo: MapItemCoords, value: number): number[][] {
  return this.levelMap.map((row: number[], rowIndex: number) => row.map((column: number, columnIndex: number) => {
    if (rowIndex === moveFrom.y && columnIndex === moveFrom.x) {
      return MapItems.EmptySpace;
    }

    return rowIndex === moveTo.y && columnIndex === moveTo.x ? value : this.levelMap[rowIndex][columnIndex];
  }));
}

export {
  getInitialOffset,
  isEmptyCell,
  moveMapItem,
};
