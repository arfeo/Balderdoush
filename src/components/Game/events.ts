import { Game } from './index';
import { Menu } from '../Menu';

import { INITIAL_KEY_STATES, MapItems } from '../../constants/game';

import { renderPanel } from './render';
import { getMapItemsByType } from '../../core/utils/game';

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
          ...(!this.keysPressed.Shift ? INITIAL_KEY_STATES : this.keysPressed),
          [key]: true,
        };
      }
      break;
    case 'Shift':
      if (gameKeysActive && !this.isPaused) {
        this.keysPressed = {
          ...INITIAL_KEY_STATES,
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

        new Menu();
      }
      break;
    case ' ':
      if (!this.state.isGameStarted) {
        this.setState({ isGameStarted: true });
      } else {
        if (this.isGameOver) {
          this.destroy();

          if (this.lives > 0) {
            new Game(this.levelId, this.score, this.lives);
          } else {
            new Menu();
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

  const { key } = e;

  if (['p', 'P', ' '].indexOf(key) === -1) {
    this.avatarState = 'idle';
  }

  if (Object.keys(INITIAL_KEY_STATES).indexOf(key) > -1) {
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
