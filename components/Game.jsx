import React from 'react'
import Brick from './Brick.jsx'
import Player from './Player.jsx'
import Ball from './Ball.jsx'
import * as board from '../helpers/board'

function Game({ game }) {
  return (
    <>
      {board.getBricks(game.board).map(brick => (
        <Brick key={brick.id} {...brick} />
      ))}
      <Player {...game.player} />
      <Ball {...game.ball} />
    </>
  )
}

export default Game
