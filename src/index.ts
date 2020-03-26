import { Menu } from './components/Menu';

import { APP } from './constants/game';

window.onload = () => {
  APP.pageInstance = new Menu();
};
