import React, { memo } from 'react'

import useZenoid from '../hooks/useZenoid'

import { game }  from '@zenoid/core'

import Panel, { PANEL_WIDTH } from './Panel'
import Footer, { FOOTER_HEIGHT } from './Footer'
import GameOver from './GameOver'
import GameWon from './GameWon'
import NextLevel from './NextLevel'
import Game from './Game'

const Board = ({ goToSplashscreen }) => {
  const { zenoid, onReset, onStartNextLevel, ...keyHandlers } = useZenoid()
  
  if (!zenoid) return
  
  const boardWidth = zenoid.level.cols + 2
  const boardHeight = zenoid.level.rows + 2
  const displayGame = game.isReady(zenoid.game) || game.isPlaying(zenoid.game)

  return (
    <box
      left="center"
      top="center"
      width={boardWidth + PANEL_WIDTH}
      height={boardHeight + FOOTER_HEIGHT}
    >
      <box width={boardWidth} height={boardHeight}>
        {game.isGameOver(zenoid.game) && <GameOver onRestart={goToSplashscreen} />}
        {game.isGameWon(zenoid.game) && <GameWon onRestart={goToSplashscreen} />}
        {game.isNextLevel(zenoid.game) && <NextLevel startNextLevel={onStartNextLevel} />}
        {displayGame && <Game zenoid={zenoid} {...keyHandlers} />}
      </box>
      <Panel
        top={0}
        left={boardWidth}
        width={PANEL_WIDTH}
        height={boardHeight}
        zenoid={zenoid}
      />
      <Footer />
    </box>
  )
}

export default memo(Board)
