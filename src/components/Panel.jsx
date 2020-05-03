import React, { memo } from 'react'

import { getBricksRemaining } from '../zenoid/level/helpers'

import Text from './Text'

export const PANEL_WIDTH = 30

const Panel = ({ top, left, width, height, zenoid }) => {
  const bricksCount = getBricksRemaining(zenoid.level).length

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
        <Text fg="green" bold>
          {' ZENOID v0.1'}
        </Text>
      </box>
      <box top={4}>{` Level: ${zenoid.game.currentLevel}`}</box>
      <box top={6}>{` Lives: ${zenoid.game.lives}`}</box>
      <box top={8}>{` Score: ${zenoid.game.score}`}</box>
      <box top={10}>{` Bricks: ${bricksCount}`}</box>
      <box top={12}>{` Modifier: ${zenoid.modifier || '-'}`}</box>
    </box>
  )
}

export default memo(Panel)
