import React, { useEffect, useState } from 'react'
import blessed from 'neo-blessed'
import { createBlessedRenderer } from 'react-blessed'

import Board from './Board.jsx'
import level1 from './levels/level1.js'

const render = createBlessedRenderer(blessed)

const screen = blessed.screen({
  title: 'Zenoid',
  smartCSR: false,
  debug: true,
})
screen.key(['escape', 'q', 'C-c'], () => process.exit(0))

const App = () => {
  const [playerX, setPlayerX] = useState(0)

  const movePlayer = (dx) => {
    setPlayerX((x) => {
      const { cols, playerWidth } = level1
      const nextX = x + dx
      if ((dx < 0 && nextX >= 0) || (dx > 0 && nextX + playerWidth <= cols)) {
        return nextX
      }
      return x
    })
  }

  useEffect(() => {
    screen.key(['left'], () => movePlayer(-1))
    screen.key(['right'], () => movePlayer(1))
  }, [])

  return <Board map={level1} playerX={playerX} />
}

render(<App />, screen)
