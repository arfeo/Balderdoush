import { drawStar } from '../../../utils/drawing';

function renderAvatar(x: number, y: number): void {
  const ctx: CanvasRenderingContext2D = this.mapCanvas.getContext('2d');

  drawStar(
    ctx,
    this.cellSize * x + this.cellSize / 2,
    this.cellSize * y + this.cellSize / 2,
    5,
    this.cellSize / 2,
    this.cellSize / 5,
    {
      fillColor: 'rgb(0, 218, 179)',
    },
  );
}

export { renderAvatar };
