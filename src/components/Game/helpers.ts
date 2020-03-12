import { MapItems } from '../../constants/game';

function getCellSize(vmin: number): number {
  const vpWidth: number = window.innerWidth;
  const vpHeight: number = window.innerHeight;
  const vMin: number = vpWidth >= vpHeight ? (vpHeight / 100) : (vpWidth / 100);

  return Math.round(vMin * vmin  / 10) * 10;
}

function getMapItemsByType(levelMap: number[][], type: number): number[][] {
  const result: number[][] = [];

  if (!levelMap || !Array.isArray(levelMap)) {
    return result;
  }

  for (let y = 0; y < levelMap.length; y += 1) {
    for (let x = 0; x < levelMap[y].length; x += 1) {
      if (levelMap[y][x] === type) {
        result.push([y, x]);
      }
    }
  }

  return result;
}

function changeMapValue(levelMap: number[][], x: number, y: number, newValue: number): number[][] {
  return levelMap.map((row: number[], rowIndex: number) => row.map((column: number, columnIndex: number) => {
    return rowIndex === y && columnIndex === x ? newValue : levelMap[rowIndex][columnIndex];
  }));
}

function getInitialOffset(levelMap: number[][]): number[] {
  const items: number[][] = getMapItemsByType(levelMap, MapItems.Avatar);

  if (!items.length) {
    return [0, 0];
  }

  const [avatarY, avatarX] = items[0];
  const offsetY: number = levelMap[avatarY - 9] ? avatarY - 9 : 0;
  const offsetX: number = levelMap[offsetY][avatarX - 15] ? avatarX - 15 : 0;

  return [offsetY, offsetX];
}

export {
  getCellSize,
  getMapItemsByType,
  changeMapValue,
  getInitialOffset,
};
