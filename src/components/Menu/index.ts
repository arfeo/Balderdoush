import { PageComponent } from '../../core/components';

import { STORAGE_NAME } from '../../constants/game';

import { renderMenu } from './render';
import { onHelp, onHigherLevel, onKeyDown, onLowerLevel, onStartGame } from './events';
import { getStorageData } from '../../core/utils/storage';

class Menu extends PageComponent {
  protected startGameButton: HTMLButtonElement;
  protected lowerLevelButton: HTMLButtonElement;
  protected levelIdContainer: HTMLElement;
  protected higherLevelButton: HTMLButtonElement;
  protected helpButton: HTMLButtonElement;
  protected levelId: number;

  public init(): void {
    this.appRoot = document.getElementById('root');
    this.startGameButton = document.createElement('button');
    this.lowerLevelButton = document.createElement('button');
    this.levelIdContainer = document.createElement('div');
    this.higherLevelButton = document.createElement('button');
    this.helpButton = document.createElement('button');

    this.levelId = getStorageData(STORAGE_NAME, 'levelId') || 1;

    this.eventHandlers = [
      {
        type: 'click',
        target: this.startGameButton,
        listener: onStartGame.bind(this),
      },
      {
        type: 'click',
        target: this.lowerLevelButton,
        listener: onLowerLevel.bind(this),
      },
      {
        type: 'click',
        target: this.higherLevelButton,
        listener: onHigherLevel.bind(this),
      },
      {
        type: 'click',
        target: this.helpButton,
        listener: onHelp.bind(this),
      },
      {
        type: 'keydown',
        target: document,
        listener: onKeyDown.bind(this),
      },
    ];
  }

  public render(): HTMLElement {
    return renderMenu.call(this);
  }
}

export { Menu };
