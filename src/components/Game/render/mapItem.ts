import { MapItems } from '../../../constants/game';

import { renderEmpty } from './empty';
import { renderWall } from './wall';
import { renderBoulder } from './boulder';
import { renderSquare } from './square';
import { renderAvatar } from './avatar';
import { renderExit } from './exit';
import { renderDiamond } from './diamond';
import { renderSoil } from './soil';
import { renderBrickWall } from './brickWall';
import { renderButterfly } from './butterfly';
import { renderGreenLava } from './greenLava';

function renderMapItem(x: number, y: number): void {
  if (this.levelMap[y] === undefined) {
    return;
  }

  switch (this.levelMap[y][x]) {
    case MapItems.EmptySpace:
      renderEmpty.call(this, x, y);
      break;
    case MapItems.Wall:
      renderWall.call(this, x, y);
      break;
    case MapItems.Boulder:
      renderBoulder.call(this, x, y);
      break;
    case MapItems.Square:
      renderSquare.call(this, x, y, 1);
      break;
    case MapItems.Avatar:
      renderAvatar.call(this, x, y, this.avatarAnimationState);
      break;
    case MapItems.Exit:
      this.diamondsToGet > 0 && renderExit.call(this, x, y);
      break;
    case MapItems.Diamond:
      renderDiamond.call(this, x, y);
      break;
    case MapItems.Soil:
      renderSoil.call(this, x, y);
      break;
    case MapItems.BrickWall:
    case MapItems.BrickWallSpecial:
      renderBrickWall.call(this, x, y, 1);
      break;
    case MapItems.Butterfly:
      renderButterfly.call(this, x, y, 1);
      break;
    case MapItems.GreenLava:
      renderGreenLava.call(this, x, y);
      break;
    default: break;
  }
}

export { renderMapItem };
