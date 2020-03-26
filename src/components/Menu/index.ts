import { PageComponent } from '../core/Page';

import { renderLevelId, renderMenu } from './render';
import { onHigherLevel, onKeyDown, onLowerLevel, onStartGame } from './events';

class Menu extends PageComponent {
  protected appRoot: HTMLElement;
  protected startGameButton: HTMLButtonElement;
  protected lowerLevelButton: HTMLButtonElement;
  protected levelIdContainer: HTMLElement;
  protected higherLevelButton: HTMLButtonElement;
  protected levelId: number;

  public init(): void {
    this.appRoot = document.getElementById('root');
    this.startGameButton = document.createElement('button');
    this.lowerLevelButton = document.createElement('button');
    this.levelIdContainer = document.createElement('div');
    this.higherLevelButton = document.createElement('button');

    this.levelId = 1;

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
        type: 'keydown',
        target: document,
        listener: onKeyDown.bind(this),
      },
    ];
  }

  public render(): void {
    renderMenu.call(this);
    renderLevelId.call(this);
  }
}

export { Menu };
