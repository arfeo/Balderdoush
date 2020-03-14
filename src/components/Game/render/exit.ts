import { renderWall, renderWallBase, WallHole } from './wall';
import { drawRectangle } from '../../../utils/drawing';

type ExitHole = WallHole & {
  width?: number;
  height?: number;
};

function renderExit(x: number, y: number): void {
  renderWall.call(this, x, y);
}

function renderExitActive(x: number, y: number, state: number): void {
  const ctx: CanvasRenderingContext2D = this.mapCanvas.getContext('2d');

  renderWallBase.call(this, x, y);

  const wallHoles: { [key: number]: ExitHole[] } = {
    1: [
      {
        left: this.cellSize * x + this.cellSize / 6,
        top: this.cellSize * y + this.cellSize / 6,
        width: this.cellSize / 4,
        height: this.cellSize / 4,
      },
      {
        left: this.cellSize * x + this.cellSize - this.cellSize / 6 - this.cellSize / 4,
        top: this.cellSize * y + this.cellSize / 6,
        width: this.cellSize / 4,
        height: this.cellSize / 4,
      },
      {
        left: this.cellSize * x + this.cellSize / 6,
        top: this.cellSize * y + this.cellSize - this.cellSize / 6 - this.cellSize / 4,
        width: this.cellSize / 4,
        height: this.cellSize / 4,
      },
      {
        left: this.cellSize * x + this.cellSize - this.cellSize / 6 - this.cellSize / 4,
        top: this.cellSize * y + this.cellSize - this.cellSize / 6 - this.cellSize / 4,
        width: this.cellSize / 4,
        height: this.cellSize / 4,
      },
    ],
    2: [
      {
        left: this.cellSize * x + this.cellSize / 16,
        top: this.cellSize * y + this.cellSize / 16,
        width: this.cellSize / 2 - this.cellSize / 10,
        height: this.cellSize / 2 - this.cellSize / 10,
      },
      {
        left: this.cellSize * x + this.cellSize / 2 + this.cellSize / 16 - this.cellSize / 20,
        top: this.cellSize * y + this.cellSize / 16,
        width: this.cellSize / 2 - this.cellSize / 10,
        height: this.cellSize / 2 - this.cellSize / 10,
      },
      {
        left: this.cellSize * x + this.cellSize / 16,
        top: this.cellSize * y + this.cellSize / 2 + this.cellSize / 16 - this.cellSize / 20,
        width: this.cellSize / 2 - this.cellSize / 10,
        height: this.cellSize / 2 - this.cellSize / 10,
      },
      {
        left: this.cellSize * x + this.cellSize / 2 + this.cellSize / 16 - this.cellSize / 20,
        top: this.cellSize * y + this.cellSize / 2 + this.cellSize / 16 - this.cellSize / 20,
        width: this.cellSize / 2 - this.cellSize / 10,
        height: this.cellSize / 2 - this.cellSize / 10,
      },
    ],
  };

  wallHoles[state].forEach((item: ExitHole) => {
    drawRectangle(
      ctx,
      item.left,
      item.top,
      item.width,
      item.height,
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
