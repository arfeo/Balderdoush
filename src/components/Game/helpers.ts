/**
 * Function returns the cell size (atomic canvas measure)
 * depending on the screen size and the given vmin value
 */
function getCellSize(vmin: number): number {
  const vpWidth: number = window.innerWidth;
  const vpHeight: number = window.innerHeight;
  const vMin: number = vpWidth >= vpHeight ? (vpHeight / 100) : (vpWidth / 100);

  return Math.round(vMin * vmin  / 10) * 10;
}

/**
 * Function returns an array of items' coordinates for the given level map
 * according to the given item type; if the given map is undefined or not an array,
 * function returns an empty array
 *
 * @param levelMap
 * @param type
 */
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

/**
 * Immutably changes the level map value
 *
 * @param levelMap
 * @param x
 * @param y
 * @param newValue
 */
function changeMapValue(levelMap: number[][], x: number, y: number, newValue: number): number[][] {
  return levelMap.map((row: number[], rowIndex: number) => row.map((column: number, columnIndex: number) => {
    return rowIndex === y && columnIndex === x ? newValue : levelMap[rowIndex][columnIndex];
  }));
}

export {
  getCellSize,
  getMapItemsByType,
  changeMapValue,
};
