import React from 'react'
import Brick from './Brick.jsx'
import Player from './Player.jsx'
import Ball from './Ball.jsx'
import * as board from '../helpers/board'
import useKeys from '../hooks/useKeys'

function Game({ game, onMoveLeft, onMoveRight, onStart }) {
  const keysRef = useKeys({
    left: onMoveLeft,
    right: onMoveRight,
    space: onStart,
  })

  return (
    <box
      ref={keysRef}
      width="100%"
      height="100%"
      border={{ type: 'line' }}
      style={{ border: { fg: 'grey' } }}
    >
      {board.getBricks(game.board).map((brick) => (
        <Brick key={brick.id} {...brick} />
      ))}
      <Player {...game.player} />
      <Ball {...game.ball} />
    </box>
  )
}

export default Game
