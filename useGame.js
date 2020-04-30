import { useReducer, useMemo } from 'react'
import useInterval from './useInterval'

import * as direction from './direction'
import * as ball from './ball'
import * as player from './player'

export const MOVE_PLAYER = 'MOVE_PLAYER'
export const SET_PLAYER_DIRECTION_LEFT = 'SET_PLAYER_DIRECTION_LEFT'
export const SET_PLAYER_DIRECTION_RIGHT = 'SET_PLAYER_DIRECTION_RIGHT'
export const MOVE_BALL = 'MOVE_BALL'
export const SET_BALL_DIRECTION_BOTTOM = 'SET_BALL_DIRECTION_BOTTOM'
export const SET_BALL_DIRECTION_TOP = 'SET_BALL_DIRECTION_TOP'
export const SET_BALL_DIRECTION_LEFT = 'SET_BALL_DIRECTION_LEFT'
export const SET_BALL_DIRECTION_RIGHT = 'SET_BALL_DIRECTION_RIGHT'
export const HIGHLIGHT_PLAYER_COLOR = 'HIGHLIGHT_PLAYER_COLOR'
export const RESET_PLAYER_COLOR = 'RESET_PLAYER_COLOR'

const gameReducer = (state, action) => {
  switch (action) {
    case SET_PLAYER_DIRECTION_LEFT:
      return {
        ...state,
        player: direction.setLeft(state.player),
      }
    case SET_PLAYER_DIRECTION_RIGHT:
      return {
        ...state,
        player: direction.setRight(state.player),
      }
    case MOVE_PLAYER:
      return {
        ...state,
        player: player.move(state.player, state.board),
      }
    case MOVE_BALL:
      return {
        ...state,
        ball: ball.move(state.ball),
      }
    case SET_BALL_DIRECTION_BOTTOM:
      return {
        ...state,
        ball: direction.setBottom(state.ball),
      }
    case SET_BALL_DIRECTION_TOP:
      return {
        ...state,
        ball: direction.setTop(state.ball),
      }
    case SET_BALL_DIRECTION_LEFT:
      return {
        ...state,
        ball: direction.setLeft(state.ball),
      }
    case SET_BALL_DIRECTION_RIGHT:
      return {
        ...state,
        ball: direction.setRight(state.ball),
      }
    case HIGHLIGHT_PLAYER_COLOR:
      return {
        ...state,
        player: player.highlightColor(state.player),
      }
    case RESET_PLAYER_COLOR:
      return {
        ...state,
        player: player.defaultColor(state.player),
      }
    default:
      return state
  }
}

const getPlayerX = (level) => Math.floor(level.cols / 2 - level.playerWidth / 2)

export const useGame = (level) => {
  const { cols, rows, bricks, playerWidth } = level

  const initialState = useMemo(() => ({
    board: {
      cols,
      rows,
      bricks,
    },
    player: {
      x: getPlayerX(level),
      dx: 0,
      width: playerWidth,
    },
    ball: {
      speed: 100,
      x: Math.floor(cols / 2),
      y: Math.floor(rows / 2),
      dx: 1,
      dy: -1,
      width: 1,
      height: 1,
    },
  }))

  const [game, dispatch] = useReducer(gameReducer, initialState)

  useInterval(() => {
    if (ball.willBumpTop(game)) dispatch(SET_BALL_DIRECTION_BOTTOM)
    if (ball.willBumpBottom(game)) dispatch(SET_BALL_DIRECTION_TOP)
    if (ball.willBumpLeft(game)) dispatch(SET_BALL_DIRECTION_RIGHT)
    if (ball.willBumpRight(game)) dispatch(SET_BALL_DIRECTION_LEFT)
    if (ball.willBumpPlayer(game)) {
      dispatch(SET_BALL_DIRECTION_TOP)
      dispatch(HIGHLIGHT_PLAYER_COLOR)
    } else {
      dispatch(RESET_PLAYER_COLOR)
    }

    dispatch(MOVE_BALL)
    dispatch(MOVE_PLAYER)
  }, 40)

  return [game, dispatch]
}
