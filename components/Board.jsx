import React, { memo, useLayoutEffect, useRef } from 'react'

import level1 from '../levels/level1'
import useGame from '../hooks/useGame'

import Brick from './Brick.jsx'
import Player from './Player.jsx'
import Ball from './Ball.jsx'
import Panel, { PANEL_WIDTH } from './Panel'
import Footer, { FOOTER_HEIGHT } from './Footer'

import * as board from '../helpers/board'

const Board = ({ onGameOver }) => {
  const { game, onKeyLeft, onKeyRight, onKeySpace } = useGame(level1)
  const box = useRef(null)

  useLayoutEffect(() => {
    box.current.key('left', onKeyLeft)
    box.current.key('right', onKeyRight)
    box.current.key('space', onKeySpace)
    box.current.key('enter', onGameOver)

    return () => {
      box.current.unkey('left', onKeyLeft)
      box.current.unkey('right', onKeyRight)
      box.current.unkey('space', onKeySpace)
      box.current.unkey('enter', onGameOver)
    }
  }, [onKeyLeft, onKeyRight, onKeySpace, onGameOver])

  return (
    <box
      ref={box}
      focused
      left="center"
      top="center"
      width={game.board.cols + 2 + PANEL_WIDTH}
      height={game.board.rows + 2 + FOOTER_HEIGHT}
    >
      <box
        width={game.board.cols + 2}
        height={game.board.rows + 2}
        border={{ type: 'line' }}
        style={{ border: { fg: 'grey' } }}
      >
        {game.over || game.win ? (
          <box top="center" left="center" width="50%" height="50%">
            <text top="40%" left="center" width="80%">
              {game.over ? 'GAME OVER.' : 'YOU WIN!'}
            </text>
            <text top="50%" left="center" width="80%">
              {'Press <enter> to play again'}
            </text>
          </box>
        ) : (
          <>
            {board.getBricks(game.board).map((brick, i) => (
              <Brick key={i} {...brick} />
            ))}
            <Player {...game.player} />
            <Ball {...game.ball} />
          </>
        )}
      </box>
      <Panel
        top={0}
        left={game.board.cols + 2}
        width={PANEL_WIDTH}
        height={game.board.rows + 2}
        game={game}
      />
      <Footer />
    </box>
  )
}

export default memo(Board)
