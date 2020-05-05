import { renderMapItem } from './mapItem';

function rerenderCellWithNeighbors(x: number, y: number): void {
  const rerenderCoords: number[][] = [
    [y, x],
    [y, x + 1],
    [y + 1, x + 1],
    [y + 1, x],
    [y + 1, x - 1],
    [y, x - 1],
    [y - 1, x - 1],
    [y - 1, x],
    [y - 1, x + 1],
  ];

  rerenderCoords.forEach((item: number[]) => {
    const [itemY, itemX] = item;

    renderMapItem.call(this, itemX, itemY);
  });
}

export { rerenderCellWithNeighbors };
