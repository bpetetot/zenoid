import { useState } from 'react'
import useInterval from './useInterval'

import * as game from '../helpers/game'
import * as ball from '../helpers/ball'
import * as player from '../helpers/player'
import * as actions from '../helpers/actions'
import * as brick from '../helpers/brick'
import * as board from '../helpers/board'
import * as collision from '../helpers/collision'

export const useGame = () => {
  const [currentGame, setCurrentGame] = useState(game.init())

  const updateGame = () => setCurrentGame(game.get())

  useInterval(() => {
    if (!game.isPlaying(currentGame)) {
      return
    }

    if (ball.willBumpTop(currentGame))
      game.dispatch(actions.SET_BALL_DIRECTION_BOTTOM)
    if (ball.willBumpLeft(currentGame))
      game.dispatch(actions.SET_BALL_DIRECTION_RIGHT)
    if (ball.willBumpRight(currentGame))
      game.dispatch(actions.SET_BALL_DIRECTION_LEFT)
    if (ball.willBumpBottom(currentGame)) {
      if (currentGame.lives === 0) {
        game.dispatch(actions.GAME_OVER)
      } else {
        game.dispatch(actions.LOSE_LIVE)
      }
    }

    if (ball.willBumpPlayer(currentGame)) {
      game.dispatch(actions.SET_BALL_DIRECTION_TOP)
      game.dispatch(actions.HIGHLIGHT_PLAYER_COLOR)
    } else {
      game.dispatch(actions.RESET_PLAYER_COLOR)
    }

    const brickCollide = ball.findBrickCollision(currentGame)
    if (brickCollide) {
      const { ball } = currentGame
      if (collision.fromBottom(ball, brickCollide)) {
        game.dispatch(actions.SET_BALL_DIRECTION_BOTTOM)
      }
      if (collision.fromTop(ball, brickCollide)) {
        game.dispatch(actions.SET_BALL_DIRECTION_TOP)
      }
      if (collision.fromLeft(ball, brickCollide)) {
        game.dispatch(actions.SET_BALL_DIRECTION_LEFT)
      }
      if (collision.fromRight(ball, brickCollide)) {
        game.dispatch(actions.SET_BALL_DIRECTION_RIGHT)
      }

      if (brick.isBreakable(brickCollide)) {
        game.dispatch(actions.killBrick(brickCollide.id))
        game.dispatch(actions.applyModifier(brickCollide.modifier))
        game.dispatch(actions.incrementScore(brickCollide.points))
      }
    }

    if (board.isFinished(currentGame.board)) {
      const nextLevel = currentGame.currentLevel + 1
      if (nextLevel <= currentGame.levelsCount) {
        game.dispatch(actions.LEVEL_WON)
      } else {
        game.dispatch(actions.GAME_WON)
      }
    }

    if (game.isPlaying(currentGame)) {
      game.dispatch(actions.MOVE_BALL)
      game.dispatch(actions.MOVE_PLAYER)
    }

    updateGame()
  }, currentGame.speed)

  const onMoveLeft = () => {
    if (!player.isMovingLeft(currentGame)) {
      if (game.isReady(currentGame)) {
        game.dispatch(actions.SET_BALL_DIRECTION_LEFT)
        game.dispatch(actions.PLAY_GAME)
      }
      game.dispatch(actions.SET_PLAYER_DIRECTION_LEFT)
      updateGame()
    }
  }

  const onMoveRight = () => {
    if (!player.isMovingRight(currentGame.player)) {
      if (game.isReady(currentGame)) {
        game.dispatch(actions.SET_BALL_DIRECTION_RIGHT)
        game.dispatch(actions.PLAY_GAME)
      } 
      game.dispatch(actions.SET_PLAYER_DIRECTION_RIGHT)
      updateGame()
    }
  }

  const onStart = () => {
    if (game.isReady(currentGame)) {
      game.dispatch(actions.PLAY_GAME)
      updateGame()
    }
  }

  const startNextLevel = () => {
    game.dispatch(actions.START_NEXT_LEVEL)
    updateGame()
  }

  return { currentGame, onMoveLeft, onMoveRight, onStart, startNextLevel }
}

export default useGame
