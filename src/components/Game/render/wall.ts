import { drawLineToAngle, drawRectangle } from '../../../utils/drawing';
import { clearCells } from './';

export interface WallHole {
  left: number;
  top: number;
}

function renderWallBase(x: number, y: number, context?: CanvasRenderingContext2D): void {
  const ctx: CanvasRenderingContext2D = context || this.mapCanvas.getContext('2d');

  clearCells.call(this, ctx, x, y);

  drawRectangle(
    ctx,
    this.cellSize * x,
    this.cellSize * y,
    this.cellSize,
    this.cellSize,
    {
      fillColor: 'rgb(192, 0, 0)',
    },
  );

  drawLineToAngle(
    ctx,
    this.cellSize * x + this.cellSize / 30,
    this.cellSize * y + this.cellSize - this.cellSize / 60,
    this.cellSize - this.cellSize / 30,
    0,
    {
      edgingWidth: this.cellSize / 30,
      edgingColor: 'rgb(218, 179, 0)',
    },
  );

  drawLineToAngle(
    ctx,
    this.cellSize * x + this.cellSize - this.cellSize / 60,
    this.cellSize * y + this.cellSize / 30,
    this.cellSize - this.cellSize / 30,
    90,
    {
      edgingWidth: this.cellSize / 30,
      edgingColor: 'rgb(218, 179, 0)',
    },
  );
}

function renderWall(x: number, y: number, context?: CanvasRenderingContext2D): void {
  const ctx: CanvasRenderingContext2D = context || this.mapCanvas.getContext('2d');

  renderWallBase.call(this, x, y, context);

  const wallHoles: WallHole[] = [
    {
      left: this.cellSize * x + this.cellSize / 6,
      top: this.cellSize * y + this.cellSize / 6,
    },
    {
      left: this.cellSize * x + this.cellSize - this.cellSize / 3,
      top: this.cellSize * y + this.cellSize / 6,
    },
    {
      left: this.cellSize * x + this.cellSize / 6,
      top: this.cellSize * y + this.cellSize - this.cellSize / 3,
    },
    {
      left: this.cellSize * x + this.cellSize - this.cellSize / 3,
      top: this.cellSize * y + this.cellSize - this.cellSize / 3,
    },
  ];

  wallHoles.forEach((item: WallHole) => {
    drawRectangle(
      ctx,
      item.left,
      item.top,
      this.cellSize / 6,
      this.cellSize / 6,
      {
        fillColor: 'rgb(0, 0, 0)',
      },
    );

    drawRectangle(
      ctx,
      item.left + this.cellSize / 9,
      item.top + this.cellSize / 9,
      this.cellSize / 18,
      this.cellSize / 18,
      {
        fillColor: 'rgb(255, 255, 255)',
      },
    );

    drawLineToAngle(
      ctx,
      item.left,
      item.top,
      this.cellSize / 6,
      0,
      {
        edgingWidth: this.cellSize / 30,
        edgingColor: 'rgb(218, 179, 0)',
      },
    );

    drawLineToAngle(
      ctx,
      item.left,
      item.top,
      this.cellSize / 6,
      90,
      {
        edgingWidth: this.cellSize / 30,
        edgingColor: 'rgb(218, 179, 0)',
      },
    );
  });
}

export {
  renderWallBase,
  renderWall,
};
