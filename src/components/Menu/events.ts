import { Game } from '../Game';

import { APP } from '../../constants/game';

function onStartGameClick(): void {
  this.destroy();

  APP.pageInstance = new Game();
}

export { onStartGameClick };
