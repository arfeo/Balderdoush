import { renderWall } from './wall';
import { clearCells } from './index';
import { drawRectangle } from '../../../utils/drawing';

interface WallHole {
  left: number;
  top: number;
}

function renderExit(x: number, y: number): void {
  renderWall.call(this, x, y);
}

function renderExitActive(x: number, y: number, state: number): void {
  const ctx: CanvasRenderingContext2D = this.mapCanvas.getContext('2d');

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

  const wallHoles: { [key: number]: WallHole[] } = {
    1: [
      {
        left: this.cellSize * x + this.cellSize / 4,
        top: this.cellSize * y + this.cellSize / 4,
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
    ],
    2: [
      {
        left: this.cellSize * x + this.cellSize / 3,
        top: this.cellSize * y + this.cellSize / 3,
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
    ],
  };

  wallHoles[state].forEach((item: WallHole) => {
    drawRectangle(
      ctx,
      item.left,
      item.top,
      this.cellSize / 3,
      this.cellSize / 3,
      {
        fillColor: 'rgb(0, 0, 0)',
      },
    );
  });
}

export {
  renderExit,
  renderExitActive,
};
