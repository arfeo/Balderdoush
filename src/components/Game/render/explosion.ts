import { drawCircle } from '../../../utils/drawing';
import { clearCells } from './index';

function renderExplosion(x: number, y: number, sizeDenominator: number): void {
  const ctx: CanvasRenderingContext2D = this.mapCanvas.getContext('2d');

  clearCells(ctx, x, y);

  drawCircle(
    ctx,
    this.cellSize * x + this.cellSize / 2,
    this.cellSize * y + this.cellSize / 2,
    this.cellSize / sizeDenominator,
    {
      edgingWidth: this.cellSize / sizeDenominator,
      edgingColor: 'rgb(192, 0, 0)',
      fillColor: 'rgb(218, 179, 135)',
    },
  );
}

export { renderExplosion };
