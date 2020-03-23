import { drawSector } from '../../../utils/drawing';
import { clearCells } from './index';

function renderButterfly(x: number, y: number): void {
  const ctx: CanvasRenderingContext2D = this.mapCanvas.getContext('2d');

  clearCells.call(this, ctx, x, y);

  drawSector(
    ctx,
    this.cellSize * x,
    this.cellSize * y + this.cellSize / 2,
    this.cellSize / 2,
    {
      startAngle: -Math.PI / 2,
      endAngle: Math.PI / 2,
      fillColor: 'rgb(179, 0, 179)',
    },
  );

  drawSector(
    ctx,
    this.cellSize * x,
    this.cellSize * y + this.cellSize / 2,
    this.cellSize / 4,
    {
      startAngle: -Math.PI / 2,
      endAngle: Math.PI / 2,
      fillColor: 'rgb(218, 84, 218)',
    },
  );

  drawSector(
    ctx,
    this.cellSize * x + this.cellSize,
    this.cellSize * y + this.cellSize / 2,
    this.cellSize / 2,
    {
      startAngle: Math.PI / 2,
      endAngle: Math.PI * 3 / 2,
      fillColor: 'rgb(179, 0, 179)',
    },
  );

  drawSector(
    ctx,
    this.cellSize * x + this.cellSize,
    this.cellSize * y + this.cellSize / 2,
    this.cellSize / 4,
    {
      startAngle: Math.PI / 2,
      endAngle: Math.PI * 3 / 2,
      fillColor: 'rgb(218, 84, 218)',
    },
  );
}

export { renderButterfly };
