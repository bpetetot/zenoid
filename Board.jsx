import React from 'react'

const Board = ({ cols, rows, children }) => {
  return (
    <box
      left="center"
      top="center"
      width={cols + 2}
      height={rows + 2}
      border={{ type: 'line' }}
      style={{ border: { fg: 'cyan' } }}
    >
      {children}
    </box>
  )
}

export default Board
