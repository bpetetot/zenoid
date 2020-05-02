import React, { memo } from 'react'

import * as brick from '../helpers/brick'

const Brick = ({ y, x, width, height, type }) => {
  return (
    <box
      top={y}
      left={x}
      width={width}
      height={height}
      style={{ bg: brick.getColor(type) }}
    />
  )
}

export default memo(Brick)
