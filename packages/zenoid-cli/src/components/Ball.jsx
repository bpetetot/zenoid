import React, { memo } from 'react'

const Ball = ({ x = 0, y = 0, width = 1, height = 1 }) => {
  return (
    <box
      top={y}
      left={x}
      width={width}
      height={height}
      style={{ bg: 'white' }}
    />
  )
}

export default memo(Ball)
