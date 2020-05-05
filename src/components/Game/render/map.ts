import { TOTAL_MAP_HEIGHT, TOTAL_MAP_WIDTH } from '../../../constants/game';

import { renderMapItem } from './mapItem';

function renderMap(): void {
  for (let y = 0; y < TOTAL_MAP_HEIGHT; y += 1) {
    for (let x = 0; x < TOTAL_MAP_WIDTH; x += 1) {
      renderMapItem.call(this, x, y);
    }
  }
}

export { renderMap };
