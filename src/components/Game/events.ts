import { Game } from './index';
import { Alert } from '../common/Alert';

import { APP, MapItems } from '../../constants/game';

import { makeMove } from './actions';
import { renderPanel } from './render';
import { getMapItemsByType } from '../../utils/game';

function onKeyDown(e: KeyboardEvent): void {
  const items: number[][] = getMapItemsByType(this.levelMap, MapItems.Avatar);

  if (!e) {
    return;
  }

  const gameKeysActive: boolean = items.length && this.isGameStarted;
  const [avatarY, avatarX] = items.length ? items[0] : [];

  switch (e.key) {
    case 'ArrowLeft':
      gameKeysActive && makeMove.call(this, avatarX, avatarY, avatarX - 1, avatarY);
      break;
    case 'ArrowRight':
      gameKeysActive && makeMove.call(this, avatarX, avatarY, avatarX + 1, avatarY);
      break;
    case 'ArrowUp':
      gameKeysActive && makeMove.call(this, avatarX, avatarY, avatarX, avatarY - 1);
      break;
    case 'ArrowDown':
      gameKeysActive && makeMove.call(this, avatarX, avatarY, avatarX, avatarY + 1);
      break;
    case 'p':
    case 'P':
      if (gameKeysActive) {
        this.isPaused = !this.isPaused;

        renderPanel.call(this);
      }
      break;
    case ' ':
      if (!this.isGameStarted) {
        this.isGameStarted = true;

        this.renderGame();
      } else {
        if (this.isGameOver) {
          this.destroy();

          if (this.lives > 0) {
            APP.pageInstance = new Game(this.levelId, this.score, this.lives);
          } else {
            // TODO: modal dialog
            new Alert(this, 'Game over.');
          }
        }
      }
      break;
    default: break;
  }
}

function onKeyUp(): void {
  if (!this.isPaused) {
    this.avatarState = 'idle';
  }
}

export {
  onKeyDown,
  onKeyUp,
};
