import React, { memo } from 'react'

import useKeys from '../hooks/useKeys'
import * as text from '../helpers/text'

const GameOver = ({ onRestart }) => {
  const keysRef = useKeys({ space: onRestart })

  return (
    <box
      ref={keysRef}
      top="center"
      left="center"
      width="100%"
      height="100%"
      border={{ type: 'line' }}
      style={{ border: { fg: 'red' } }}
    >
      <text top="45%" left="center">
        {text.style('GAME OVER.', { fg: 'red', bold: true })}
      </text>
      <text top="55%" left="center">
        {text.style('Press <space> to play again.', { fg: 'grey' })}
      </text>
    </box>
  )
}

export default memo(GameOver)
