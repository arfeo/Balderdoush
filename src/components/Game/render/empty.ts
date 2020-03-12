import { clearCells } from './index';

function renderEmpty(x: number, y: number): void {
  clearCells.call(this, this.mapCanvas.getContext('2d'), x, y);
}

export { renderEmpty };
