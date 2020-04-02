interface App {
  pageInstance: any;
}

interface HashMap {
  [key: string]: any;
}

interface EventHandler {
  target: Document | HTMLElement | string;
  type: string;
  listener: EventListener;
}

interface KeysPressed  {
  ArrowUp: boolean;
  ArrowRight: boolean;
  ArrowDown: boolean;
  ArrowLeft: boolean;
}

interface Level {
  id: number;
  diamondsToGet: number;
  diamondValue: number;
  time: number;
  levelMap: number[][];
}

interface MapItemCoords {
  x: number;
  y: number;
}

interface Monsters {
  [key: string]: MonsterInfo[];
}

interface MonsterInfo {
  position: number[];
  direction: MonsterDirection;
}

interface NoiseParam {
  randomX: number;
  randomY: number;
  randomSize: number;
  randomOpacityOne: number;
  randomOpacityTwo: number;
}

type MonsterDirection = 'up' | 'right' | 'down' | 'left';

type AvatarState = 'idle' | 'walkLeft' | 'walkRight' | 'pushLeft' | 'pushRight' | 'prop';
