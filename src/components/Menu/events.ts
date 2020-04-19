import { Game } from '../Game';

import { LEVELS } from '../../constants/levels';

import { renderLevelId } from './render';
import { saveStorageData } from '../../utils/storage';
import { renderComponent } from '../core';

function onStartGame(): void {
  saveStorageData('levelId', this.levelId);

  this.destroy();

  renderComponent(Game.bind(null, this.levelId), document.getElementById('root'));
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
