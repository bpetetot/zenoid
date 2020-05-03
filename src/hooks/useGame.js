import { useState, useEffect, useRef } from 'react'
import useInterval from './useInterval'

import { initZenoid } from '../zenoid/store'

export const useGame = () => {
  const zenoid = useRef()
  const [currentGame, setCurrentGame] = useState()

  const initialize = () => {
    zenoid.current = initZenoid()
    setCurrentGame(zenoid.current.getState())
  }

  useEffect(() => initialize(), [])

  useInterval(() => {
    if (!zenoid.current && !currentGame) return
    zenoid.current.dispatch.game.update()
    setCurrentGame(zenoid.current.getState())
  }, 100)

  return {
    zenoid: currentGame,
    onMoveLeft: zenoid.current && zenoid.current.dispatch.player.moveLeft,
    onMoveRight: zenoid.current && zenoid.current.dispatch.player.moveRight,
    onStartNextLevel: zenoid.current && zenoid.current.dispatch.game.startNextLevel,
  }
}

export default useGame
