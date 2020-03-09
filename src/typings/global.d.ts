interface App {
  pageInstance: any;
}

interface HashMap {
  [key: string]: any;
}

interface EventHandler {
  target: HTMLElement | string;
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
