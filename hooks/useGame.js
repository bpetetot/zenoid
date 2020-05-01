import { useState } from 'react'
import useInterval from './useInterval'

import * as game from '../helpers/game'
import * as ball from '../helpers/ball'
import * as player from '../helpers/player'
import * as actions from '../helpers/actions'
import * as direction from '../helpers/direction'
import * as brick from '../helpers/brick'
import * as board from '../helpers/board'

export const useGame = (level) => {
  const [currentGame, setCurrentGame] = useState(game.init(level))

  useInterval(() => {
    const newGame = { ...currentGame }

    if (ball.willBumpTop(newGame))
      game.update(newGame, actions.SET_BALL_DIRECTION_BOTTOM)
    if (ball.willBumpLeft(newGame))
      game.update(newGame, actions.SET_BALL_DIRECTION_RIGHT)
    if (ball.willBumpRight(newGame))
      game.update(newGame, actions.SET_BALL_DIRECTION_LEFT)
    if (ball.willBumpBottom(newGame))
      game.update(newGame, actions.GAME_OVER)

    if (ball.willBumpPlayer(newGame)) {
      game.update(newGame, actions.SET_BALL_DIRECTION_TOP)
      game.update(newGame, actions.HIGHLIGHT_PLAYER_COLOR)
    } else {
      game.update(newGame, actions.RESET_PLAYER_COLOR)
    }

    const brickCollide = ball.findBrickCollision(newGame)
    if (brickCollide) {
      const { ball } = newGame
      if (
        ball.dy === direction.TOP &&
        ball.y === brickCollide.y + brickCollide.height
      ) {
        game.update(newGame, actions.SET_BALL_DIRECTION_BOTTOM)
      }
      if (
        ball.dy === direction.BOTTOM &&
        ball.y + ball.height === brickCollide.y
      ) {
        game.update(newGame, actions.SET_BALL_DIRECTION_TOP)
      }
      if (
        ball.dx === direction.RIGHT &&
        ball.x + ball.width === brickCollide.x
      ) {
        game.update(newGame, actions.SET_BALL_DIRECTION_LEFT)
      }
      if (
        ball.dx === direction.LEFT &&
        ball.x === brickCollide.x + brickCollide.width
      ) {
        game.update(newGame, actions.SET_BALL_DIRECTION_RIGHT)
      }

      if (brickCollide.type === brick.BREAKABLE) {
        game.update(newGame, {
          type: actions.KILL_BRICK,
          payload: brickCollide.id,
        })
        game.update(newGame, actions.INCREMENT_SCORE)
      }
    }

    if (board.isFinished(newGame.board)) {
      game.update(newGame, actions.GAME_WON)
    }

    if (game.isPlaying(newGame)) {
      game.update(newGame, actions.MOVE_BALL)
      game.update(newGame, actions.MOVE_PLAYER)
    }

    setCurrentGame(newGame)
  }, 50)

  const onKeyLeft = () => {
    const newGame = { ...currentGame }
    if (!player.isMovingLeft(newGame.player)) {
      if (game.isReady(newGame)) {
        game.update(newGame, actions.SET_BALL_DIRECTION_LEFT)
        game.update(newGame, actions.PLAY_GAME)
      }
      game.update(newGame, actions.SET_PLAYER_DIRECTION_LEFT)
      setCurrentGame(newGame)
    }
  }

  const onKeyRight = () => {
    const newGame = { ...currentGame }
    if (!player.isMovingRight(newGame.player)) {
      if (game.isReady(newGame)) {
        game.update(newGame, actions.SET_BALL_DIRECTION_RIGHT)
        game.update(newGame, actions.PLAY_GAME)
      } 
      game.update(newGame, actions.SET_PLAYER_DIRECTION_RIGHT)
      setCurrentGame(newGame)
    }
  }

  const onKeySpace = () => {
    const newGame = { ...currentGame }
    if (game.isReady(newGame)) {
      game.update(newGame, actions.PLAY_GAME)
      setCurrentGame(newGame)
    }
  }

  const reset = () => {
    setCurrentGame(game.init(level))
  }

  return { currentGame, onKeyLeft, onKeyRight, onKeySpace, reset }
}

export default useGame
