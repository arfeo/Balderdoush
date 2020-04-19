import { drawRectangle } from '../../../utils/drawing';
import { clearCells, getNoiseParams } from './';

import { NoiseParam } from '../types';

let noiseParams: NoiseParam[] = [];

function renderSoil(x: number, y: number): void {
  const ctx: CanvasRenderingContext2D = this.mapCanvas.getContext('2d');

  clearCells.call(this, ctx, x, y);

  drawRectangle(
    ctx,
    this.cellSize * x,
    this.cellSize * y,
    this.cellSize,
    this.cellSize,
    {
      fillColor: 'rgb(218, 179, 135)',
    },
  );

  if (!noiseParams.length) {
    noiseParams = getNoiseParams(this.cellSize);
  }

  noiseParams.forEach((param: NoiseParam) => {
    const { randomX, randomY, randomSize, randomOpacityOne, randomOpacityTwo } = param;

    ctx.fillStyle = `hsla(0, 0%, 0%, .${randomOpacityOne + randomOpacityTwo})`;

    ctx.fillRect(
      randomX + this.cellSize * x,
      randomY + this.cellSize * y,
      randomSize,
      randomSize,
    );
  });
}

export { renderSoil };
