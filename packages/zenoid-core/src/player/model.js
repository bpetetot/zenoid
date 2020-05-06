import * as direction from '../direction'
import { isReady } from '../game/helpers'
import { PLAYER_WIDTH, PLAYER_HEIGHT, PLAYER_VELOCITY, PLAYER_VELOCITY_DASH } from './constants'
import { isMovingLeft, isMovingRight } from './helpers'

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
      state.dx = direction.STOP
      state.width = PLAYER_WIDTH
      state.height = PLAYER_HEIGHT
      return state
    },
    move: (state, level) => {
      let shouldMove = false
      let currentDx = state.dx * state.velocity
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
      state.velocity = PLAYER_VELOCITY
      return state
    },
    setDirectionLeft: (state) => direction.setLeft(state),
    setDirectionRight: (state) => direction.setRight(state),
    stop: (state) => direction.setStopX(state),
    setVelocity: (state, velocity) => {
      state.velocity = velocity
      return state
    },
    setWidth: (state, width) => {
      state.width = width
      return state
    },
  },
  effects: (dispatch) => ({
    moveLeft: (_payload, { game, player }) => {
      if (!isMovingLeft(player)) {
        if (isReady(game)) {
          dispatch.game.play()
          dispatch.ball.moveLeft()
        }
        dispatch.player.setDirectionLeft()
      }
    },
    moveRight: (_payload, { game, player }) => {
      if (!isMovingRight(player)) {
        if (isReady(game)) {
          dispatch.game.play()
          dispatch.ball.moveRight()
        }
        dispatch.player.setDirectionRight()
      }
    },
    dash: (_payload, { player }) => {
      if (isMovingRight(player) || isMovingLeft(player)) {
        dispatch.player.setVelocity(PLAYER_VELOCITY_DASH)
      }
    },
  }),
}
