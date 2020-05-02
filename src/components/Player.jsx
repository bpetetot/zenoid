import React from 'react'

const Player = ({ x, y, width, height, color = 'blue'}) => {
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

export default Player
