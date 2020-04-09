import { drawImage } from '../../../utils/drawing';
import { clearCells } from './';

import { ImageProps } from '../../../utils/types';

function renderAvatar(x: number, y: number): void {
  const ctx: CanvasRenderingContext2D = this.mapCanvas.getContext('2d');

  const getImageForState = (): ImageProps => {
    switch (this.avatarState) {
      case 'prop':
        return this.images.avatarProp;
      case 'pushLeft':
        return this.images.avatarPushLeft;
      case 'pushRight':
        return this.images.avatarPushRight;
      default:
        return this.images.avatarIdle;
    }
  };

  clearCells.call(this, ctx, x, y);

  drawImage(
    ctx,
    getImageForState(),
    this.cellSize * x,
    this.cellSize * y,
    this.cellSize,
    this.cellSize,
    {
      smooth: false,
    },
  );
}

export { renderAvatar };
