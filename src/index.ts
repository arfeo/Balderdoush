import { Game } from './components/Game';

import { APP } from './constants/game';

window.onload = () => {
  APP.pageInstance = new Game();
};
