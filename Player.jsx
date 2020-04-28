import React from 'react'

const Player = ({ left = '50%-4', width = 8}) => {
  return (
    <box
      bottom={0}
      left={left}
      width={width}
      height={1}
      style={{ bg: 'red' }}
    />
  )
}

export default Player
