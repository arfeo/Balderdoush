import { PageComponent } from '../core/Page';

import { renderMenu } from './render';
import { onStartGameClick } from './events';

class Menu extends PageComponent {
  protected appRoot: HTMLElement;
  protected startGameButton: HTMLButtonElement;
  protected lowerLevelButton: HTMLButtonElement;
  protected higherLevelButton: HTMLButtonElement;
  protected bestScoresButton: HTMLButtonElement;

  public init(): void {
    this.appRoot = document.getElementById('root');
    this.startGameButton = document.createElement('button');
    this.lowerLevelButton = document.createElement('button');
    this.higherLevelButton = document.createElement('button');
    this.bestScoresButton = document.createElement('button');

    this.eventHandlers = [
      {
        type: 'click',
        target: this.startGameButton,
        listener: onStartGameClick.bind(this),
      },
    ];
  }

  public render(): void {
    renderMenu.call(this);
  }
}

export { Menu };
