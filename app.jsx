import React, { useEffect } from 'react'
import blessed from 'neo-blessed'
import { createBlessedRenderer } from 'react-blessed'

import Board from './Board.jsx'
import level1 from './levels/level1.js'
import { useGame, PLAYER_GO_LEFT, PLAYER_GO_RIGHT } from './useGame.js'

const render = createBlessedRenderer(blessed)

const screen = blessed.screen({
  title: 'Zenoid',
  smartCSR: false,
  debug: true,
})
screen.key(['escape', 'q', 'C-c'], () => process.exit(0))

const App = () => {
  const [game, dispatch] = useGame(level1)

  useEffect(() => {
    screen.key(['left'], () => dispatch(PLAYER_GO_LEFT))
    screen.key(['right'], () => dispatch(PLAYER_GO_RIGHT))
  }, [])

  return <Board {...game.board} player={game.player} />
}

render(<App />, screen)
