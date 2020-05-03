import React from 'react'
import Brick from './Brick'
import Player from './Player'
import Ball from './Ball'
import * as levelHelpers from '../zenoid/models/level'
import useKeys from '../hooks/useKeys'

function Game({ game, onMoveLeft, onMoveRight }) {
  const keysRef = useKeys({
    left: onMoveLeft,
    right: onMoveRight,
  })

  return (
    <box
      ref={keysRef}
      width="100%"
      height="100%"
      border={{ type: 'line' }}
      style={{ border: { fg: 'grey' } }}
    >
      {levelHelpers.getBricks(game.level).map((brick) => (
        <Brick key={brick.id} {...brick} />
      ))}
      <Player {...game.player} />
      <Ball {...game.ball} />
    </box>
  )
}

export default Game
