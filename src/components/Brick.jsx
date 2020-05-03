import React, { memo } from 'react'

const Brick = ({ y, x, width, height, color }) => {
  return (
    <box
      top={y}
      left={x}
      width={width}
      height={height}
      style={{ bg: color }}
    />
  )
}

export default memo(Brick)
