function renderExplosion(x: number, y: number, alpha: number): void {
  const ctx: CanvasRenderingContext2D = this.mapCanvas.getContext('2d');
  const hmTimes = Math.round(this.cellSize * 2);

  // clearCells.call(this, ctx, x, y);

  for (let i = 0; i <= hmTimes; i += 1) {
    const randomX = Math.floor((Math.random() * this.cellSize) + 1);
    const randomY = Math.floor((Math.random() * this.cellSize) + 1);
    const randomSize = Math.floor((Math.random() * 1.3 * this.cellSize / 15) + 1);
    const randomOpacityOne = Math.floor((Math.random() * 9) + 1);
    const randomOpacityTwo = Math.floor((Math.random() * 9) + 1);

    ctx.globalAlpha = alpha;
    ctx.fillStyle = `hsla(22, 35%, 78%, .${randomOpacityOne + randomOpacityTwo})`;

    ctx.fillRect(
      randomX + this.cellSize * x,
      randomY + this.cellSize * y,
      randomSize,
      randomSize,
    );

    ctx.globalAlpha = 1;
  }
}

export { renderExplosion };
