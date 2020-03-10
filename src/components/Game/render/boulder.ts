import { drawCircle } from '../../../utils/drawing';

function renderBoulder(x: number, y: number): void {
  const ctx: CanvasRenderingContext2D = this.mapCanvas.getContext('2d');

  drawCircle(
    ctx,
    this.cellSize * x + this.cellSize / 2,
    this.cellSize * y + this.cellSize / 2,
    this.cellSize / 2 - this.cellSize / 100,
    {
      fillColor: 'rgb(192, 192, 192)',
    },
  );
}

export { renderBoulder };
