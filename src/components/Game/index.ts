import { PageComponent } from '../../core/components';

import { GAME_CELL_SIZE_VMIN, INITIAL_KEY_STATES, TOTAL_MAP_HEIGHT, TOTAL_MAP_WIDTH } from '../../constants/game';
import { LEVELS } from '../../constants/levels';

import { renderMap, renderPanel } from './render';
import { onKeyDown, onKeyUp } from './events';
import { startAnimations } from './animations';
import { getImageAssets, ImageAssets } from './assets';
import { getInitialOffset, getMonsters } from './helpers';
import { getCellSize } from '../../core/utils/game';

import {
  handleGravitation,
  handleExits,
  handleGameOver,
  handleMonsters,
  handleKeysPressed,
  moveMapCanvas,
} from './actions';

import { AvatarState, KeysPressed, Level, Monsters } from './types';

interface State {
  isGameStarted: boolean;
}

class Game extends PageComponent<State> {
  private cellSize: number;
  private levelId: number;
  private diamondsToGet: number;
  private diamondValue: number;
  private time: number;
  private score: number;
  private lives: number;
  private levelMap: number[][];
  private panelDiamonds: HTMLElement;
  private panelDiamondValue: HTMLElement;
  private panelTime: HTMLElement;
  private panelScore: HTMLElement;
  private mapCanvas: HTMLCanvasElement;
  private offset: number[];
  private isGameOver: boolean;
  private isExploding: boolean;
  private isBrickWallSpecialActive: boolean;
  private isBrickWallSpecialUsed: boolean;
  private isLevelCompleted: boolean;
  private isPaused: boolean;
  private avatarState: AvatarState;
  private storedAvatarState: AvatarState;
  private avatarAnimationState: number;
  private monsters: Monsters;
  private fallingItems: number[][];
  private loopThrottle: number;
  private keysPressed: KeysPressed;

  public images: ImageAssets;

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

    this.images = getImageAssets.call(this);

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

  public afterUpdate(): void {
    if (this.state.isGameStarted) {
      renderPanel.call(this);
      renderMap.call(this);
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
      const startScreenContainer: HTMLElement = document.createElement('div');
      const startScreenStat: HTMLElement = document.createElement('div');
      const startScreenContinue: HTMLElement = document.createElement('div');

      startScreenContainer.className = 'start-screen-container';
      startScreenStat.className = '-stat';
      startScreenContinue.className = '-continue';

      startScreenStat.innerText = (
        `LEVEL ${this.levelId.toString().padStart(2, '0')}
        LIVES ${this.lives} 
        SCORE ${this.score.toString().padStart(6, '0')}`
      );

      startScreenContinue.innerText = 'PRESS SPACE TO CONTINUE';

      startScreenContainer.appendChild(startScreenStat);
      startScreenContainer.appendChild(startScreenContinue);

      return startScreenContainer;
    }

    const gameContainer: HTMLElement = document.createElement('div');
    const gamePanel: HTMLElement = document.createElement('div');
    const gameMap: HTMLElement = document.createElement('div');
    const panelDiamondsContainer: HTMLElement = document.createElement('div');
    const panelTimeContainer: HTMLElement = document.createElement('div');
    const panelScoreContainer: HTMLElement = document.createElement('div');

    gameContainer.className = 'game-container';
    gamePanel.className = '-panel';
    panelDiamondsContainer.className = '-diamonds';
    panelTimeContainer.className = '-time';
    panelScoreContainer.className = '-score';
    this.panelDiamonds.className = '-label';
    this.panelTime.className = '-label';
    this.panelScore.className = '-label';
    gameMap.className = '-map';
    this.mapCanvas.className = '-map-canvas';

    this.mapCanvas.width = this.cellSize * TOTAL_MAP_WIDTH;
    this.mapCanvas.height = this.cellSize * TOTAL_MAP_HEIGHT;

    gameContainer.appendChild(gamePanel);
    gameContainer.appendChild(gameMap);
    gamePanel.appendChild(panelDiamondsContainer);
    gamePanel.appendChild(panelTimeContainer);
    gamePanel.appendChild(panelScoreContainer);
    panelDiamondsContainer.appendChild(this.panelDiamonds);
    panelDiamondsContainer.appendChild(this.panelDiamondValue);
    panelTimeContainer.appendChild(this.panelTime);
    panelScoreContainer.appendChild(this.panelScore);
    gameMap.appendChild(this.mapCanvas);

    return gameContainer;
  }
}

export { Game };
