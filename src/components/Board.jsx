import React, { memo } from 'react'

import useGame from '../hooks/useGame'

import Panel, { PANEL_WIDTH } from './Panel'
import Footer, { FOOTER_HEIGHT } from './Footer'
import GameOver from './GameOver'
import GameWon from './GameWon'
import NextLevel from './NextLevel'
import Game from './Game'

import * as board from '../helpers/board'
import * as game from '../helpers/game'

const Board = ({ onRestart }) => {
  const { currentGame, startNextLevel, ...keyHandlers } = useGame()

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
        {game.isLevelWon(currentGame) && <NextLevel startNextLevel={startNextLevel} />}
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
