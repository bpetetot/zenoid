import { useState, useEffect, useRef } from 'react'
import useInterval from './useInterval'

import { initZenoid } from '../zenoid/store'

export const useGame = () => {
  const ref = useRef()
  const [zenoid, setZenoid] = useState()

  const initialize = () => {
    ref.current = initZenoid()
    setZenoid(ref.current.getState())
  }

  const gameSpeed = zenoid ? zenoid.game.speed : 100

  useEffect(() => initialize(), [])

  useInterval(() => {
    if (!ref.current && !zenoid) return
    ref.current.dispatch.game.update()
    setZenoid(ref.current.getState())
  }, gameSpeed)

  return {
    zenoid: zenoid,
    onMoveLeft: ref.current && ref.current.dispatch.player.moveLeft,
    onMoveRight: ref.current && ref.current.dispatch.player.moveRight,
    onStartNextLevel: ref.current && ref.current.dispatch.game.startNextLevel,
  }
}

export default useGame
