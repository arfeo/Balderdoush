export interface KeysPressed  {
  ArrowUp: boolean;
  ArrowRight: boolean;
  ArrowDown: boolean;
  ArrowLeft: boolean;
}

export interface Level {
  id: number;
  diamondsToGet: number;
  diamondValue: number;
  time: number;
  levelMap: number[][];
}

export interface MapItemCoords {
  x: number;
  y: number;
}

export interface Monsters {
  [key: string]: MonsterInfo[];
}

export interface MonsterInfo {
  position: number[];
  direction: MonsterDirection;
}

export interface NoiseParam {
  randomX: number;
  randomY: number;
  randomSize: number;
  randomOpacityOne: number;
  randomOpacityTwo: number;
}

export type MonsterDirection = 'up' | 'right' | 'down' | 'left';

export type AvatarState = 'idle' | 'walkLeft' | 'walkRight' | 'pushLeft' | 'pushRight' | 'prop';
