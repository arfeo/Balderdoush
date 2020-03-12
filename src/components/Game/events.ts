import { MapItems } from '../../constants/game';

import { changeMapValue, getMapItemsByType } from './helpers';
import { renderMap } from './render';
import { checkCell } from './actions';

function onKeyDown(e: KeyboardEvent): void {
  const items: number[][] = getMapItemsByType(this.levelMap, MapItems.Avatar);

  if (!items.length) {
    return;
  }

  const [avatarY, avatarX] = items[0];

  switch (e.key) {
    case 'ArrowLeft': {
      if (this.levelMap[avatarY][avatarX - 1] !== undefined) {
        checkCell.call(this, avatarX - 1, avatarY);

        this.levelMap = changeMapValue(this.levelMap, avatarX, avatarY, MapItems.EmptySpace);
        this.levelMap = changeMapValue(this.levelMap, avatarX - 1, avatarY, MapItems.Avatar);

        renderMap.call(this);
      }

      break;
    }
    case 'ArrowRight': {
      if (this.levelMap[avatarY][avatarX + 1] !== undefined) {
        checkCell.call(this, avatarX + 1, avatarY);

        this.levelMap = changeMapValue(this.levelMap, avatarX, avatarY, MapItems.EmptySpace);
        this.levelMap = changeMapValue(this.levelMap, avatarX + 1, avatarY, MapItems.Avatar);

        renderMap.call(this);
      }

      break;
    }
    case 'ArrowUp': {
      if (this.levelMap[avatarY - 1] !== undefined) {
        checkCell.call(this, avatarX, avatarY - 1);

        this.levelMap = changeMapValue(this.levelMap, avatarX, avatarY, MapItems.EmptySpace);
        this.levelMap = changeMapValue(this.levelMap, avatarX, avatarY - 1, MapItems.Avatar);

        renderMap.call(this);
      }

      break;
    }
    case 'ArrowDown': {
      if (this.levelMap[avatarY + 1] !== undefined) {
        checkCell.call(this, avatarX, avatarY + 1);

        this.levelMap = changeMapValue(this.levelMap, avatarX, avatarY, MapItems.EmptySpace);
        this.levelMap = changeMapValue(this.levelMap, avatarX, avatarY + 1, MapItems.Avatar);

        renderMap.call(this);
      }

      break;
    }
    default: break;
  }
}

export { onKeyDown };
