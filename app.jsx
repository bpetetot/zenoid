import React from 'react';
import blessed from 'neo-blessed';
import {createBlessedRenderer} from 'react-blessed';

import Board from './Board.jsx'
import level1 from './levels/level1.js';

const render = createBlessedRenderer(blessed);

const App = () => {
  return (
    <Board map={level1} />
  );
}

const screen = blessed.screen({
  title: 'Zenoid',
  smartCSR: false,
  debug: true,
});

screen.key(['escape', 'q', 'C-c'], () => process.exit(0));

render(<App />, screen);
