import { PageComponent } from '../core/Page';

import { GAME_CELL_SIZE_VMIN } from '../../constants/game';
import { LEVELS } from '../../constants/levels';

import { renderGameBoard, renderMap, renderPanel, renderStartScreen } from './render';
import { onKeyDown, onKeyUp } from './events';
import { getInitialOffset, getMonsters } from './helpers';
import { getCellSize } from '../../utils/game';
import { startAnimations } from './animations';

import {
  handleGravitation,
  handleExits,
  handleGameOver,
  handleMonsters,
  handleRerenderMap,
} from './actions';

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
  protected isGameStarted: boolean;
  protected isGameOver: boolean;
  protected isExploding: boolean;
  protected isBrickWallSpecialActive: boolean;
  protected isBrickWallSpecialUsed: boolean;
  protected isLevelCompleted: boolean;
  protected isPaused: boolean;
  protected shouldRerenderMap: boolean;
  protected avatarState: AvatarState;
  protected monsters: Monsters;
  protected fallingItems: number[][];
  public animations: {
    exits?: number[];
    explosions?: number[];
    timer?: number;
    monsters?: number[];
    greenLava?: number;
    brickWallSpecial?: number;
  };

  constructor(levelId = 1, score = 0, lives = 3) {
    super(levelId, score, lives);
  }

  public init(levelId: number, score: number, lives: number): void {
    const level: Level = LEVELS.find((item: Level) => item.id === levelId);

    if (!level) {
      throw 'Incorrect level id.';
    }

    this.cellSize = getCellSize(GAME_CELL_SIZE_VMIN);

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

    this.isGameStarted = false;
    this.isGameOver = false;
    this.isExploding = false;
    this.isBrickWallSpecialActive = false;
    this.isBrickWallSpecialUsed = false;
    this.isLevelCompleted = false;
    this.isPaused = false;
    this.shouldRerenderMap = false;

    this.avatarState = 'idle';
    this.monsters = getMonsters.call(this);
    this.fallingItems = [];

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

    this.loopTimeout = 100;

    this.animations = {
      exits: [],
      explosions: [],
      timer: null,
      monsters: [],
      greenLava: null,
      brickWallSpecial: null,
    };
  }

  private renderGame(): void {
    renderGameBoard.call(this);
    renderPanel.call(this);
    renderMap.call(this);
    startAnimations.call(this);
  }

  public render(): void {
    renderStartScreen.call(this);
  }

  public loop(): void {
    handleGameOver.call(this);
    handleGravitation.call(this);
    handleMonsters.call(this);
    handleExits.call(this);
    handleRerenderMap.call(this);
  }
}

export { Game };
