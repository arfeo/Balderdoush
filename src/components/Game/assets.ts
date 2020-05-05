import { ImageProps, Images } from '../../core/components/types';

export interface ImageAssets extends Images {
  avatarIdle: ImageProps;
  avatarProp: ImageProps;
  avatarPushLeft1: ImageProps;
  avatarPushLeft2: ImageProps;
  avatarPushLeft3: ImageProps;
  avatarPushRight1: ImageProps;
  avatarPushRight2: ImageProps;
  avatarPushRight3: ImageProps;
  avatarWalkLeft1: ImageProps;
  avatarWalkLeft2: ImageProps;
  avatarWalkLeft3: ImageProps;
  avatarWalkRight1: ImageProps;
  avatarWalkRight2: ImageProps;
  avatarWalkRight3: ImageProps;
}

function getImageAssets(): ImageAssets {
  return {
    avatarIdle: {
      src: './static/avatar-idle.svg',
    },
    avatarProp: {
      src: './static/avatar-prop.svg',
    },
    avatarPushLeft1: {
      src: './static/avatar-push-left1.svg',
    },
    avatarPushLeft2: {
      src: './static/avatar-push-left2.svg',
    },
    avatarPushLeft3: {
      src: './static/avatar-push-left3.svg',
    },
    avatarPushRight1: {
      src: './static/avatar-push-right1.svg',
    },
    avatarPushRight2: {
      src: './static/avatar-push-right2.svg',
    },
    avatarPushRight3: {
      src: './static/avatar-push-right3.svg',
    },
    avatarWalkLeft1: {
      src: './static/avatar-walk-left1.svg',
    },
    avatarWalkLeft2: {
      src: './static/avatar-walk-left2.svg',
    },
    avatarWalkLeft3: {
      src: './static/avatar-walk-left3.svg',
    },
    avatarWalkRight1: {
      src: './static/avatar-walk-right1.svg',
    },
    avatarWalkRight2: {
      src: './static/avatar-walk-right2.svg',
    },
    avatarWalkRight3: {
      src: './static/avatar-walk-right3.svg',
    },
  };
}

export { getImageAssets };
