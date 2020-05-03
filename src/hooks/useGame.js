import { useState } from 'react'
import useInterval from './useInterval'

import * as game from '../helpers/game'

export const useGame = () => {
  const [currentGame, setCurrentGame] = useState(game.get())

  useInterval(() => {
    const updatedGame = game.update()
    setCurrentGame(updatedGame)
  }, currentGame.speed)

  return { 
    currentGame,
    onMoveLeft: game.moveLeft,
    onMoveRight: game.moveRight,
    onStart: game.start,
    onReset: game.reset,
    onStartNextLevel: game.startNextLevel,
  }
}

export default useGame
