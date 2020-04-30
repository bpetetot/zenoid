import React, {memo} from 'react'

import Brick from './Brick.jsx';
import Player from './Player.jsx';
import Ball from './Ball.jsx';

const Board = ({ cols, rows, bricks, player, ball }) => {
  return (
    <box
      left="center"
      top="center"
      width={cols + 2}
      height={rows + 2}
      border={{ type: 'line' }}
      style={{ border: { fg: 'grey', bg: 'grey' } }}
    >
      {bricks.filter(b => b.visible).map((props, i) => <Brick key={i} {...props}/>)}
      <Player {...player} />
      <Ball {...ball} />
    </box>
  )
}

export default memo(Board)
