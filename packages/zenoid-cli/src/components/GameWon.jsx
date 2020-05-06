import React, { memo } from 'react'

import useKeys from '../hooks/useKeys'
import Text from './Text'

const GameWon = ({ onRestart }) => {
  const keysRef = useKeys({ space: onRestart })

  return (
    <box
      ref={keysRef}
      top="center"
      left="center"
      width="100%"
      height="100%"
      border={{ type: 'line' }}
      style={{ border: { fg: 'green' } }}
    >
      <text top="45%" left="center">
        <Text fg="green" bold>YOU WIN.</Text>
      </text>
      <text top="55%" left="center">
        <Text fg="grey">{'Press <space> to play again.'}</Text>
      </text>
    </box>
  )
}

export default memo(GameWon)
