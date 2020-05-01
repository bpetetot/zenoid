import React, { memo } from 'react'

import * as text from '../helpers/text'
import * as board from '../helpers/board'

export const PANEL_WIDTH = 30

const Panel = ({ top, left, width, height, game }) => {
  const bricksRemainingCount = board.getBricksRemaining(game.board).length

  return (
    <box
      top={top}
      left={left}
      width={width}
      height={height}
      border={{ type: 'line' }}
      style={{ border: { fg: 'grey' } }}
    >
      <box top={1} left="center">
        {text.style(` ZENOID v0.1`, { bold: true, fg: 'green' })}
      </box>
      <box top={4}>
        {text.style(` Level: -`)}
      </box>
      <box top={6}>
        {text.style(` Lives: -`)}
      </box>
      <box top={8}>
        {text.style(` Score: -`)}
      </box>
      <box top={10}>
        {text.style(` Bricks: ${bricksRemainingCount}`)}
      </box>
      <box top={12}>
        {text.style(` Modifier: -`)}
      </box>
    </box>
  )
}

export default memo(Panel)
