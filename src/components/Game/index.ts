import { PageComponent } from '../core/Page';

import { CELL_SIZE_VMIN } from '../../constants/game';
import { LEVELS } from '../../constants/levels';

import { renderGameBoard, renderMap, renderPanel } from './render';
import { onKeyDown } from './events';
import { getInitialOffset } from './helpers';
import { getCellSize } from '../../utils/game';
import { handleGravitation, handleExits, handleGameOver } from './actions';

class Game extends PageComponent {
  protected appRoot: HTMLElement;
  protected cellSize: number;
  protected levelId: number;
  protected diamondsToGet: number;
  protected diamondValue: number;
  protected time: number;
  protected score: number;
  protected lives: number;
  protected levelMap: number[][];
  protected panelDiamonds: HTMLElement;
  protected panelDiamondValue: HTMLElement;
  protected panelTime: HTMLElement;
  protected panelScore: HTMLElement;
  protected mapCanvas: HTMLCanvasElement;
  protected offset: number[];
  protected isGameOver: boolean;
  protected isExploding: boolean;
  protected isLevelCompleted: boolean;
  public animations: {
    exits?: number[];
    explosions?: number[];
  };

  constructor(levelId = 1, score = 0, lives = 3) {
    super(levelId, score, lives);
  }

  public init(levelId: number, score: number, lives: number): void {
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
    this.lives = lives;
    this.levelMap = [...level.levelMap];

    this.appRoot = document.getElementById('root');
    this.panelDiamonds = document.createElement('div');
    this.panelDiamondValue = document.createElement('div');
    this.panelTime = document.createElement('div');
    this.panelScore = document.createElement('div');
    this.mapCanvas = document.createElement('canvas');

    this.offset = getInitialOffset.call(this);

    this.isGameOver = false;
    this.isExploding = false;
    this.isLevelCompleted = false;

    this.eventHandlers = [
      {
        target: document,
        type: 'keydown',
        listener: onKeyDown.bind(this),
      },
    ];

    this.animations = {
      exits: [],
      explosions: [],
    };
  }

  public render(): void {
    renderGameBoard.call(this);
    renderPanel.call(this);
    renderMap.call(this);
  }

  public loop(): void {
    handleGameOver.call(this);
    handleGravitation.call(this);
    handleExits.call(this);
  }
}

export { Game };
