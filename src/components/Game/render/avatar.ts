import { drawImage } from '../../../utils/drawing';
import { clearCells } from './';

function renderAvatar(x: number, y: number): void {
  const ctx: CanvasRenderingContext2D = this.mapCanvas.getContext('2d');

  clearCells.call(this, ctx, x, y);

  drawImage(
    ctx,
    this.images.avatarIdle,
    this.cellSize * x,
    this.cellSize * y,
    this.cellSize,
    this.cellSize,
    {
      smooth: false,
    },
  );
}

export { renderAvatar };
