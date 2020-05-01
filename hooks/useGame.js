import { useState } from 'react'
import useInterval from './useInterval'

import * as game from '../helpers/game'
import * as ball from '../helpers/ball'
import * as player from '../helpers/player'
import * as actions from '../helpers/actions'
import * as brick from '../helpers/brick'
import * as board from '../helpers/board'
import * as collision from '../helpers/collision'

export const useGame = (level) => {
  const [currentGame, setCurrentGame] = useState(game.init())

  useInterval(() => {
    if (!game.isReady(currentGame) && !game.isPlaying(currentGame)) {
      return
    }

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
      if (collision.fromBottom(ball, brickCollide)) {
        game.update(newGame, actions.SET_BALL_DIRECTION_BOTTOM)
      }
      if (collision.fromTop(ball, brickCollide)) {
        game.update(newGame, actions.SET_BALL_DIRECTION_TOP)
      }
      if (collision.fromLeft(ball, brickCollide)) {
        game.update(newGame, actions.SET_BALL_DIRECTION_LEFT)
      }
      if (collision.fromRight(ball, brickCollide)) {
        game.update(newGame, actions.SET_BALL_DIRECTION_RIGHT)
      }

      if (brick.isBreakable(brickCollide)) {
        game.update(newGame, actions.killBrick(brickCollide.id))
        game.update(newGame, actions.incrementScore(brickCollide.points))
      }
    }

    if (board.isFinished(newGame.board)) {
      const nextLevel = newGame.currentLevel + 1
      if (nextLevel <= newGame.levelsCount) {
        game.update(newGame, actions.LEVEL_WON)
      } else {
        game.update(newGame, actions.GAME_WON)
      }
    }

    if (game.isPlaying(newGame)) {
      game.update(newGame, actions.MOVE_BALL)
      game.update(newGame, actions.MOVE_PLAYER)
    }

    setCurrentGame(newGame)
  }, 50)

  const onMoveLeft = () => {
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

  const onMoveRight = () => {
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

  const onStart = () => {
    const newGame = { ...currentGame }
    if (game.isReady(newGame)) {
      game.update(newGame, actions.PLAY_GAME)
      setCurrentGame(newGame)
    }
  }

  const startNextLevel = () => {
    const newGame = { ...currentGame }
    game.update(newGame, actions.START_NEXT_LEVEL)
    setCurrentGame(newGame)
  }

  return { currentGame, onMoveLeft, onMoveRight, onStart, startNextLevel }
}

export default useGame
