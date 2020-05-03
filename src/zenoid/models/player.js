import * as direction from '../../helpers/direction'
import * as gameHelpers from './game'

const PLAYER_HEIGHT = 1
const PLAYER_WIDTH = 10
const PLAYER_VELOCITY = 2
export const PLAYER_WIDTH_LONG = 15
export const PLAYER_WIDTH_SHORT = 7

export default {
  state: {
    x: 0,
    y: 0,
    velocity: PLAYER_VELOCITY,
    dx: direction.STOP,
    width: PLAYER_WIDTH,
    height: PLAYER_HEIGHT,
  },
  reducers: {
    init: (state, level) => {
      state.x = Math.floor(level.cols / 2 - PLAYER_WIDTH / 2)
      state.y = level.rows - PLAYER_HEIGHT
      return state
    },
    move: (state, level) => {
      let shouldMove = false
      let currentDx = state.dx * PLAYER_VELOCITY
      while (!shouldMove && Math.abs(currentDx) !== 0) {
        const nextX = state.x + currentDx
        if (currentDx <= 0) {
          if (nextX >= 0) {
            shouldMove = true
          } else {
            currentDx++
          }
        } else if (currentDx >= 0) {
          if (nextX + state.width <= level.cols) {
            shouldMove = true
          } else {
            currentDx--
          }
        }
      }

      if (shouldMove) {
        state.x = state.x + currentDx
      }
      return state
    },
    setDirectionLeft: (state) => direction.setLeft(state),
    setDirectionRight: (state) => direction.setRight(state),
    stop: (state) => direction.setStopX(state),
    setWidth: (state, width) => {
      state.width = width
      return state
    },
  },
  effects: (dispatch) => ({
    moveLeft: (_payload, { game, player }) => {
      if (!isMovingLeft(player)) {
        if (game.status === gameHelpers.READY) {
          dispatch.game.setStatus(gameHelpers.PLAYING)
          dispatch.ball.moveLeft()
        }
        dispatch.player.setDirectionLeft()
      }
    },
    moveRight: (_payload, { game, player }) => {
      if (!isMovingRight(player)) {
        if (game.status === gameHelpers.READY) {
          dispatch.game.setStatus(gameHelpers.PLAYING)
          dispatch.ball.moveRight()
        }
        dispatch.player.setDirectionRight()
      }
    },
  }),
}

// helpers
const isMoving = (dx) => (state) => state.dx == dx

export const isMovingLeft = isMoving(direction.LEFT)
export const isMovingRight = isMoving(direction.RIGHT)
