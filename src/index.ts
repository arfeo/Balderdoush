import { Game } from './components/Game';

import { APP } from './constants/globals';

window.onload = () => {
  APP.pageInstance = new Game();
};
