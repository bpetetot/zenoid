import { useState, useEffect, useRef } from 'react'
import useInterval from './useInterval'

import { initZenoid } from '../zenoid/store'

export const useGame = () => {
  const zenoid = useRef()
  const [currentZenoid, setCurrentZenoid] = useState()

  const initialize = () => {
    zenoid.current = initZenoid()
    setCurrentZenoid(zenoid.current.getState())
  }

  const gameSpeed = currentZenoid ? currentZenoid.game.speed : 100

  useEffect(() => initialize(), [])

  useInterval(() => {
    if (!zenoid.current && !currentZenoid) return
    zenoid.current.dispatch.game.update()
    setCurrentZenoid(zenoid.current.getState())
  }, gameSpeed)

  return {
    zenoid: currentZenoid,
    onMoveLeft: zenoid.current && zenoid.current.dispatch.player.moveLeft,
    onMoveRight: zenoid.current && zenoid.current.dispatch.player.moveRight,
    onStartNextLevel: zenoid.current && zenoid.current.dispatch.game.startNextLevel,
  }
}

export default useGame
