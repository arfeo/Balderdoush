import { drawCircle } from '../../../core/utils/drawing';
import { clearCells } from '../helpers';
import { getRandomNum } from '../../../core/utils/common';

function renderExplosion(x: number, y: number, sizeNumerator: number, context?: CanvasRenderingContext2D): void {
  const ctx: CanvasRenderingContext2D = context || this.mapCanvas.getContext('2d');

  clearCells(ctx, x, y);

  drawCircle(
    ctx,
    this.cellSize * x + this.cellSize / 2,
    this.cellSize * y + this.cellSize / 2,
    this.cellSize * sizeNumerator / 60 / getRandomNum(1, 10),
    {
      edgingWidth: this.cellSize * sizeNumerator / 60 / getRandomNum(1, 10),
      edgingColor: 'rgb(192, 0, 0)',
      fillColor: 'rgb(218, 179, 135)',
    },
  );
}

export { renderExplosion };
