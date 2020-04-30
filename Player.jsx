import React from 'react'

const Player = ({ x = '50%-4', width = 8, color = 'blue'}) => {
  return (
    <box
      bottom={0}
      left={x}
      width={width}
      height={1}
      style={{ bg: color }}
    />
  )
}

export default Player
