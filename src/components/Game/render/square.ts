import { drawRectangle } from '../../../core/utils/drawing';
import { clearCells } from './index';

const BLACK_COLOR = 'rgb(0, 0, 0)';

interface SquareColors {
  frame1: string;
  frame2: string;
  frame3: string;
  center: string;
}

function renderSquare(x: number, y: number, state: number, context?: CanvasRenderingContext2D): void {
  const ctx: CanvasRenderingContext2D = context || this.mapCanvas.getContext('2d');
  let squareColors: SquareColors = {
    frame1: BLACK_COLOR,
    frame2: BLACK_COLOR,
    frame3: BLACK_COLOR,
    center: BLACK_COLOR,
  };

  clearCells.call(this, ctx, x, y);

  switch (state) {
    case 1:
      squareColors = {
        frame1: 'rgb(255, 179, 0)',
        frame2: 'rgb(255, 135, 0)',
        frame3: 'rgb(218, 84, 0)',
        center: 'rgb(255, 255, 255)',
      };
      break;
    case 2:
      squareColors = {
        frame1: 'rgb(255, 135, 0)',
        frame2: 'rgb(218, 84, 0)',
        frame3: 'rgb(255, 255, 255)',
        center: 'rgb(255, 179, 0)',
      };
      break;
    case 3:
      squareColors = {
        frame1: 'rgb(218, 84, 0)',
        frame2: 'rgb(255, 255, 255)',
        frame3: 'rgb(255, 179, 0)',
        center: 'rgb(255, 135, 0)',
      };
      break;
    case 4:
      squareColors = {
        frame1: 'rgb(255, 255, 255)',
        frame2: 'rgb(255, 179, 0)',
        frame3: 'rgb(255, 135, 0)',
        center: 'rgb(218, 84, 0)',
      };
      break;
    default: break;
  }

  drawRectangle(
    ctx,
    this.cellSize * x,
    this.cellSize * y,
    this.cellSize,
    this.cellSize,
    {
      fillColor: squareColors.frame1,
    },
  );

  drawRectangle(
    ctx,
    this.cellSize * x + this.cellSize / 8,
    this.cellSize * y + this.cellSize / 8,
    this.cellSize - this.cellSize / 4,
    this.cellSize - this.cellSize / 4,
    {
      fillColor: squareColors.frame2,
    },
  );

  drawRectangle(
    ctx,
    this.cellSize * x + this.cellSize / 4,
    this.cellSize * y + this.cellSize / 4,
    this.cellSize - this.cellSize / 2,
    this.cellSize - this.cellSize / 2,
    {
      fillColor: squareColors.frame3,
    },
  );

  drawRectangle(
    ctx,
    this.cellSize * x + this.cellSize * 3 / 8,
    this.cellSize * y + this.cellSize * 3 / 8,
    this.cellSize - this.cellSize * 3 / 4,
    this.cellSize - this.cellSize * 3 / 4,
    {
      fillColor: squareColors.center,
    },
  );
}

export { renderSquare };
