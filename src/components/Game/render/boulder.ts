import { drawCircle } from '../../../core/utils/drawing';
import { clearCells } from './';

function renderBoulder(x: number, y: number, context?: CanvasRenderingContext2D): void {
  const ctx: CanvasRenderingContext2D = context || this.mapCanvas.getContext('2d');

  clearCells.call(this, ctx, x, y);

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
