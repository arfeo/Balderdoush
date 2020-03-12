import { MapItems } from '../../constants/game';

import { renderMap, renderPanel } from './render';
import { changeMapValue } from '../../utils/game';

function checkMovePossibility(targetX: number, targetY: number): boolean {
  if (this.levelMap[targetY] === undefined || this.levelMap[targetY][targetX] === undefined) {
    return false;
  }

  const mapItem: number = this.levelMap[targetY][targetX];

  return mapItem === MapItems.EmptySpace || mapItem === MapItems.Soil;
}

function adjustOffset(x: number, y: number): void {
  const [offsetY, offsetX] = this.offset;

  if ((x - offsetX) < 3 && offsetX > 0) {
    this.offset = [offsetY, offsetX - 1];
  }

  if ((x - offsetX) > 17 && this.levelMap && this.levelMap[0] && (offsetX + 20) < this.levelMap[0].length) {
    this.offset = [offsetY, offsetX + 1];
  }

  if ((y - offsetY) <= 3 && offsetY > 0) {
    this.offset = [offsetY - 1, offsetX];
  }

  if ((y - offsetY) > 10 && this.levelMap && (offsetY + 13) < this.levelMap.length) {
    this.offset = [offsetY + 1, offsetX];
  }
}

function tryMove(itemX: number, itemY: number, targetX: number, targetY: number): void {
  if (!checkMovePossibility.call(this, targetX, targetY)) {
    return;
  }

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

  adjustOffset.call(this, targetX, targetY);

  renderMap.call(this);
}

export { tryMove };
