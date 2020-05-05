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

export { renderPanel };
