import { drawImage } from '../../../core/utils/drawing';
import { clearCells } from './';

import { ImageProps } from '../../../core/components/types';

function renderAvatar(x: number, y: number, animationState: number, context?: CanvasRenderingContext2D): void {
  const ctx: CanvasRenderingContext2D = context || this.mapCanvas.getContext('2d');

  const getImageForState = (): ImageProps => {
    const state: number = animationState !== 4 ? animationState : 2;

    switch (this.avatarState) {
      case 'prop':
        return this.images.avatarProp;
      case 'pushLeft':
        return this.images[`avatarPushLeft${state}`];
      case 'pushRight':
        return this.images[`avatarPushRight${state}`];
      case 'walkLeft':
        return this.images[`avatarWalkLeft${state}`];
      case 'walkRight':
        return this.images[`avatarWalkRight${state}`];
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
