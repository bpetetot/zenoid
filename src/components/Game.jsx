import React from 'react'
import Brick from './Brick'
import Player from './Player'
import Ball from './Ball'
import { getBricks } from '../zenoid/level/helpers'
import useKeys from '../hooks/useKeys'

function Game({ zenoid, onMoveLeft, onMoveRight }) {
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
      {getBricks(zenoid.level).map((brick) => (
        <Brick key={brick.id} {...brick} />
      ))}
      <Player {...zenoid.player} />
      <Ball {...zenoid.ball} />
    </box>
  )
}

export default Game
