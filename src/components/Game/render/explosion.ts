import { drawCircle } from '../../../utils/drawing';
import { getRandomNum } from '../../../utils/common';
import { clearCells } from './';

function renderExplosion(x: number, y: number, sizeNumerator: number): void {
  const ctx: CanvasRenderingContext2D = this.mapCanvas.getContext('2d');

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
