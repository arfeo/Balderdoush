import { drawSector } from '../../../core/utils/drawing';
import { clearCells } from './index';

function renderButterfly(x: number, y: number, state: number, context?: CanvasRenderingContext2D): void {
  const ctx: CanvasRenderingContext2D = context || this.mapCanvas.getContext('2d');

  clearCells.call(this, ctx, x, y);

  if (state === 1) {
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
  } else {
    drawSector(
      ctx,
      this.cellSize * x + this.cellSize / 8,
      this.cellSize * y + this.cellSize / 2,
      this.cellSize / 2 - this.cellSize / 10,
      {
        startAngle: -Math.PI / 2,
        endAngle: Math.PI / 2,
        fillColor: 'rgb(218, 84, 218)',
      },
    );

    drawSector(
      ctx,
      this.cellSize * x + this.cellSize / 8,
      this.cellSize * y + this.cellSize / 2,
      this.cellSize / 4 - this.cellSize / 10,
      {
        startAngle: -Math.PI / 2,
        endAngle: Math.PI / 2,
        fillColor: 'rgb(250, 167, 250)',
      },
    );

    drawSector(
      ctx,
      this.cellSize * x + this.cellSize - this.cellSize / 8,
      this.cellSize * y + this.cellSize / 2,
      this.cellSize / 2 - this.cellSize / 10,
      {
        startAngle: Math.PI / 2,
        endAngle: Math.PI * 3 / 2,
        fillColor: 'rgb(218, 84, 218)',
      },
    );

    drawSector(
      ctx,
      this.cellSize * x + this.cellSize - this.cellSize / 8,
      this.cellSize * y + this.cellSize / 2,
      this.cellSize / 4 - this.cellSize / 10,
      {
        startAngle: Math.PI / 2,
        endAngle: Math.PI * 3 / 2,
        fillColor: 'rgb(250, 167, 250)',
      },
    );
  }
}

export { renderButterfly };
