import React, { useLayoutEffect } from 'react'
import blessed from 'neo-blessed'
import { createBlessedRenderer } from 'react-blessed'

import Board from './Board.jsx'
import level1 from './levels/level1.js'
import {
  useGame,
  SET_PLAYER_DIRECTION_LEFT,
  SET_PLAYER_DIRECTION_RIGHT,
} from './useGame.js'
import { playerMovingRight, playerMovingLeft } from './movePlayer.js'

const render = createBlessedRenderer(blessed)

const screen = blessed.screen({
  title: 'Zenoid',
  smartCSR: false,
  debug: true,
})
screen.key(['escape', 'q', 'C-c'], () => process.exit(0))

const App = () => {
  const [game, dispatch] = useGame(level1)

  useLayoutEffect(() => {
    const setPlayerDirectionLeft = () => {
      if (!playerMovingLeft(game.player)) {
        dispatch(SET_PLAYER_DIRECTION_LEFT)
      }
    }
    const setPlayerDirectionRight = () => {
      if (!playerMovingRight(game.player)) {
        dispatch(SET_PLAYER_DIRECTION_RIGHT)
      }
    }

    screen.key('left', setPlayerDirectionLeft)
    screen.key('right', setPlayerDirectionRight)

    return () => {
      screen.unkey('left', setPlayerDirectionLeft)
      screen.unkey('right', setPlayerDirectionRight)
    }
  }, [game.player, dispatch])

  return <Board {...game.board} player={game.player} ball={game.ball} />
}

render(<App />, screen)
