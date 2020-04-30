import React, { memo } from 'react'

const Brick = ({ top = 0, left = 0, width = 6, height = 1 }) => {
  return (
    <box
      top={top}
      left={left}
      width={width}
      height={height}
      style={{ bg: 'yellow' }}
    />
  )
}

export default memo(Brick)
