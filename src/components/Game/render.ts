import { MAP_HEIGHT, MAP_WIDTH } from '../../constants/game';

function renderGameBoard(): void {
  const gameBoardPanel: HTMLElement = document.createElement('div');
  const gameBoardGrid: HTMLElement = document.createElement('div');
  const panelDiamondsContainer: HTMLElement = document.createElement('div');
  const panelTimeContainer: HTMLElement = document.createElement('div');
  const panelScoreContainer: HTMLElement = document.createElement('div');

  this.gameBoardContainer = document.createElement('div');

  this.gameBoardContainer.className = 'game-board';
  gameBoardPanel.className = '-panel';
  panelDiamondsContainer.className = '-diamonds';
  panelTimeContainer.className = '-time';
  panelScoreContainer.className = '-score';
  this.panelDiamonds.className = '-label';
  this.panelTime.className = '-label';
  this.panelScore.className = '-label';
  gameBoardGrid.className = '-grid';
  this.mapCanvas.className = '-map-canvas';

  this.mapCanvas.width = this.cellSize * MAP_WIDTH;
  this.mapCanvas.height = this.cellSize * MAP_HEIGHT;

  this.appRoot.appendChild(this.gameBoardContainer);
  this.gameBoardContainer.appendChild(gameBoardPanel);
  this.gameBoardContainer.appendChild(gameBoardGrid);
  gameBoardPanel.appendChild(panelDiamondsContainer);
  gameBoardPanel.appendChild(panelTimeContainer);
  gameBoardPanel.appendChild(panelScoreContainer);
  panelDiamondsContainer.appendChild(this.panelDiamonds);
  panelDiamondsContainer.appendChild(this.panelDiamondValue);
  panelTimeContainer.appendChild(this.panelTime);
  panelScoreContainer.appendChild(this.panelScore);
  gameBoardGrid.appendChild(this.mapCanvas);
}

function renderMap(): void {
  // ...
}

function resetRenderPanel(): void {
  this.panelDiamonds.innerText = this.diamondsToGet.toString().padStart(3, '0');
  this.panelDiamondValue.innerText = this.diamondValue.toString().padStart(4, '0');
  this.panelTime.innerText = this.time;
  this.panelScore.innerText = this.score.toString().padStart(6, '0');
}

export {
  renderGameBoard,
  resetRenderPanel,
  renderMap,
};
