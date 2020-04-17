import { PageComponent } from '../core/Page';

import { GAME_CELL_SIZE_VMIN, INITIAL_KEY_STATES } from '../../constants/game';
import { LEVELS } from '../../constants/levels';

import { renderGameBoard, renderStartScreen } from './render';
import { onKeyDown, onKeyUp } from './events';
import { startAnimations } from './animations';
import { setImages } from './assets';
import { getInitialOffset, getMonsters } from './helpers';
import { getCellSize } from '../../utils/game';

import {
  handleGravitation,
  handleExits,
  handleGameOver,
  handleMonsters,
  handleKeysPressed,
  moveMapCanvas,
} from './actions';

import { ImageProps } from '../../utils/types';

interface State {
  isGameStarted: boolean;
}

class Game extends PageComponent<State> {
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
  protected avatarState: AvatarState;
  protected storedAvatarState: AvatarState;
  protected avatarAnimationState: number;
  protected monsters: Monsters;
  protected fallingItems: number[][];
  protected loopThrottle: number;
  protected keysPressed: KeysPressed;

  public images: {
    avatarIdle: ImageProps;
    avatarProp: ImageProps;
    avatarPushLeft1: ImageProps;
    avatarPushLeft2: ImageProps;
    avatarPushLeft3: ImageProps;
    avatarPushRight1: ImageProps;
    avatarPushRight2: ImageProps;
    avatarPushRight3: ImageProps;
    avatarWalkLeft1: ImageProps;
    avatarWalkLeft2: ImageProps;
    avatarWalkLeft3: ImageProps;
    avatarWalkRight1: ImageProps;
    avatarWalkRight2: ImageProps;
    avatarWalkRight3: ImageProps;
  };

  public animations: {
    avatar?: number;
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

    this.state = {
      isGameStarted: false,
    };

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

    this.appRoot.innerText = 'Loading...';

    this.offset = getInitialOffset.call(this);

    this.isGameOver = false;
    this.isExploding = false;
    this.isBrickWallSpecialActive = false;
    this.isBrickWallSpecialUsed = false;
    this.isLevelCompleted = false;
    this.isPaused = false;

    this.avatarState = this.storedAvatarState = 'idle';
    this.avatarAnimationState = 1;
    this.monsters = getMonsters.call(this);
    this.fallingItems = [];

    this.loopTimeout = 70;
    this.loopThrottle = 0;

    this.images = setImages.call(this);

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
      {
        target: window,
        type: 'resize',
        listener: moveMapCanvas.bind(this),
      },
    ];

    this.keysPressed = { ...INITIAL_KEY_STATES };

    this.animations = {
      avatar: null,
      exits: [],
      explosions: [],
      timer: null,
      monsters: [],
      greenLava: null,
      brickWallSpecial: null,
    };
  }

  public afterRender(): void {
    if (this.state.isGameStarted) {
      moveMapCanvas.call(this);
      startAnimations.call(this);
    }
  }

  public loop(): void {
    this.loopThrottle += 1;

    if (this.loopThrottle === 2) {
      handleMonsters.call(this);

      this.loopThrottle = 0;
    }

    handleGameOver.call(this);
    handleGravitation.call(this);
    handleExits.call(this);
    handleKeysPressed.call(this);
  }

  public render(): HTMLElement {
    if (!this.state.isGameStarted) {
      return renderStartScreen.call(this);
    }

    return renderGameBoard.call(this);
  }
}

export { Game };
