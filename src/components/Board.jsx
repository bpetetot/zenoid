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

const Board = ({ goToSplashscreen }) => {
  const { zenoid, onReset, onStartNextLevel, ...keyHandlers } = useGame()

  
  if (!zenoid) return
  
  const boardWidth = zenoid.level.cols + 2
  const boardHeight = zenoid.level.rows + 2
  const { status } = zenoid.game
  const displayGame = status === 'READY' ||  status === 'PLAYING'

  return (
    <box
      left="center"
      top="center"
      width={boardWidth + PANEL_WIDTH}
      height={boardHeight + FOOTER_HEIGHT}
    >
      <box width={boardWidth} height={boardHeight}>
        {status === 'GAME_OVER' && <GameOver onRestart={goToSplashscreen} />}
        {status === 'GAME_WON' && <GameWon onRestart={goToSplashscreen} />}
        {status === 'NEXT_LEVEL' && (
          <NextLevel startNextLevel={onStartNextLevel} />
        )}
        {displayGame && <Game game={zenoid} {...keyHandlers} />}
      </box>
      <Panel
        top={0}
        left={boardWidth}
        width={PANEL_WIDTH}
        height={boardHeight}
        game={zenoid}
      />
      <Footer />
    </box>
  )
}

export default memo(Board)
