import { drawLineToAngle, drawRectangle } from '../../../utils/drawing';
import { clearCells } from './';

function renderBrickWall(x: number, y: number, state: number): void {
  const ctx: CanvasRenderingContext2D = this.mapCanvas.getContext('2d');

  clearCells.call(this, ctx, x, y);

  drawRectangle(
    ctx,
    this.cellSize * x,
    this.cellSize * y,
    this.cellSize,
    this.cellSize,
    {
      fillColor: 'rgb(255, 255, 255)',
    },
  );

  for (let a = 0; a <= 8; a += 1) {
    drawLineToAngle(
      ctx,
      this.cellSize * x,
      this.cellSize * y + a * this.cellSize / 8,
      this.cellSize,
      0,
      {
        edgingWidth: this.cellSize / 50,
        edgingColor: 'rgb(0, 0, 0)',
      },
    );

    for (let b = 0; b < 4; b += 1) {
      const brickSeamsOffset: number = state === 1 && a % 2 !== 0
        ? this.cellSize / 8
        : state === 2 && a % 2 === 0
          ? this.cellSize / 8
          : 0;

      drawLineToAngle(
        ctx,
        this.cellSize * x + b * this.cellSize / 4 + brickSeamsOffset,
        this.cellSize * y + a * this.cellSize / 8,
        this.cellSize / 8,
        90,
        {
          edgingWidth: this.cellSize / 50,
          edgingColor: 'rgb(0, 0, 0)',
        },
      );
    }
  }
}

export { renderBrickWall };
