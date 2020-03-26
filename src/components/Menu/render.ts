function renderMenu(): void {
  const menuContainer: HTMLElement = document.createElement('div');
  const menuControls: HTMLElement = document.createElement('div');
  const menuControlsCol1: HTMLElement = document.createElement('div');
  const menuControlsCol2: HTMLElement = document.createElement('div');

  menuContainer.className = 'menu-container';
  menuControls.className = '-controls';
  menuControlsCol1.className = '-col';
  menuControlsCol2.className = '-col';
  this.lowerLevelButton.className = '-lower';
  this.levelIdContainer.className = '-level-id';
  this.higherLevelButton.className = '-higher';

  menuContainer.innerText = 'Balderdoush';
  this.startGameButton.innerText = 'Start game';
  this.lowerLevelButton.innerHTML = '<span class="arrow arrow-left"></span>';
  this.higherLevelButton.innerHTML = '<span class="arrow arrow-right"></span>';

  this.appRoot.innerHTML = '';

  this.appRoot.appendChild(menuContainer);
  menuContainer.appendChild(menuControls);
  menuControls.appendChild(menuControlsCol1);
  menuControls.appendChild(menuControlsCol2);
  menuControlsCol1.appendChild(this.startGameButton);
  menuControlsCol2.appendChild(this.lowerLevelButton);
  menuControlsCol2.appendChild(this.levelIdContainer);
  menuControlsCol2.appendChild(this.higherLevelButton);
}

function renderLevelId(): void {
  this.levelIdContainer.innerText = this.levelId.toString().padStart(2, '0');
}

export {
  renderMenu,
  renderLevelId,
};
