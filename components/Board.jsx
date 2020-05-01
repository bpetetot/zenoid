import React, { memo, useLayoutEffect, useRef } from 'react'

import level from '../levels/level0'
import useGame from '../hooks/useGame'

import Brick from './Brick.jsx'
import Player from './Player.jsx'
import Ball from './Ball.jsx'
import Panel, { PANEL_WIDTH } from './Panel'
import Footer, { FOOTER_HEIGHT } from './Footer'
import GameOver from './GameOver'
import Win from './Win'

import * as board from '../helpers/board'

const Board = ({ onRestart }) => {
  const { game, onKeyLeft, onKeyRight, onKeySpace } = useGame(level)
  const box = useRef(null)

  useLayoutEffect(() => {
    if (!box.current) return
    box.current.key('left', onKeyLeft)
    box.current.key('right', onKeyRight)
    box.current.key('space', onKeySpace)

    return () => {
      if (!box.current) return
      box.current.unkey('left', onKeyLeft)
      box.current.unkey('right', onKeyRight)
      box.current.unkey('space', onKeySpace)
    }
  }, [onKeyLeft, onKeyRight, onKeySpace])

  return (
    <box
      ref={box}
      left="center"
      top="center"
      width={game.board.cols + 2 + PANEL_WIDTH}
      height={game.board.rows + 2 + FOOTER_HEIGHT}
      focused={!game.over && !game.win}
    >
      <box
        width={game.board.cols + 2}
        height={game.board.rows + 2}
        border={{ type: 'line' }}
        style={{ border: { fg: 'grey' } }}
      >
        {game.over && <GameOver onRestart={onRestart} />}
        {game.win && <Win onRestart={onRestart} />}
        {!game.over && !game.win && (
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
