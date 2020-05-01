import React, { memo } from 'react'

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
  const { currentGame, ...keyHandlers } = useGame(level)

  const boardWidth = board.getWidth(currentGame.board)
  const boardHeight = board.getHeight(currentGame.board)

  const displayGame = game.isReady(currentGame) || game.isPlaying(currentGame)

  return (
    <box
      left="center"
      top="center"
      width={boardWidth + PANEL_WIDTH}
      height={boardHeight + FOOTER_HEIGHT}
    >
      <box width={boardWidth} height={boardHeight}>
        {game.isOver(currentGame) && <GameOver onRestart={onRestart} />}
        {game.isWon(currentGame) && <GameWon onRestart={onRestart} />}
        {displayGame && <Game game={currentGame} {...keyHandlers} />}
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
