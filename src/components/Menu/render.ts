function renderMenu(): void {
  const menuContainer: HTMLElement = document.createElement('div');
  const menuControls: HTMLElement = document.createElement('div');

  menuContainer.className = 'menu-container';
  menuControls.className = '-controls';

  menuContainer.innerText = 'Balderdoush';
  this.startGameButton.innerText = 'Start game';
  this.lowerLevelButton.innerText = '<';
  this.higherLevelButton.innerText = '>';
  this.bestScoresButton.innerText = 'High scores';

  this.appRoot.appendChild(menuContainer);
  menuContainer.appendChild(menuControls);
  menuControls.appendChild(this.startGameButton);
  menuControls.appendChild(this.lowerLevelButton);
  menuControls.appendChild(this.levelIdContainer);
  menuControls.appendChild(this.higherLevelButton);
  menuControls.appendChild(this.bestScoresButton);
}

function renderLevelId(): void {
  this.levelIdContainer.innerText = this.levelId.toString().padStart(2, '0');
}

export {
  renderMenu,
  renderLevelId,
};
