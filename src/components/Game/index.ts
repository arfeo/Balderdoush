import { PageComponent } from '../core/Page';

import { renderGameBoard, resetRenderPanel } from './render';

class Game extends PageComponent {
  protected appRoot: HTMLElement;
  protected level: number;
  protected diamonds: number;
  protected diamondValue: number;
  protected score: number;
  protected gameBoardContainer: HTMLElement;
  protected gameBoardCanvas: HTMLCanvasElement;
  protected panelDiamonds: HTMLElement;
  protected panelDiamondValue: HTMLElement;
  protected panelTime: HTMLElement;
  protected panelScore: HTMLElement;

  constructor(level = 1, score = 0) {
    super(level, score);

    this.level = level;
    this.diamonds = 0;
    this.diamondValue = 0;
    this.score = score;

    this.appRoot = document.getElementById('root');
    this.panelDiamonds = document.createElement('div');
    this.panelDiamondValue = document.createElement('div');
    this.panelTime = document.createElement('div');
    this.panelScore = document.createElement('div');
  }

  public render(): void {
    renderGameBoard.call(this);
    resetRenderPanel.call(this);
  }
}

export { Game };
