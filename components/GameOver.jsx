import React, { memo, useLayoutEffect, useRef } from 'react'

import * as text from '../helpers/text'

const GameOver = ({ onRestart }) => {
  const box = useRef(null)

  useLayoutEffect(() => {
    box.current.key('space', onRestart)
    return () => box.current.unkey('space', onRestart)
  }, [onRestart])

  return (
    <box
      ref={box}
      focused
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
