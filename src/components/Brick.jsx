import React, { memo } from 'react'

import * as brick from '../helpers/brick'

const Brick = ({ y, x, width, height, type, modifier }) => {
  return (
    <box
      top={y}
      left={x}
      width={width}
      height={height}
      style={{ bg: brick.getColor(type, modifier) }}
    />
  )
}

export default memo(Brick)
