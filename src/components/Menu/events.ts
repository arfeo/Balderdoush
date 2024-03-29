import { Game } from '../Game';
import { Help } from './Help';

import { STORAGE_NAME } from '../../constants/game';
import { LEVELS } from '../../constants/levels';

import { renderLevelId } from './render';
import { saveStorageData } from '../../core/utils/storage';

import { Level } from '../Game/types';

function onStartGame(): void {
  saveStorageData(STORAGE_NAME, 'levelId', this.levelId);

  this.destroy();

  new Game(this.levelId);
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

function onHelp(): void {
  new Help(this);
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
  onHelp,
  onKeyDown,
};
