import { drawTriangle } from '../../../utils/drawing';
import { clearCells } from './';

function renderDiamond(x: number, y: number): void {
  const ctx: CanvasRenderingContext2D = this.mapCanvas.getContext('2d');

  clearCells.call(this, ctx, x, y);

  drawTriangle(
    ctx,
    [this.cellSize * x, this.cellSize * y + this.cellSize / 2],
    [this.cellSize * x + this.cellSize / 2, this.cellSize * y],
    [this.cellSize * x + this.cellSize / 2, this.cellSize * y + this.cellSize / 2],
    {
      fillColor: 'rgb(218, 255, 255)',
    },
  );

  drawTriangle(
    ctx,
    [this.cellSize * x + this.cellSize / 2, this.cellSize * y],
    [this.cellSize * x + this.cellSize, this.cellSize * y + this.cellSize / 2],
    [this.cellSize * x + this.cellSize / 2, this.cellSize * y + this.cellSize / 2],
    {
      fillColor: 'rgb(135, 218, 255)',
    },
  );

  drawTriangle(
    ctx,
    [this.cellSize * x + this.cellSize, this.cellSize * y + this.cellSize / 2],
    [this.cellSize * x + this.cellSize / 2, this.cellSize * y + this.cellSize],
    [this.cellSize * x + this.cellSize / 2, this.cellSize * y + this.cellSize / 2],
    {
      fillColor: 'rgb(84, 179, 255)',
    },
  );

  drawTriangle(
    ctx,
    [this.cellSize * x + this.cellSize / 2, this.cellSize * y + this.cellSize],
    [this.cellSize * x, this.cellSize * y + this.cellSize / 2],
    [this.cellSize * x + this.cellSize / 2, this.cellSize * y + this.cellSize / 2],
    {
      fillColor: 'rgb(179, 218, 255)',
    },
  );
}

export { renderDiamond };
