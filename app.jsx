import React from 'react';
import blessed from 'neo-blessed';
import {createBlessedRenderer} from 'react-blessed';

import Board from './Board.jsx'
import Brick from './Brick.jsx';
import Player from './Player.jsx';

const render = createBlessedRenderer(blessed);

const config = {
	cols: 80,
	rows: 24,
};

const App = () => {
  return (
    <Board {...config}>
      <Brick />
      <Brick left={40}/>
      <Brick top={10}/>
      <Player />
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
