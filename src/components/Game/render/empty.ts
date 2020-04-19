import { clearCells } from './';

function renderEmpty(x: number, y: number, context?: CanvasRenderingContext2D): void {
  clearCells.call(this, context || this.mapCanvas.getContext('2d'), x, y);
}

export { renderEmpty };
