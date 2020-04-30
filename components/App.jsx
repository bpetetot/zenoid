import React, { useLayoutEffect } from 'react'
import blessed from 'neo-blessed'
import { createBlessedRenderer } from 'react-blessed'

import Board from './Board'
import level1 from '../levels/level1'
import useGame from '../hooks/useGame'

const render = createBlessedRenderer(blessed)

const screen = blessed.screen({
  title: 'Zenoid',
  smartCSR: false,
  debug: true,
})
screen.key(['escape', 'q', 'C-c'], () => process.exit(0))

const App = () => {
  const [game, onKeyLeft, onKeyRight] = useGame(level1)

  useLayoutEffect(() => {
    screen.key('left', onKeyLeft)
    screen.key('right', onKeyRight)
    return () => {
      screen.unkey('left', onKeyLeft)
      screen.unkey('right', onKeyRight)
    }
  }, [onKeyLeft, onKeyRight])

  return <Board {...game.board} player={game.player} ball={game.ball} />
}

render(<App />, screen)
