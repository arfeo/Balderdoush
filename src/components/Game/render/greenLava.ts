import { drawRectangle } from '../../../utils/drawing';
import { clearCells, getNoiseParams } from './';

import { NoiseParam } from '../types';

let noiseParams: NoiseParam[] = [];

function renderGreenLava(x: number, y: number): void {
  const ctx: CanvasRenderingContext2D = this.mapCanvas.getContext('2d');

  clearCells.call(this, ctx, x, y);

  drawRectangle(
    ctx,
    this.cellSize * x,
    this.cellSize * y,
    this.cellSize,
    this.cellSize,
    {
      fillColor: 'rgb(83, 218, 65)',
    },
  );

  if (!noiseParams.length) {
    noiseParams = getNoiseParams(this.cellSize);
  }

  noiseParams.forEach((param: NoiseParam) => {
    const { randomX, randomY, randomSize, randomOpacityOne, randomOpacityTwo } = param;

    ctx.fillStyle = `hsla(116.4, 57.1%, 34.7%, .${randomOpacityOne + randomOpacityTwo})`;

    ctx.fillRect(
      randomX + this.cellSize * x,
      randomY + this.cellSize * y,
      randomSize * 1.3,
      randomSize * 1.3,
    );
  });
}

export { renderGreenLava };
