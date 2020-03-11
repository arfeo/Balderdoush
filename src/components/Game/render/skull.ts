import { drawCircle, drawLineToAngle, drawTriangle } from '../../../utils/drawing';
import { clearCells } from './';

import { DrawOptions } from '../../../utils/types';

function renderSkull(x: number, y: number): void {
  const ctx: CanvasRenderingContext2D = this.mapCanvas.getContext('2d');

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

  drawCircle(
    ctx,
    this.cellSize * x + this.cellSize / 3.1,
    this.cellSize * y + this.cellSize / 2.7,
    this.cellSize / 11,
    {
      fillColor: 'rgb(251, 4, 4)',
    },
  );

  drawCircle(
    ctx,
    this.cellSize * x + this.cellSize - this.cellSize / 3.1,
    this.cellSize * y + this.cellSize / 2.7,
    this.cellSize / 11,
    {
      fillColor: 'rgb(251, 4, 4)',
    },
  );

  drawTriangle(
    ctx,
    [this.cellSize * x + this.cellSize / 2 - this.cellSize / 15, this.cellSize * y + this.cellSize / 1.6],
    [this.cellSize * x + this.cellSize / 2, this.cellSize * y + this.cellSize / 2 - this.cellSize / 11],
    [this.cellSize * x + this.cellSize / 2 + this.cellSize / 15, this.cellSize * y + this.cellSize / 1.6],
    {
      fillColor: 'rgb(251, 4, 4)',
    },
  );

  // Smile, please
  let smileX: number = this.cellSize * x + this.cellSize / 3.1;
  let smileY: number = this.cellSize * y + this.cellSize - this.cellSize / 5;
  let direction = -45;
  const smileDrawOptions: Omit<DrawOptions, 'fillColor'> = {
    edgingWidth: this.cellSize / 30,
    edgingColor: 'rgb(251, 4, 4)',
  };

  for (let i = 0; i < 6; i += 1) {
    drawLineToAngle(
      ctx,
      smileX,
      smileY,
      this.cellSize / 11,
      direction,
      smileDrawOptions,
    );

    smileX += this.cellSize / 11 * Math.cos(Math.PI * direction / 180);
    smileY += this.cellSize / 11 * Math.sin(Math.PI * direction / 180);
    direction *= -1;
  }
}

export { renderSkull };
