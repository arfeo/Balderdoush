import { MapItems } from '../../constants/game';

import { makeMove } from './actions';
import { getMapItemsByType } from '../../utils/game';

function onKeyDown(e: KeyboardEvent): void {
  const items: number[][] = getMapItemsByType(this.levelMap, MapItems.Avatar);

  if (!e || !items.length) {
    return;
  }

  const [avatarY, avatarX] = items[0];

  switch (e.key) {
    case 'ArrowLeft': {
      makeMove.call(this, avatarX, avatarY, avatarX - 1, avatarY);
      break;
    }
    case 'ArrowRight': {
      makeMove.call(this, avatarX, avatarY, avatarX + 1, avatarY);
      break;
    }
    case 'ArrowUp': {
      makeMove.call(this, avatarX, avatarY, avatarX, avatarY - 1);
      break;
    }
    case 'ArrowDown': {
      makeMove.call(this, avatarX, avatarY, avatarX, avatarY + 1);
      break;
    }
    default: break;
  }
}

export { onKeyDown };
