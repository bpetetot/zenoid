import React from 'react'

import Brick from './Brick.jsx';
import Player from './Player.jsx';

const Board = ({ cols, rows, bricks, player }) => {
  return (
    <box
      left="center"
      top="center"
      width={cols + 2}
      height={rows + 2}
      border={{ type: 'line' }}
      style={{ border: { fg: 'grey', bg: 'grey' } }}
    >
      {bricks.map((props, i) => <Brick key={i} {...props}/>)}
      <Player {...player} />
    </box>
  )
}

export default Board
