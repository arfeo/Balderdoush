import { PageComponent } from '../core/Page';

import { CELL_SIZE_VMIN } from '../../constants/game';
import { LEVELS } from '../../constants/levels';

import { renderGameBoard, renderMap, renderPanel } from './render';
import { onKeyDown } from './events';
import { getInitialOffset } from './helpers';
import { getCellSize } from '../../utils/game';
import { checkBoulders } from './actions';

class Game extends PageComponent {
  protected appRoot: HTMLElement;
  protected cellSize: number;
  protected levelId: number;
  protected diamondsToGet: number;
  protected diamondValue: number;
  protected time: number;
  protected score: number;
  protected levelMap: number[][];
  protected panelDiamonds: HTMLElement;
  protected panelDiamondValue: HTMLElement;
  protected panelTime: HTMLElement;
  protected panelScore: HTMLElement;
  protected mapCanvas: HTMLCanvasElement;
  protected offset: number[];

  constructor(levelId = 1, score = 0) {
    super(levelId, score);
  }

  public init(levelId: number, score: number): void {
    const level: Level = LEVELS.find((item: Level) => item.id === levelId);

    if (!level) {
      throw 'Incorrect level id.';
    }

    this.cellSize = getCellSize(CELL_SIZE_VMIN);

    this.levelId = levelId;
    this.diamondsToGet = level.diamondsToGet;
    this.diamondValue = level.diamondValue;
    this.time = level.time;
    this.score = score;
    this.levelMap = [...level.levelMap];

    this.appRoot = document.getElementById('root');
    this.panelDiamonds = document.createElement('div');
    this.panelDiamondValue = document.createElement('div');
    this.panelTime = document.createElement('div');
    this.panelScore = document.createElement('div');
    this.mapCanvas = document.createElement('canvas');

    this.offset = getInitialOffset.call(this);

    this.eventHandlers = [
      {
        target: document,
        type: 'keydown',
        listener: onKeyDown.bind(this),
      },
    ];
  }

  public render(): void {
    renderGameBoard.call(this);
    renderPanel.call(this);
    renderMap.call(this);
  }

  public loop(): void {
    checkBoulders.call(this);
  }
}

export { Game };
