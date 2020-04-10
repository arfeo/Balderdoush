import { MapItems, TOTAL_MAP_WIDTH, TOTAL_MAP_HEIGHT } from '../../../constants/game';

import { renderEmpty } from './empty';
import { renderWall } from './wall';
import { renderBoulder } from './boulder';
import { renderSquare } from './square';
import { renderAvatar } from './avatar';
import { renderExit } from './exit';
import { renderDiamond } from './diamond';
import { renderSoil } from './soil';
import { renderBrickWall } from './brickWall';
import { renderButterfly } from './butterfly';
import { renderGreenLava } from './greenLava';

function renderStartScreen(): void {
  const startScreenContainer: HTMLElement = document.createElement('div');
  const startScreenStat: HTMLElement = document.createElement('div');
  const startScreenContinue: HTMLElement = document.createElement('div');

  startScreenContainer.className = 'start-screen-container';
  startScreenStat.className = '-stat';
  startScreenContinue.className = '-continue';

  startScreenStat.innerText = (
    `LEVEL ${this.levelId.toString().padStart(2, '0')}
    LIVES ${this.lives} 
    SCORE ${this.score.toString().padStart(6, '0')}`
  );

  startScreenContinue.innerText = 'PRESS SPACE TO CONTINUE';

  this.appRoot.innerHTML = '';

  this.appRoot.appendChild(startScreenContainer);
  startScreenContainer.appendChild(startScreenStat);
  startScreenContainer.appendChild(startScreenContinue);
}

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

  this.mapCanvas.width = this.cellSize * TOTAL_MAP_WIDTH;
  this.mapCanvas.height = this.cellSize * TOTAL_MAP_HEIGHT;

  this.appRoot.innerHTML = '';

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
  for (let y = 0; y < TOTAL_MAP_HEIGHT; y += 1) {
    for (let x = 0; x < TOTAL_MAP_WIDTH; x += 1) {
      renderMapItem.call(this, x, y);
    }
  }
}

function renderMapItem(x: number, y: number): void {
  if (this.levelMap[y] === undefined) {
    return;
  }

  switch (this.levelMap[y][x]) {
    case MapItems.EmptySpace:
      renderEmpty.call(this, x, y);
      break;
    case MapItems.Wall:
      renderWall.call(this, x, y);
      break;
    case MapItems.Boulder:
      renderBoulder.call(this, x, y);
      break;
    case MapItems.Square:
      renderSquare.call(this, x, y, 1);
      break;
    case MapItems.Avatar:
      renderAvatar.call(this, x, y);
      break;
    case MapItems.Exit:
      this.diamondsToGet > 0 && renderExit.call(this, x, y);
      break;
    case MapItems.Diamond:
      renderDiamond.call(this, x, y);
      break;
    case MapItems.Soil:
      renderSoil.call(this, x, y);
      break;
    case MapItems.BrickWall:
    case MapItems.BrickWallSpecial:
      renderBrickWall.call(this, x, y, 1);
      break;
    case MapItems.Butterfly:
      renderButterfly.call(this, x, y, 1);
      break;
    case MapItems.GreenLava:
      renderGreenLava.call(this, x, y, 1);
      break;
    default: break;
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

function getNoiseParams(cellSize: number): NoiseParam[] {
  const result: NoiseParam[] = [];
  const hmTimes = Math.round(cellSize * 1.3);

  for (let i = 0; i <= hmTimes; i += 1) {
    result.push({
      randomX: Math.floor((Math.random() * cellSize) + 1),
      randomY: Math.floor((Math.random() * cellSize) + 1),
      randomSize: Math.floor((Math.random() * 1.5 * cellSize / 75) + 1),
      randomOpacityOne: Math.floor((Math.random() * 7) + 1),
      randomOpacityTwo: Math.floor((Math.random() * 7) + 1),
    });
  }

  return result;
}

function rerenderCellWithNeighbors(x: number, y: number): void {
  renderMapItem.call(this, x, y);
  renderMapItem.call(this, x + 1, y);
  renderMapItem.call(this, x + 1, y + 1);
  renderMapItem.call(this, x, y + 1);
  renderMapItem.call(this, x - 1, y + 1);
  renderMapItem.call(this, x - 1, y);
  renderMapItem.call(this, x - 1, y - 1);
  renderMapItem.call(this, x, y - 1);
  renderMapItem.call(this, x + 1, y - 1);
}

export {
  renderStartScreen,
  renderGameBoard,
  renderPanel,
  renderMap,
  renderMapItem,
  clearCells,
  getNoiseParams,
  rerenderCellWithNeighbors,
};
