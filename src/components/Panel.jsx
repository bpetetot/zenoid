import React, { memo } from 'react'

import * as text from '../helpers/text'
import * as levelHelpers from '../zenoid/models/level'

export const PANEL_WIDTH = 30

const Panel = ({ top, left, width, height, game: zenoid }) => {
  const bricksCount = levelHelpers.getBricksRemaining(zenoid.level).length

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
        {text.style(` Level: ${zenoid.game.currentLevel}`)}
      </box>
      <box top={6}>
        {text.style(` Lives: ${zenoid.game.lives}`)}
      </box>
      <box top={8}>
        {text.style(` Score: ${zenoid.game.score}`)}
      </box>
      <box top={10}>
        {text.style(` Bricks: ${bricksCount}`)}
      </box>
      <box top={12}>
        {text.style(` Modifier: ${zenoid.modifier || '-'}`)}
      </box>
    </box>
  )
}

export default memo(Panel)
