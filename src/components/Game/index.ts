import { renderGameBoard, resetRenderPanel } from './render';

class Game {
  level: number;
  diamonds: number;
  score: number;

  appRoot: HTMLElement;
  gameBoardContainer: HTMLElement;
  gameBoardCanvas: HTMLCanvasElement;
  panelDiamonds: HTMLElement;
  panelTime: HTMLElement;
  panelScore: HTMLElement;

  constructor(level = 1, score = 0) {
    this.level = level;
    this.diamonds = 0;
    this.score = score;

    this.appRoot = document.getElementById('root');
    this.panelDiamonds = document.createElement('div');
    this.panelTime = document.createElement('div');
    this.panelScore = document.createElement('div');

    this.render();
  }

  render(): void {
    renderGameBoard.call(this);
    resetRenderPanel.call(this);
  }
}

export { Game };
