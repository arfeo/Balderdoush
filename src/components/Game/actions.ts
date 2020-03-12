import { MapItems } from '../../constants/game';

import { renderMap, renderPanel } from './render';
import { changeMapValue } from './helpers';

function tryMove(itemX: number, itemY: number, targetX: number, targetY: number): void {
  if (this.levelMap[targetY] && this.levelMap[targetY][targetX] !== undefined) {
    const mapItem: number = this.levelMap[targetY][targetX];

    switch (mapItem) {
      case MapItems.Diamond:
        this.score += this.diamondValue;
        this.diamondsToGet -= 1;

        renderPanel.call(this);
        break;
      default: break;
    }

    this.levelMap = changeMapValue(this.levelMap, itemX, itemY, MapItems.EmptySpace);
    this.levelMap = changeMapValue(this.levelMap, targetX, targetY, MapItems.Avatar);

    renderMap.call(this);
  }
}

export { tryMove };
