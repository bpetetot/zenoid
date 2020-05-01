import React, { memo, useLayoutEffect, useRef } from 'react'

import level from '../levels/level0'
import useGame from '../hooks/useGame'

import Panel, { PANEL_WIDTH } from './Panel'
import Footer, { FOOTER_HEIGHT } from './Footer'
import GameOver from './GameOver'
import GameWon from './GameWon'
import Game from './Game'

import * as board from '../helpers/board'
import * as game from '../helpers/game'

const Board = ({ onRestart }) => {
  const { currentGame, onKeyLeft, onKeyRight, onKeySpace } = useGame(level)
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

  const boardWidth = board.getWidth(currentGame.board)
  const boardHeight = board.getHeight(currentGame.board)

  const displayGame = game.isReady(currentGame) || game.isPlaying(currentGame)

  return (
    <box
      ref={box}
      left="center"
      top="center"
      width={boardWidth + PANEL_WIDTH}
      height={boardHeight + FOOTER_HEIGHT}
      focused={displayGame}
    >
      <box
        width={boardWidth}
        height={boardHeight}
        border={{ type: 'line' }}
        style={{ border: { fg: 'grey' } }}
      >
        {game.isOver(currentGame) && <GameOver onRestart={onRestart} />}
        {game.isWon(currentGame) && <GameWon onRestart={onRestart} />}
        {displayGame && <Game game={currentGame} />}
      </box>
      <Panel
        top={0}
        left={boardWidth}
        width={PANEL_WIDTH}
        height={boardHeight}
        game={currentGame}
      />
      <Footer />
    </box>
  )
}

export default memo(Board)
