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
}

type AvatarState = 'idle' | 'walkLeft' | 'walkRight' | 'pushLeft' | 'pushRight' | 'prop';
