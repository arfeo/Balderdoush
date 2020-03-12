import { MapItems } from '../../constants/game';

import { renderPanel } from './render';

function checkCell(x: number, y: number): void {
  const mapItem: number = this.levelMap[y][x];

  switch (mapItem) {
    case MapItems.Diamond:
      this.score += this.diamondValue;
      this.diamondsToGet -= 1;

      renderPanel.call(this);
      break;
    default: break;
  }
}

export { checkCell };
