import { VISIBLE_MAP_HEIGHT, VISIBLE_MAP_WIDTH, MapItems } from '../../../constants/game';

import { renderEmpty } from './empty';
import { renderWall } from './wall';
import { renderBoulder } from './boulder';
import { renderSquare } from './square';
import { renderAvatar } from './avatar';
import { renderExit } from './exit';
import { renderDiamond } from './diamond';
import { renderSoil } from './soil';
import { renderBrickWall } from './brickWall';

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

  this.mapCanvas.width = this.cellSize * VISIBLE_MAP_WIDTH;
  this.mapCanvas.height = this.cellSize * VISIBLE_MAP_HEIGHT;

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
  const [offsetY, offsetX] = this.offset;

  for (let y = offsetY; y < offsetY + 13; y += 1) {
    for (let x = offsetX; x < offsetX + 20; x += 1) {
      switch (this.levelMap[y][x]) {
        case MapItems.EmptySpace:
          renderEmpty.call(this, x - offsetX, y - offsetY);
          break;
        case MapItems.Wall:
          renderWall.call(this, x - offsetX, y - offsetY);
          break;
        case MapItems.Boulder:
          renderBoulder.call(this, x - offsetX, y - offsetY);
          break;
        case MapItems.Square:
          renderSquare.call(this, x - offsetX, y - offsetY, 1);
          break;
        case MapItems.Avatar:
          renderAvatar.call(this, x - offsetX, y - offsetY);
          break;
        case MapItems.Exit:
          this.diamondsToGet > 0 && renderExit.call(this, x - offsetX, y - offsetY);
          break;
        case MapItems.Diamond:
          renderDiamond.call(this, x - offsetX, y - offsetY);
          break;
        case MapItems.Soil:
          renderSoil.call(this, x - offsetX, y - offsetY);
          break;
        case MapItems.BrickWall:
        case MapItems.BrickWallSpecial:
          renderBrickWall.call(this, x - offsetX, y - offsetY);
          break;
        default: break;
      }
    }
  }
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

function clearCells(ctx: CanvasRenderingContext2D, left: number, top: number, xCount = 1, yCount = 1): void {
  ctx.clearRect(
    this.cellSize * left,
    this.cellSize * top,
    this.cellSize * xCount,
    this.cellSize * yCount,
  );
}

export {
  renderGameBoard,
  renderPanel,
  renderMap,
  clearCells,
};
