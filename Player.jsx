import React from 'react'

const Player = ({ x = '50%-4', width = 8}) => {
  return (
    <box
      bottom={0}
      left={x}
      width={width}
      height={1}
      style={{ bg: 'red' }}
    />
  )
}

export default Player
