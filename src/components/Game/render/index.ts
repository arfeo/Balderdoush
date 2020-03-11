import { MAP_HEIGHT, MAP_WIDTH, MapItems } from '../../../constants/game';

import { renderWall } from './wall';
import { renderSoil } from './soil';
import { renderBrickWall } from './brickWall';
import { renderBoulder } from './boulder';
import { renderDiamond } from './diamond';
import { renderSkull } from './skull';

function renderGameBoard(): void {
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

  this.mapCanvas.width = this.cellSize * MAP_WIDTH;
  this.mapCanvas.height = this.cellSize * MAP_HEIGHT;

  this.appRoot.appendChild(gameContainer);
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
}

function renderMap(): void {
  for (let y = 0; y < this.levelMap.length; y += 1) {
    for (let x = 0; x < this.levelMap[y].length; x += 1) {
      switch (this.levelMap[y][x]) {
        case MapItems.Wall:
          renderWall.call(this, x, y);
          break;
        case MapItems.Soil:
          renderSoil.call(this, x, y);
          break;
        case MapItems.BrickWall:
          renderBrickWall.call(this, x, y);
          break;
        case MapItems.Boulder:
          renderBoulder.call(this, x, y);
          break;
        case MapItems.Diamond:
          renderDiamond.call(this, x, y);
          break;
        case MapItems.Skull:
          renderSkull.call(this, x, y);
          break;
        default: break;
      }
    }
  }
}

function renderPanel(): void {
  this.panelDiamonds.innerText = this.diamondsToGet.toString().padStart(3, '0');
  this.panelDiamondValue.innerText = this.diamondValue.toString().padStart(4, '0');
  this.panelTime.innerText = this.time;
  this.panelScore.innerText = this.score.toString().padStart(6, '0');
}

export {
  renderGameBoard,
  renderPanel,
  renderMap,
};
