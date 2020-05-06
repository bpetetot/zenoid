import React from 'react'
import Brick from './Brick'
import Player from './Player'
import Ball from './Ball'
import { level } from '@zenoid/core'
import useKeys from '../hooks/useKeys'

function Game({ zenoid, onMoveLeft, onMoveRight, onDash }) {
  const keysRef = useKeys({
    left: onMoveLeft,
    right: onMoveRight,
    space: onDash,
  })

  return (
    <box
      ref={keysRef}
      width="100%"
      height="100%"
      border={{ type: 'line' }}
      style={{ border: { fg: 'grey' } }}
    >
      {level.getBricks(zenoid.level).map((brick) => (
        <Brick key={brick.id} {...brick} />
      ))}
      <Player {...zenoid.player} />
      <Ball {...zenoid.ball} />
    </box>
  )
}

export default Game
