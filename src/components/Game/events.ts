import { Game } from './index';
import { Menu } from '../Menu';

import { INITIAL_KEY_STATES, MapItems } from '../../constants/game';

import { renderPanel } from './render';
import { getMapItemsByType } from '../../utils/game';
import { renderComponent } from '../core';

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

        renderComponent(Menu, document.getElementById('root'));
      }
      break;
    case ' ':
      if (!this.state.isGameStarted) {
        this.setState({ isGameStarted: true });
      } else {
        if (this.isGameOver) {
          this.destroy();

          if (this.lives > 0) {
            renderComponent(Game.bind(null, this.levelId, this.score, this.lives), document.getElementById('root'));
          } else {
            renderComponent(Menu, document.getElementById('root'));
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
