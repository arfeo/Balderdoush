import { TOTAL_MAP_HEIGHT, TOTAL_MAP_WIDTH } from '../../../constants/game';

import { renderMap } from './map';

function renderGameBoard(): HTMLElement {
  const gameContainer: HTMLElement = document.createElement('div');
  const gamePanel: HTMLElement = document.createElement('div');
  const gameMap: HTMLElement = document.createElement('div');
  const panelDiamondsContainer: HTMLElement = document.createElement('div');
  const panelTimeContainer: HTMLElement = document.createElement('div');
  const panelScoreContainer: HTMLElement = document.createElement('div');

  gameContainer.className = 'game-container';
  gamePanel.className = '-panel';
  panelDiamondsContainer.className = '-diamonds';
  panelTimeContainer.className = '-time';
  panelScoreContainer.className = '-score';
  this.panelDiamonds.className = '-label';
  this.panelTime.className = '-label';
  this.panelScore.className = '-label';
  gameMap.className = '-map';
  this.mapCanvas.className = '-map-canvas';

  this.mapCanvas.width = this.cellSize * TOTAL_MAP_WIDTH;
  this.mapCanvas.height = this.cellSize * TOTAL_MAP_HEIGHT;

  gameContainer.appendChild(gamePanel);
  gameContainer.appendChild(gameMap);
  gamePanel.appendChild(panelDiamondsContainer);
  gamePanel.appendChild(panelTimeContainer);
  gamePanel.appendChild(panelScoreContainer);
  panelDiamondsContainer.appendChild(this.panelDiamonds);
  panelDiamondsContainer.appendChild(this.panelDiamondValue);
  panelTimeContainer.appendChild(this.panelTime);
  panelScoreContainer.appendChild(this.panelScore);
  gameMap.appendChild(this.mapCanvas);

  renderPanel.call(this);
  renderMap.call(this);

  return gameContainer;
}

function renderPanel(): void {
  this.panelDiamonds.innerText = this.diamondsToGet.toString().padStart(3, '0');
  this.panelDiamondValue.innerText = this.diamondValue.toString().padStart(4, '0');
  this.panelScore.innerText = this.score.toString().padStart(6, '0');

  if (this.isPaused) {
    this.panelTime.classList.add('paused');
    this.panelTime.innerText = '*PAUSED*';
  } else {
    this.panelTime.classList.remove('paused');
    this.panelTime.innerText = this.time.toString().padStart(3, '0');
  }
}

export {
  renderGameBoard,
  renderPanel,
};
