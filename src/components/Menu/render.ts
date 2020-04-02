function renderMenu(): void {
  const menuContainer: HTMLElement = document.createElement('div');
  const menuControls: HTMLElement = document.createElement('div');
  const menuControlsCol1: HTMLElement = document.createElement('div');
  const menuControlsCol2: HTMLElement = document.createElement('div');
  const lowerLevelIcon: HTMLElement = document.createElement('span');
  const higherLevelIcon: HTMLElement = document.createElement('span');

  menuContainer.className = 'menu-container';
  menuControls.className = '-controls';
  menuControlsCol1.className = '-col';
  menuControlsCol2.className = '-col';
  this.lowerLevelButton.className = '-lower';
  this.levelIdContainer.className = '-level-id';
  this.higherLevelButton.className = '-higher';
  lowerLevelIcon.innerText = '⮜';
  higherLevelIcon.innerText = '⮞';

  menuContainer.innerText = 'Balderdoush';
  this.startGameButton.innerText = 'Start game';

  this.appRoot.innerHTML = '';

  this.appRoot.appendChild(menuContainer);
  menuContainer.appendChild(menuControls);
  menuControls.appendChild(menuControlsCol1);
  menuControls.appendChild(menuControlsCol2);
  menuControlsCol1.appendChild(this.startGameButton);
  menuControlsCol2.appendChild(this.lowerLevelButton);
  this.lowerLevelButton.appendChild(lowerLevelIcon);
  menuControlsCol2.appendChild(this.levelIdContainer);
  menuControlsCol2.appendChild(this.higherLevelButton);
  this.higherLevelButton.appendChild(higherLevelIcon);
}

function renderLevelId(): void {
  this.levelIdContainer.innerText = this.levelId.toString().padStart(2, '0');
}

export {
  renderMenu,
  renderLevelId,
};
