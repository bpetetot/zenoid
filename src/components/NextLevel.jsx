import React, { memo } from 'react'

import useKeys from '../hooks/useKeys'
import Text from './Text'

const NextLevel = ({ startNextLevel }) => {
  const keysRef = useKeys({ space: startNextLevel })

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
        <Text fg="green" bold>
          LEVEL FINISHED, CONGRATS!
        </Text>
        {text.style('', { fg: 'green', bold: true })}
      </text>
      <text top="55%" left="center">
        <Text fg="grey">{'Press <space> to next level.'}</Text>
      </text>
    </box>
  )
}

export default memo(NextLevel)
