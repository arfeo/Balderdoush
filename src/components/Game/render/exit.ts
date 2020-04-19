import { renderWall, renderWallBase, WallHole } from './wall';
import { drawRectangle } from '../../../utils/drawing';

interface HoleSize {
  width?: number;
  height?: number;
}

type ExitHole = WallHole & HoleSize;

function renderExit(x: number, y: number, context?: CanvasRenderingContext2D): void {
  renderWall.call(this, x, y, context);
}

function renderExitActive(x: number, y: number, state: number, context?: CanvasRenderingContext2D): void {
  const ctx: CanvasRenderingContext2D = context || this.mapCanvas.getContext('2d');

  renderWallBase.call(this, x, y);

  const stateOneSize: HoleSize = {
    width: this.cellSize / 4,
    height: this.cellSize / 4,
  };

  const stateTwoSize: HoleSize = {
    width: this.cellSize / 2 - this.cellSize / 10,
    height: this.cellSize / 2 - this.cellSize / 10,
  };

  const wallHoles: { [key: number]: ExitHole[] } = {
    1: [
      {
        left: this.cellSize * x + this.cellSize / 6,
        top: this.cellSize * y + this.cellSize / 6,
        ...stateOneSize,
      },
      {
        left: this.cellSize * x + this.cellSize - this.cellSize / 6 - this.cellSize / 4,
        top: this.cellSize * y + this.cellSize / 6,
        ...stateOneSize,
      },
      {
        left: this.cellSize * x + this.cellSize / 6,
        top: this.cellSize * y + this.cellSize - this.cellSize / 6 - this.cellSize / 4,
        ...stateOneSize,
      },
      {
        left: this.cellSize * x + this.cellSize - this.cellSize / 6 - this.cellSize / 4,
        top: this.cellSize * y + this.cellSize - this.cellSize / 6 - this.cellSize / 4,
        ...stateOneSize,
      },
    ],
    2: [
      {
        left: this.cellSize * x + this.cellSize / 16,
        top: this.cellSize * y + this.cellSize / 16,
        ...stateTwoSize,
      },
      {
        left: this.cellSize * x + this.cellSize / 2 + this.cellSize / 16 - this.cellSize / 20,
        top: this.cellSize * y + this.cellSize / 16,
        ...stateTwoSize,
      },
      {
        left: this.cellSize * x + this.cellSize / 16,
        top: this.cellSize * y + this.cellSize / 2 + this.cellSize / 16 - this.cellSize / 20,
        ...stateTwoSize,
      },
      {
        left: this.cellSize * x + this.cellSize / 2 + this.cellSize / 16 - this.cellSize / 20,
        top: this.cellSize * y + this.cellSize / 2 + this.cellSize / 16 - this.cellSize / 20,
        ...stateTwoSize,
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
