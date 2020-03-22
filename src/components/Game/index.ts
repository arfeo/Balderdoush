import { PageComponent } from '../core/Page';

import { CELL_SIZE_VMIN } from '../../constants/game';
import { LEVELS } from '../../constants/levels';

import { renderGameBoard, renderMap, renderPanel } from './render';
import { onKeyDown, onKeyUp } from './events';
import { getInitialOffset, getMonsters } from './helpers';
import { getCellSize } from '../../utils/game';
import { handleGravitation, handleExits, handleGameOver, handleMonsters } from './actions';
import { animateMonsters, animateTimer } from './animations';

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
  protected isPaused: boolean;
  protected avatarState: AvatarState;
  protected monsters: Monsters;
  public animations: {
    exits?: number[];
    explosions?: number[];
    timer?: number;
    monsters?: number[];
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
    this.isPaused = false;

    this.avatarState = 'idle';

    this.monsters = getMonsters.call(this);

    this.eventHandlers = [
      {
        target: document,
        type: 'keydown',
        listener: onKeyDown.bind(this),
      },
      {
        target: document,
        type: 'keyup',
        listener: onKeyUp.bind(this),
      },
    ];

    this.loopTimeout = 80;

    this.animations = {
      exits: [],
      explosions: [],
      timer: null,
      monsters: [],
    };
  }

  public render(): void {
    renderGameBoard.call(this);
    renderPanel.call(this);
    renderMap.call(this);

    animateTimer.call(this);
    animateMonsters.call(this);
  }

  public loop(): void {
    handleGameOver.call(this);
    handleGravitation.call(this);
    handleMonsters.call(this);
    handleExits.call(this);
  }
}

export { Game };
