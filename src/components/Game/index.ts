import { PageComponent } from '../core/Page';

import { CELL_SIZE_VMIN } from '../../constants/game';
import { LEVELS } from '../../constants/levels';

import { renderGameBoard, renderMap, resetRenderPanel } from './render';
import { getCellSize } from './helpers';

class Game extends PageComponent {
  protected appRoot: HTMLElement;
  protected cellSize: number;
  protected levelId: number;
  protected diamondsToGet: number;
  protected diamondValue: number;
  protected time: number;
  protected score: number;
  protected mapCanvas: HTMLCanvasElement;
  protected gameBoardContainer: HTMLElement;
  protected gameBoardCanvas: HTMLCanvasElement;
  protected panelDiamonds: HTMLElement;
  protected panelDiamondValue: HTMLElement;
  protected panelTime: HTMLElement;
  protected panelScore: HTMLElement;

  constructor(levelId = 1, score = 0) {
    super(levelId, score);

    const level: Level = LEVELS.find((item: Level) => item.id === levelId);

    if (!level) {
      throw Error('Level with unknown id.');
    }

    this.cellSize = getCellSize(CELL_SIZE_VMIN);

    this.levelId = levelId;
    this.diamondsToGet = level.diamondsToGet;
    this.diamondValue = level.diamondValue;
    this.time = level.time;
    this.score = score;

    this.appRoot = document.getElementById('root');
    this.mapCanvas = document.createElement('canvas');
    this.panelDiamonds = document.createElement('div');
    this.panelDiamondValue = document.createElement('div');
    this.panelTime = document.createElement('div');
    this.panelScore = document.createElement('div');
  }

  public render(): void {
    renderGameBoard.call(this);
    resetRenderPanel.call(this);
    renderMap.call(this);
  }
}

export { Game };
