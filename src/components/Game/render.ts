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

  this.appRoot.appendChild(this.gameBoardContainer);
  this.gameBoardContainer.appendChild(gameBoardPanel);
  this.gameBoardContainer.appendChild(gameBoardGrid);
  gameBoardPanel.appendChild(panelDiamondsContainer);
  gameBoardPanel.appendChild(panelTimeContainer);
  gameBoardPanel.appendChild(panelScoreContainer);
  panelDiamondsContainer.appendChild(this.panelDiamonds);
  panelTimeContainer.appendChild(this.panelTime);
  panelScoreContainer.appendChild(this.panelScore);
}

function resetRenderPanel(): void {
  this.panelDiamonds.innerText = this.diamonds;
  this.panelTime.innerText = 0;
  this.panelScore.innerText = this.score;
}

export { renderGameBoard, resetRenderPanel };
