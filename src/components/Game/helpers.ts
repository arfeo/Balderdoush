import { MapItems } from '../../constants/game';

import { getMapItemsByType } from '../../utils/game';

function getInitialOffset(): number[] {
  const items: number[][] = getMapItemsByType(this.levelMap, MapItems.Avatar);

  if (!items.length) {
    return [0, 0];
  }

  const [avatarY, avatarX] = items[0];
  const offsetY: number = this.levelMap[avatarY - 9] ? avatarY - 9 : 0;
  const offsetX: number = this.levelMap[offsetY][avatarX - 15] ? avatarX - 15 : 0;

  return [offsetY, offsetX];
}

export { getInitialOffset };
