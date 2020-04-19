import { Menu } from './components/Menu';

import { renderComponent } from './components/core';

window.onload = () => {
  renderComponent(Menu, document.getElementById('root'));
};
