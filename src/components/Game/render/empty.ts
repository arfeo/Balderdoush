import { clearCells } from './index';

function renderEmpty(x: number, y: number): void {
  clearCells(this.mapCanvas.getContext('2d'), x, y);
}

export { renderEmpty };
