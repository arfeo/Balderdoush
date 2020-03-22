/* eslint-disable max-len */

/**
 * Map items:
 *
 *  0x0 - Empty space
 *  0x1 - Wall
 *  0x2 - Boulder
 *  0x3 - Square
 *  0x4 - Avatar
 *  0x5 - Exit
 *  0x6 - Diamond
 *  0x7 - Soil
 *  0x8 - Brick wall
 *  0x9 - Skull
 *  0xa - Butterfly
 */
export const LEVELS: Level[] = [
  {
    id: 1,
    diamondsToGet: 0xc,
    diamondValue: 0xf,
    time: 0x96,
    levelMap: [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 5, 7, 7, 7, 7, 7, 2, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 5, 1],
      [1, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 2, 7, 7, 7, 7, 2, 7, 7, 7, 2, 0, 7, 7, 7, 7, 7, 7, 2, 7, 7, 7, 7, 7, 7, 7, 7, 1],
      [1, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 6, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 1],
      [1, 7, 7, 7, 7, 2, 7, 7, 7, 2, 2, 7, 0, 7, 7, 7, 7, 7, 2, 2, 7, 7, 7, 7, 7, 7, 2, 7, 7, 7, 7, 7, 7, 2, 7, 7, 7, 7, 7, 1],
      [1, 7, 2, 7, 7, 6, 7, 7, 7, 2, 7, 7, 7, 7, 2, 7, 7, 7, 7, 7, 7, 0, 2, 0, 7, 7, 7, 0, 7, 7, 7, 7, 7, 7, 7, 2, 6, 7, 7, 1],
      [1, 7, 7, 7, 7, 7, 7, 7, 2, 6, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 2, 0, 7, 1],
      [1, 7, 7, 2, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 0, 2, 2, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 2, 7, 7, 7, 1],
      [1, 0, 7, 7, 7, 7, 7, 2, 7, 7, 7, 0, 2, 7, 7, 7, 2, 2, 6, 7, 7, 7, 7, 7, 0, 7, 7, 7, 7, 2, 7, 7, 7, 7, 7, 7, 7, 7, 7, 1],
      [1, 0, 7, 7, 7, 7, 7, 7, 7, 7, 7, 0, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 0, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 1],
      [1, 7, 7, 7, 7, 0, 7, 7, 7, 7, 7, 7, 7, 7, 0, 7, 7, 7, 7, 4, 7, 7, 6, 2, 0, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 1],
      [1, 7, 7, 7, 7, 7, 7, 7, 7, 2, 7, 7, 7, 7, 7, 2, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 2, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 1],
      [1, 7, 7, 7, 2, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 0, 2, 7, 7, 7, 7, 7, 2, 7, 7, 1],
      [1, 7, 2, 7, 7, 7, 7, 7, 7, 7, 0, 0, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 1],
      [1, 7, 7, 0, 7, 7, 0, 2, 2, 7, 2, 0, 7, 7, 7, 0, 7, 7, 2, 6, 7, 7, 7, 2, 2, 6, 7, 7, 7, 7, 7, 7, 7, 7, 0, 7, 7, 7, 7, 1],
      [1, 7, 7, 6, 7, 7, 2, 6, 7, 7, 7, 7, 7, 7, 7, 2, 2, 7, 7, 7, 7, 7, 7, 7, 2, 2, 7, 7, 7, 7, 7, 2, 7, 7, 2, 7, 7, 7, 7, 1],
      [1, 7, 7, 2, 7, 7, 2, 2, 7, 7, 7, 7, 7, 7, 2, 6, 2, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 6, 2, 7, 7, 7, 7, 0, 1],
      [1, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 2, 7, 7, 2, 7, 7, 0, 0, 0, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 2, 7, 7, 7, 7, 7, 7, 1],
      [1, 7, 7, 7, 7, 7, 7, 7, 7, 0, 7, 7, 7, 7, 7, 7, 2, 2, 7, 2, 2, 0, 7, 2, 7, 7, 7, 7, 2, 2, 7, 7, 7, 7, 7, 7, 7, 7, 7, 1],
      [1, 7, 7, 7, 7, 7, 2, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 6, 7, 7, 0, 7, 7, 7, 7, 7, 7, 2, 7, 7, 7, 7, 7, 1],
      [1, 5, 7, 7, 7, 7, 6, 7, 7, 7, 7, 7, 7, 0, 0, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 0, 7, 7, 7, 7, 7, 7, 6, 7, 7, 7, 7, 5, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ],
  },
  {
    id: 2,
    diamondsToGet: 0xc,
    diamondValue: 0xf,
    time: 0x96,
    levelMap: [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 8, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 8, 6, 2, 7, 7, 7, 7, 7, 7, 7, 7, 7, 1],
      [1, 7, 2, 6, 7, 7, 7, 7, 7, 2, 2, 7, 2, 7, 7, 8, 7, 7, 7, 2, 7, 7, 2, 7, 7, 7, 7, 8, 2, 2, 7, 7, 2, 7, 7, 7, 7, 2, 7, 1],
      [1, 7, 7, 2, 2, 2, 2, 7, 7, 7, 7, 7, 7, 7, 7, 8, 7, 7, 2, 7, 7, 7, 7, 7, 7, 7, 7, 8, 7, 7, 7, 7, 7, 7, 7, 2, 7, 7, 7, 1],
      [1, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 2, 7, 7, 8, 7, 7, 7, 7, 7, 6, 7, 7, 7, 2, 7, 8, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 1],
      [1, 7, 2, 7, 7, 7, 7, 7, 2, 8, 7, 7, 2, 7, 7, 8, 7, 7, 2, 2, 7, 8, 7, 7, 7, 2, 7, 8, 7, 7, 7, 2, 7, 8, 7, 7, 7, 2, 7, 1],
      [1, 7, 7, 7, 7, 2, 7, 7, 7, 8, 7, 7, 2, 7, 2, 8, 2, 7, 7, 7, 7, 8, 7, 2, 7, 7, 7, 8, 7, 7, 7, 7, 7, 8, 7, 7, 7, 7, 7, 1],
      [1, 7, 7, 7, 7, 7, 7, 7, 7, 8, 7, 7, 7, 7, 7, 8, 2, 2, 6, 7, 7, 8, 7, 7, 7, 7, 2, 8, 2, 7, 7, 7, 7, 8, 7, 2, 2, 7, 7, 1],
      [1, 7, 2, 7, 7, 7, 7, 7, 7, 8, 2, 2, 7, 7, 7, 8, 7, 7, 7, 2, 7, 8, 7, 7, 7, 7, 7, 8, 6, 7, 7, 7, 7, 8, 7, 7, 7, 7, 2, 1],
      [1, 7, 7, 7, 7, 7, 7, 2, 7, 8, 6, 7, 7, 7, 7, 8, 7, 7, 7, 7, 7, 8, 2, 7, 7, 7, 7, 8, 7, 2, 7, 7, 2, 8, 2, 7, 7, 7, 7, 1],
      [1, 7, 7, 7, 2, 7, 7, 2, 7, 8, 2, 7, 7, 7, 7, 8, 7, 2, 7, 7, 7, 8, 7, 7, 2, 2, 7, 8, 7, 7, 7, 7, 7, 8, 7, 7, 2, 7, 7, 1],
      [1, 7, 2, 7, 7, 7, 7, 7, 7, 8, 7, 7, 2, 2, 7, 8, 2, 7, 2, 7, 7, 8, 7, 7, 7, 7, 7, 8, 7, 7, 7, 2, 7, 8, 7, 2, 7, 7, 7, 1],
      [1, 7, 2, 7, 2, 7, 7, 7, 7, 8, 7, 7, 2, 2, 7, 8, 2, 6, 2, 2, 7, 8, 7, 7, 7, 7, 7, 8, 7, 7, 7, 7, 7, 8, 7, 7, 7, 7, 7, 1],
      [1, 7, 7, 7, 6, 2, 2, 7, 7, 8, 7, 2, 2, 7, 7, 8, 7, 7, 7, 2, 7, 8, 7, 7, 7, 2, 7, 8, 7, 2, 7, 7, 7, 8, 7, 7, 7, 7, 7, 1],
      [1, 7, 7, 7, 7, 7, 2, 7, 7, 8, 7, 2, 7, 7, 7, 8, 7, 7, 7, 7, 7, 8, 7, 2, 7, 2, 6, 8, 7, 2, 7, 2, 7, 8, 7, 7, 7, 2, 7, 1],
      [1, 7, 7, 2, 7, 2, 7, 7, 2, 8, 7, 2, 7, 7, 7, 8, 7, 7, 7, 7, 7, 8, 7, 2, 7, 7, 2, 8, 7, 2, 6, 2, 7, 8, 7, 7, 7, 7, 7, 1],
      [1, 7, 7, 7, 7, 7, 7, 7, 7, 8, 7, 2, 2, 7, 7, 8, 2, 7, 7, 2, 7, 8, 7, 2, 7, 7, 2, 8, 7, 7, 7, 7, 7, 8, 2, 2, 7, 7, 7, 1],
      [1, 7, 2, 7, 7, 7, 7, 7, 7, 8, 7, 7, 7, 2, 7, 7, 7, 7, 7, 7, 7, 8, 7, 2, 7, 7, 7, 2, 7, 7, 7, 7, 7, 8, 6, 2, 7, 7, 7, 1],
      [1, 7, 2, 7, 2, 7, 2, 7, 7, 8, 7, 7, 7, 2, 7, 7, 7, 2, 7, 7, 7, 8, 7, 2, 7, 7, 7, 2, 7, 7, 7, 7, 7, 8, 7, 2, 7, 7, 7, 1],
      [1, 7, 2, 2, 6, 7, 7, 7, 7, 8, 7, 7, 7, 7, 7, 7, 7, 2, 7, 7, 7, 8, 7, 7, 7, 2, 7, 7, 7, 7, 7, 7, 7, 8, 7, 2, 7, 7, 7, 1],
      [1, 5, 7, 7, 7, 7, 7, 2, 7, 8, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 8, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 8, 7, 7, 7, 7, 4, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ],
  },
  {
    id: 3,
    diamondsToGet: 0xb,
    diamondValue: 0xf,
    time: 0x96,
    levelMap: [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 4, 7, 7, 7, 7, 2, 7, 2, 7, 7, 8, 7, 7, 7, 7, 8, 7, 7, 7, 7, 7, 7, 7, 8, 8, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 2, 6, 7, 1],
      [1, 7, 7, 7, 7, 8, 7, 7, 2, 2, 7, 7, 7, 7, 7, 7, 2, 7, 7, 7, 7, 7, 7, 7, 7, 7, 8, 0, 7, 7, 7, 7, 7, 8, 7, 7, 8, 8, 8, 1],
      [1, 7, 7, 8, 7, 7, 7, 0, 8, 8, 7, 7, 2, 7, 7, 7, 7, 7, 8, 7, 7, 8, 7, 7, 7, 7, 7, 7, 7, 8, 8, 7, 7, 0, 0, 7, 7, 7, 7, 1],
      [1, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 8, 7, 7, 7, 7, 8, 7, 7, 7, 7, 8, 7, 7, 2, 8, 7, 7, 7, 7, 7, 7, 7, 8, 7, 7, 7, 7, 1],
      [1, 7, 7, 7, 7, 7, 8, 7, 7, 7, 7, 7, 8, 0, 7, 7, 8, 7, 7, 2, 7, 7, 7, 8, 7, 7, 7, 7, 7, 2, 2, 7, 7, 7, 7, 7, 7, 7, 8, 1],
      [1, 7, 2, 2, 7, 7, 7, 8, 7, 7, 6, 7, 7, 7, 7, 8, 7, 7, 7, 8, 7, 2, 7, 7, 8, 2, 7, 7, 8, 8, 2, 7, 7, 7, 7, 7, 7, 7, 7, 1],
      [1, 7, 8, 8, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 8, 7, 7, 7, 7, 7, 7, 8, 7, 0, 7, 8, 7, 7, 0, 8, 8, 7, 2, 7, 7, 8, 7, 7, 7, 1],
      [1, 7, 2, 7, 7, 7, 7, 7, 7, 7, 8, 7, 7, 8, 7, 7, 0, 2, 7, 7, 7, 7, 7, 7, 7, 7, 8, 7, 7, 7, 7, 7, 2, 2, 2, 7, 7, 7, 7, 1],
      [1, 7, 6, 7, 7, 8, 0, 7, 7, 7, 7, 7, 8, 7, 7, 7, 6, 8, 7, 7, 7, 7, 7, 7, 7, 7, 7, 8, 7, 7, 7, 7, 8, 7, 7, 7, 8, 0, 7, 1],
      [1, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 8, 6, 8, 7, 7, 7, 8, 8, 7, 7, 7, 7, 7, 7, 7, 8, 6, 8, 7, 7, 7, 6, 7, 7, 7, 7, 0, 7, 1],
      [1, 7, 7, 0, 7, 7, 7, 7, 2, 2, 8, 7, 7, 7, 8, 7, 7, 7, 7, 7, 2, 8, 7, 7, 7, 8, 2, 7, 7, 8, 7, 7, 7, 7, 7, 7, 7, 7, 7, 1],
      [1, 7, 7, 8, 7, 7, 7, 2, 2, 8, 7, 7, 7, 7, 7, 8, 2, 7, 7, 7, 8, 7, 2, 2, 8, 7, 2, 2, 7, 2, 8, 2, 7, 7, 8, 7, 7, 7, 2, 1],
      [1, 7, 7, 7, 7, 7, 7, 2, 8, 7, 7, 2, 7, 7, 7, 7, 8, 2, 7, 7, 7, 2, 2, 8, 7, 7, 7, 2, 2, 7, 7, 8, 7, 7, 7, 7, 7, 7, 8, 1],
      [1, 7, 7, 7, 7, 7, 2, 8, 7, 7, 7, 8, 7, 2, 7, 7, 7, 8, 2, 7, 7, 2, 8, 7, 7, 7, 0, 8, 7, 7, 7, 7, 8, 7, 7, 7, 2, 0, 7, 1],
      [1, 8, 2, 7, 7, 7, 8, 7, 7, 2, 0, 7, 7, 2, 7, 7, 0, 7, 8, 7, 7, 8, 7, 7, 8, 7, 7, 7, 7, 7, 7, 7, 7, 8, 7, 7, 7, 8, 7, 1],
      [1, 6, 2, 7, 7, 8, 7, 7, 2, 7, 7, 7, 6, 7, 7, 8, 7, 7, 7, 7, 7, 7, 7, 2, 7, 7, 7, 7, 7, 7, 7, 7, 7, 0, 8, 7, 7, 7, 7, 1],
      [1, 7, 7, 7, 8, 7, 7, 7, 8, 7, 7, 7, 7, 7, 7, 7, 7, 2, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 8, 8, 7, 7, 2, 8, 7, 7, 7, 1],
      [1, 7, 7, 8, 7, 0, 7, 7, 7, 7, 7, 8, 8, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 8, 7, 7, 7, 7, 7, 7, 7, 7, 2, 8, 7, 7, 1],
      [1, 7, 8, 7, 7, 7, 7, 7, 7, 7, 2, 7, 7, 7, 7, 7, 7, 7, 8, 7, 7, 7, 8, 7, 7, 7, 8, 8, 7, 7, 7, 7, 7, 7, 7, 7, 2, 8, 5, 1],
      [1, 8, 6, 7, 7, 7, 7, 8, 7, 7, 7, 7, 7, 7, 8, 7, 7, 7, 0, 7, 2, 7, 8, 7, 7, 7, 7, 0, 7, 7, 7, 7, 8, 7, 7, 7, 7, 6, 8, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ],
  },
  {
    id: 4,
    diamondsToGet: 0x4,
    diamondValue: 0x1e,
    time: 0x96,
    levelMap: [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 4, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 1],
      [1, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 1],
      [1, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 1],
      [1, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 1],
      [1, 7, 7, 7, 0, 0, 3, 0, 0, 7, 7, 7, 7, 0, 0, 3, 0, 0, 7, 7, 7, 7, 0, 0, 3, 0, 0, 7, 7, 7, 7, 0, 0, 3, 0, 0, 7, 7, 7, 1],
      [1, 7, 7, 7, 0, 7, 7, 7, 0, 7, 7, 7, 7, 0, 7, 7, 7, 0, 7, 7, 7, 7, 0, 7, 7, 7, 0, 7, 7, 7, 7, 0, 7, 7, 7, 0, 7, 7, 7, 1],
      [1, 7, 7, 7, 0, 7, 6, 7, 0, 7, 7, 7, 7, 0, 7, 6, 7, 0, 7, 7, 7, 7, 0, 7, 6, 7, 0, 7, 7, 7, 7, 0, 7, 6, 7, 0, 7, 7, 7, 1],
      [1, 7, 7, 7, 0, 7, 7, 7, 0, 7, 7, 7, 7, 0, 7, 7, 7, 0, 7, 7, 7, 7, 0, 7, 7, 7, 0, 7, 7, 7, 7, 0, 7, 7, 7, 0, 7, 7, 7, 1],
      [1, 7, 7, 7, 0, 0, 0, 0, 0, 7, 7, 7, 7, 0, 0, 0, 0, 0, 7, 7, 7, 7, 0, 0, 0, 0, 0, 7, 7, 7, 7, 0, 0, 0, 0, 0, 7, 7, 7, 1],
      [1, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 1],
      [1, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 1],
      [1, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 1],
      [1, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 1],
      [1, 7, 7, 7, 0, 0, 0, 0, 0, 7, 7, 7, 7, 0, 0, 0, 0, 0, 7, 7, 7, 7, 0, 0, 0, 0, 0, 7, 7, 7, 7, 0, 0, 0, 0, 0, 7, 7, 7, 1],
      [1, 7, 7, 7, 0, 7, 7, 7, 0, 7, 7, 7, 7, 0, 7, 7, 7, 0, 7, 7, 7, 7, 0, 7, 7, 7, 0, 7, 7, 7, 7, 0, 7, 7, 7, 0, 7, 7, 7, 1],
      [1, 7, 7, 7, 0, 7, 6, 7, 0, 7, 7, 7, 7, 0, 7, 6, 7, 0, 7, 7, 7, 7, 0, 7, 6, 7, 0, 7, 7, 7, 7, 0, 7, 6, 7, 0, 7, 7, 7, 1],
      [1, 7, 7, 7, 0, 7, 7, 7, 0, 7, 7, 7, 7, 0, 7, 7, 7, 0, 7, 7, 7, 7, 0, 7, 7, 7, 0, 7, 7, 7, 7, 0, 7, 7, 7, 0, 7, 7, 7, 1],
      [1, 7, 7, 7, 0, 0, 3, 0, 0, 7, 7, 7, 7, 0, 0, 3, 0, 0, 7, 7, 7, 7, 0, 0, 3, 0, 0, 7, 7, 7, 7, 0, 0, 3, 0, 0, 7, 7, 7, 1],
      [1, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 1],
      [1, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 5, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ],
  },
  {
    id: 5,
    diamondsToGet: 0x14,
    diamondValue: 0xa,
    time: 0x96,
    levelMap: [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 4, 5, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 1],
      [1, 7, 7, 7, 7, 2, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 2, 7, 7, 7, 7, 7, 7, 7, 7, 7, 1],
      [1, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 2, 7, 7, 1],
      [1, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 2, 7, 7, 7, 2, 7, 7, 7, 7, 7, 7, 7, 7, 2, 2, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 1],
      [1, 7, 7, 7, 7, 7, 7, 2, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 2, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 1],
      [1, 7, 7, 2, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 1],
      [1, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 1],
      [1, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 2, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 1],
      [1, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 2, 7, 7, 7, 7, 7, 7, 7, 1],
      [1, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 2, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 2, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 1],
      [1, 7, 7, 7, 7, 7, 7, 2, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 2, 7, 7, 1],
      [1, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 2, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 2, 7, 7, 1],
      [1, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 2, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 2, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 1],
      [1, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 1],
      [1, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 1],
      [1, 1, 1, 1, 7, 7, 1, 1, 1, 1, 1, 1, 1, 1, 7, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 7, 1, 1, 1, 1, 1, 1, 1, 1, 7, 7, 1, 1, 1, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 10, 0, 0, 0, 0, 0, 0, 0, 1, 10, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 10, 0, 0, 0, 0, 0, 0, 0, 0, 1, 10, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ],
  },
  {
    id: 6,
    diamondsToGet: 0xa,
    diamondValue: 0x1e,
    time: 0x96,
    levelMap: [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 7, 7, 7, 7, 2, 7, 7, 7, 6, 8, 7, 7, 7, 7, 7, 7, 7, 7, 7, 8, 4, 7, 7, 7, 7, 7, 7, 7, 2, 8, 2, 7, 7, 7, 7, 7, 7, 6, 1],
      [1, 7, 2, 7, 7, 7, 7, 7, 7, 2, 2, 2, 7, 7, 2, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 1],
      [1, 7, 7, 7, 7, 7, 2, 2, 7, 7, 8, 2, 7, 7, 7, 7, 7, 2, 7, 7, 8, 7, 7, 7, 7, 7, 7, 7, 7, 7, 8, 7, 7, 7, 7, 7, 2, 7, 7, 1],
      [1, 7, 7, 7, 7, 2, 7, 7, 7, 7, 8, 2, 2, 7, 7, 7, 7, 7, 7, 7, 8, 7, 7, 7, 7, 2, 2, 2, 7, 7, 8, 7, 7, 7, 2, 7, 7, 7, 7, 1],
      [1, 8, 8, 8, 8, 7, 8, 8, 8, 8, 8, 8, 8, 8, 8, 7, 8, 8, 8, 8, 8, 8, 8, 8, 8, 7, 8, 8, 8, 8, 8, 8, 8, 8, 8, 7, 8, 8, 8, 1],
      [1, 7, 7, 7, 7, 7, 7, 7, 7, 7, 8, 2, 7, 7, 7, 7, 7, 7, 7, 7, 8, 7, 7, 7, 7, 7, 7, 7, 7, 7, 8, 7, 7, 7, 7, 7, 7, 7, 7, 1],
      [1, 7, 7, 2, 7, 2, 2, 7, 7, 7, 7, 7, 7, 2, 7, 7, 7, 7, 7, 7, 7, 7, 2, 2, 7, 7, 7, 2, 7, 7, 7, 7, 2, 7, 7, 7, 2, 7, 7, 1],
      [1, 7, 7, 7, 7, 2, 7, 2, 7, 7, 8, 2, 7, 7, 7, 7, 7, 2, 7, 7, 8, 7, 7, 6, 2, 7, 7, 2, 7, 7, 8, 7, 2, 7, 7, 7, 7, 7, 7, 1],
      [1, 7, 7, 6, 2, 2, 7, 7, 7, 7, 8, 2, 2, 7, 7, 7, 7, 7, 7, 7, 8, 7, 7, 7, 7, 7, 7, 7, 7, 7, 8, 6, 7, 7, 7, 7, 7, 7, 7, 1],
      [1, 8, 8, 8, 8, 7, 8, 8, 8, 8, 8, 8, 8, 8, 8, 2, 8, 8, 8, 8, 8, 8, 8, 8, 8, 7, 8, 8, 8, 8, 8, 8, 8, 8, 8, 7, 8, 8, 8, 1],
      [1, 7, 7, 7, 7, 7, 7, 7, 7, 7, 8, 7, 7, 7, 7, 7, 7, 7, 7, 7, 8, 7, 7, 7, 7, 7, 7, 7, 7, 7, 8, 7, 7, 7, 7, 7, 7, 7, 7, 1],
      [1, 7, 2, 7, 7, 7, 7, 2, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 2, 7, 7, 7, 7, 2, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 1],
      [1, 7, 7, 7, 7, 7, 2, 6, 2, 7, 8, 7, 2, 7, 7, 2, 7, 7, 7, 7, 8, 7, 7, 2, 7, 7, 7, 7, 7, 7, 8, 7, 7, 7, 2, 2, 7, 7, 2, 1],
      [1, 7, 7, 7, 7, 7, 7, 7, 7, 7, 8, 7, 7, 7, 7, 7, 7, 7, 7, 7, 8, 7, 7, 7, 7, 7, 7, 7, 7, 7, 8, 7, 7, 7, 7, 7, 7, 7, 7, 1],
      [1, 8, 8, 8, 8, 7, 8, 8, 8, 8, 8, 8, 8, 8, 8, 7, 8, 8, 8, 8, 8, 8, 8, 8, 8, 7, 8, 8, 8, 8, 8, 8, 8, 8, 8, 6, 8, 8, 8, 1],
      [1, 7, 7, 7, 7, 7, 7, 2, 7, 7, 8, 7, 7, 7, 7, 7, 7, 7, 7, 7, 8, 7, 7, 7, 7, 7, 7, 7, 7, 7, 8, 7, 7, 7, 7, 2, 7, 7, 7, 1],
      [1, 2, 7, 7, 7, 7, 7, 7, 7, 7, 8, 7, 7, 2, 2, 7, 7, 7, 7, 2, 8, 7, 2, 2, 7, 7, 7, 7, 7, 7, 8, 7, 7, 7, 2, 2, 7, 7, 7, 1],
      [1, 7, 7, 2, 7, 7, 7, 7, 2, 7, 7, 7, 2, 6, 7, 2, 2, 7, 7, 7, 7, 7, 2, 7, 7, 2, 7, 7, 7, 7, 7, 7, 2, 2, 6, 7, 7, 2, 7, 1],
      [1, 7, 7, 7, 7, 2, 7, 7, 7, 7, 8, 7, 2, 7, 7, 7, 7, 7, 2, 7, 8, 7, 7, 7, 7, 7, 7, 2, 7, 2, 8, 7, 7, 7, 7, 2, 2, 2, 7, 1],
      [1, 5, 7, 7, 7, 7, 7, 7, 7, 7, 8, 7, 7, 7, 7, 7, 7, 7, 7, 7, 8, 7, 7, 7, 7, 7, 7, 2, 7, 6, 8, 7, 7, 7, 7, 7, 7, 7, 7, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ],
  },
];
