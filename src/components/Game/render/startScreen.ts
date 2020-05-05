function renderStartScreen(): HTMLElement {
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

  startScreenContainer.appendChild(startScreenStat);
  startScreenContainer.appendChild(startScreenContinue);

  return startScreenContainer;
}

export { renderStartScreen };
