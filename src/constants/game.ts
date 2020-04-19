export const STORAGE_PREFIX = 'balderdoush';

export const GAME_CELL_SIZE_VMIN = 6;

export const VISIBLE_MAP_WIDTH = 20;
export const VISIBLE_MAP_HEIGHT = 13;
export const TOTAL_MAP_WIDTH = 40;
export const TOTAL_MAP_HEIGHT = 22;

export enum MapItems {
  EmptySpace = 0x0,
  Wall,
  Boulder,
  Square,
  Avatar,
  Exit,
  Diamond,
  Soil,
  BrickWall,
  BrickWallSpecial,
  Butterfly,
  GreenLava,
}

export const INITIAL_KEY_STATES = {
  ArrowUp: false,
  ArrowRight: false,
  ArrowDown: false,
  ArrowLeft: false,
};
