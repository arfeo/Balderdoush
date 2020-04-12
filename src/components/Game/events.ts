import { Game } from './index';
import { Menu } from '../Menu';

import { APP, MapItems } from '../../constants/game';

import { renderPanel } from './render';
import { getMapItemsByType } from '../../utils/game';

function onKeyDown(e: KeyboardEvent): void {
  if (!e) {
    return;
  }

  const items: number[][] = getMapItemsByType(this.levelMap, MapItems.Avatar);
  const gameKeysActive: boolean = items.length && this.state.isGameStarted;
  const { key } = e;

  switch (key) {
    case 'ArrowUp':
    case 'ArrowRight':
    case 'ArrowDown':
    case 'ArrowLeft':
      if (gameKeysActive && !this.isPaused) {
        this.keysPressed = {
          ...this.keysPressed,
          [key]: true,
        };
      }
      break;
    case 'p':
    case 'P':
      if (gameKeysActive) {
        this.isPaused = !this.isPaused;

        renderPanel.call(this);
      }
      break;
    case 'Escape':
      if (gameKeysActive) {
        this.destroy();

        APP.pageInstance = new Menu();
      }
      break;
    case ' ':
      if (!this.state.isGameStarted) {
        this.setState({ isGameStarted: true });
      } else {
        if (this.isGameOver) {
          this.destroy();

          if (this.lives > 0) {
            APP.pageInstance = new Game(this.levelId, this.score, this.lives);
          } else {
            APP.pageInstance = new Menu();
          }
        }
      }
      break;
    default: break;
  }
}

function onKeyUp(e: KeyboardEvent): void {
  if (!e) {
    return;
  }

  if (!this.isPaused && ['pushLeft', 'pushRight'].indexOf(this.avatarState) > -1) {
    this.avatarState = 'idle';
  }

  const { key } = e;

  if (['ArrowUp', 'ArrowRight', 'ArrowDown', 'ArrowLeft'].indexOf(key) > -1) {
    this.keysPressed = {
      ...this.keysPressed,
      [key]: false,
    };
  }
}

export {
  onKeyDown,
  onKeyUp,
};
