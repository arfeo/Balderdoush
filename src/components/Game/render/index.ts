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

  this.mapCanvas.width = this.cellSize * VISIBLE_MAP_WIDTH;
  this.mapCanvas.height = this.cellSize * VISIBLE_MAP_HEIGHT;

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
  const [offsetY, offsetX] = this.offset;

  for (let y = offsetY; y < offsetY + 13; y += 1) {
    for (let x = offsetX; x < offsetX + 20; x += 1) {
      renderMapItem.call(this, x, y);
    }
  }
}

function renderMapItem(x: number, y: number): void {
  const [offsetY, offsetX] = this.offset;

  if (this.levelMap[y] === undefined) {
    return;
  }

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
      renderBrickWall.call(this, x - offsetX, y - offsetY, 1);
      break;
    case MapItems.Butterfly:
      renderButterfly.call(this, x - offsetX, y - offsetY, 1);
      break;
    case MapItems.GreenLava:
      renderGreenLava.call(this, x - offsetX, y - offsetY, 1);
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

export {
  renderStartScreen,
  renderGameBoard,
  renderPanel,
  renderMap,
  renderMapItem,
  clearCells,
  getNoiseParams,
};
