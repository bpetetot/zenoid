import React, {memo} from 'react'

import Brick from './Brick.jsx';
import Player from './Player.jsx';
import Ball from './Ball.jsx';

import * as board from '../helpers/board'

const Board = (props) => {
  const { player, ball, over, win } = props

  return (
    <box
      left="center"
      top="center"
      width={props.board.cols + 2}
      height={props.board.rows + 2}
      border={{ type: 'line' }}
      style={{ border: { fg: 'grey', bg: 'grey' } }}
    >
      { over || win ? (
          <box
            top="center" 
            left="center" 
            width="50%" 
            height="50%"
          >{ over ? 'GAME OVER.' : 'YOU WIN!' }</box>
        ): (
          <>
            {board.getBricks(props.board).map((props, i) => <Brick key={i} {...props}/>)}
            <Player {...player} />
            <Ball {...ball} />
          </>
      )}
    </box>
  )
}

export default memo(Board)
