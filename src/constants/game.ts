export const APP: App = {
  pageInstance: null,
};

export const CELL_SIZE_VMIN = 6;

export const VISIBLE_MAP_WIDTH = 20;
export const VISIBLE_MAP_HEIGHT = 13;

export enum MapItems {
  EmptySpace = 0x0,
  Wall,
  Boulder,
  Skull,
  Avatar,
  Exit,
  Diamond,
  Soil,
  BrickWall,
}
