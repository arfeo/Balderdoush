import { MAP_HEIGHT, MAP_WIDTH, MapItems } from '../../../constants/game';

import { renderWall } from './wall';

function renderGameBoard(): void {
  const gameBoardContainer: HTMLElement = document.createElement('div');
  const gameBoardPanel: HTMLElement = document.createElement('div');
  const gameBoardMap: HTMLElement = document.createElement('div');
  const panelDiamondsContainer: HTMLElement = document.createElement('div');
  const panelTimeContainer: HTMLElement = document.createElement('div');
  const panelScoreContainer: HTMLElement = document.createElement('div');

  gameBoardContainer.className = 'game-board';
  gameBoardPanel.className = '-panel';
  panelDiamondsContainer.className = '-diamonds';
  panelTimeContainer.className = '-time';
  panelScoreContainer.className = '-score';
  this.panelDiamonds.className = '-label';
  this.panelTime.className = '-label';
  this.panelScore.className = '-label';
  gameBoardMap.className = '-map';
  this.mapCanvas.className = '-map-canvas';

  this.mapCanvas.width = this.cellSize * MAP_WIDTH;
  this.mapCanvas.height = this.cellSize * MAP_HEIGHT;

  this.appRoot.appendChild(gameBoardContainer);
  gameBoardContainer.appendChild(gameBoardPanel);
  gameBoardContainer.appendChild(gameBoardMap);
  gameBoardPanel.appendChild(panelDiamondsContainer);
  gameBoardPanel.appendChild(panelTimeContainer);
  gameBoardPanel.appendChild(panelScoreContainer);
  panelDiamondsContainer.appendChild(this.panelDiamonds);
  panelDiamondsContainer.appendChild(this.panelDiamondValue);
  panelTimeContainer.appendChild(this.panelTime);
  panelScoreContainer.appendChild(this.panelScore);
  gameBoardMap.appendChild(this.mapCanvas);
}

function renderMap(): void {
  for (let y = 0; y < this.levelMap.length; y += 1) {
    for (let x = 0; x < this.levelMap[y].length; x += 1) {
      switch (this.levelMap[y][x]) {
        case MapItems.Wall:
          renderWall.call(this, x, y);
          break;
        default: break;
      }
    }
  }
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
