import { useState } from 'react'
import useInterval from './useInterval'

import * as game from '../helpers/game'
import * as ball from '../helpers/ball'
import * as player from '../helpers/player'
import * as actions from '../helpers/actions'

export const useGame = (board) => {
  const [currentGame, setCurrentGame] = useState(game.init(board))

  useInterval(() => {
    const newGame = {...currentGame}
  
    if (ball.willBumpTop(newGame)) game.update(newGame, actions.SET_BALL_DIRECTION_BOTTOM)
    if (ball.willBumpBottom(newGame)) game.update(newGame, actions.SET_BALL_DIRECTION_TOP)
    if (ball.willBumpLeft(newGame)) game.update(newGame, actions.SET_BALL_DIRECTION_RIGHT)
    if (ball.willBumpRight(newGame)) game.update(newGame, actions.SET_BALL_DIRECTION_LEFT)

    if (ball.willBumpPlayer(newGame)) {
      game.update(newGame, actions.SET_BALL_DIRECTION_TOP)
      game.update(newGame, actions.HIGHLIGHT_PLAYER_COLOR)
    } else {
      game.update(newGame, actions.RESET_PLAYER_COLOR)
    }

    const brickCollide = ball.findBrickCollision(newGame)
    if (brickCollide) {
      brickCollide.color = 'red'
    }

    game.update(newGame, actions.MOVE_BALL)
    game.update(newGame, actions.MOVE_PLAYER)
  
    setCurrentGame(newGame)
  }, 30)

  const onKeyLeft = () => {
    const newGame = {...currentGame}
    if (!player.isMovingLeft(newGame.player)) {
      game.update(newGame, actions.SET_PLAYER_DIRECTION_LEFT)
      setCurrentGame(newGame)
    }
  }

  const onKeyRight =() => {
    const newGame = {...currentGame}
    if (!player.isMovingRight(newGame.player)) {
      game.update(newGame, actions.SET_PLAYER_DIRECTION_RIGHT)
      setCurrentGame(newGame)
    }
  }

  return [currentGame, onKeyLeft, onKeyRight]
}

export default useGame
