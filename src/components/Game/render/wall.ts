import { drawLineToAngle, drawRectangle } from '../../../utils/drawing';

interface WallHole {
  left: number;
  top: number;
}

function renderWall(x: number, y: number): void {
  const ctx: CanvasRenderingContext2D = this.mapCanvas.getContext('2d');

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

export { renderWall };
