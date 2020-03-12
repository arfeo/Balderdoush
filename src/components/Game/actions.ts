import { MapItems } from '../../constants/game';

import { renderMap, renderPanel } from './render';
import { changeMapValue } from '../../utils/game';

function checkMovePossibility(targetX: number, targetY: number): boolean {
  if (this.levelMap[targetY] === undefined || this.levelMap[targetY][targetX] === undefined) {
    return false;
  }

  const mapItem: number = this.levelMap[targetY][targetX];
  const isWall: boolean = mapItem === MapItems.Wall || mapItem === MapItems.BrickWall;

  return !isWall;
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

  renderMap.call(this);
}

export { tryMove };
