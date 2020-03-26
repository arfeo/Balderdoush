function renderMenu(): void {
  const menuContainer: HTMLElement = document.createElement('div');
  const menuControls: HTMLElement = document.createElement('div');

  menuContainer.className = 'menu-container';
  menuControls.className = '-controls';

  menuContainer.innerText = 'Balderdoush';
  this.startGameButton.innerText = 'Start game';
  this.lowerLevelButton.innerText = '<';
  this.higherLevelButton.innerText = '>';
  this.bestScoresButton.innerText = 'Best scores';

  this.appRoot.appendChild(menuContainer);
  menuContainer.appendChild(menuControls);
  menuControls.appendChild(this.startGameButton);
  menuControls.appendChild(this.lowerLevelButton);
  menuControls.appendChild(this.higherLevelButton);
  menuControls.appendChild(this.bestScoresButton);
}

export { renderMenu };
