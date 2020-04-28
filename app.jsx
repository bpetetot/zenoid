import React from 'react';
import blessed from 'neo-blessed';
import {createBlessedRenderer} from 'react-blessed';

import Board from './Board.jsx'

const render = createBlessedRenderer(blessed);

const config = {
	cols: 80,
	rows: 24,
};

const App = () => {
  return (
    <Board {...config}>
      
    </Board>
  );
}

const screen = blessed.screen({
  title: 'Zenoid',
  smartCSR: false,
  debug: true,
});

screen.key(['escape', 'q', 'C-c'], () => process.exit(0));

render(<App />, screen);
