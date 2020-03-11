import { drawRectangle } from '../../../utils/drawing';
import { clearCells } from './';

interface NoiseParam {
  randomX: number;
  randomY: number;
  randomSize: number;
  randomOpacityOne: number;
  randomOpacityTwo: number;
}

const noiseParams: NoiseParam[] = [];

function getNoiseParams(cellSize: number): void {
  const hmTimes = Math.round(cellSize * 2);

  for (let i = 0; i <= hmTimes; i += 1) {
    noiseParams.push({
      randomX: Math.floor((Math.random() * cellSize) + 1),
      randomY: Math.floor((Math.random() * cellSize) + 1),
      randomSize: Math.floor((Math.random() * 1.5 * cellSize / 75) + 1),
      randomOpacityOne: Math.floor((Math.random() * 7) + 1),
      randomOpacityTwo: Math.floor((Math.random() * 7) + 1),
    });
  }
}

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

  if (noiseParams.length === 0) {
    getNoiseParams(this.cellSize);
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
