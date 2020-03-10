export const APP: App = {
  pageInstance: null,
};

export const CELL_SIZE_VMIN = 6;

export const MAP_WIDTH = 20;
export const MAP_HEIGHT = 13;

export enum MapItems {
  EmptySpace = 0,
  Soil,
  Wall,
  Rockford,
  BrickWall,
  Boulder,
  Diamond,
}
