import { Game } from '../Game';

import { APP } from '../../constants/game';
import { LEVELS } from '../../constants/levels';

import { renderLevelId } from './render';
import { saveStorageData } from '../../utils/storage';

function onStartGame(): void {
  saveStorageData('levelId', this.levelId);

  this.destroy();

  APP.pageInstance = new Game(this.levelId);
}

function onLowerLevel(): void {
  if (this.levelId === 1) {
    return;
  }

  this.levelId -= 1;

  renderLevelId.call(this);
}

function onHigherLevel(): void {
  if (this.levelId === Math.max.apply(null, LEVELS.map((level: Level) => level.id))) {
    return;
  }

  this.levelId += 1;

  renderLevelId.call(this);
}

function onKeyDown(e: KeyboardEvent): void {
  if (!e) {
    return;
  }

  switch (e.key) {
    case 'ArrowLeft':
      onLowerLevel.call(this);
      break;
    case 'ArrowRight':
      onHigherLevel.call(this);
      break;
    case ' ':
      onStartGame.call(this);
      break;
    default: break;
  }
}

export {
  onStartGame,
  onLowerLevel,
  onHigherLevel,
  onKeyDown,
};
