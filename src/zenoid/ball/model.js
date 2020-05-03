import * as direction from '../direction'
import * as collision from '../collision'
import { isBreakable } from '../level/helpers'

import { BALL_WIDTH, BALL_HEIGHT } from './constants'
import * as helpers from './helpers'

export default {
  state: {
    x: 0,
    y: 0,
    dx: direction.RIGHT,
    dy: direction.TOP,
    width: BALL_WIDTH,
    height: BALL_HEIGHT,
  },
  reducers: {
    init: (state, level) => {
      state.x = Math.floor(level.cols / 2 - BALL_WIDTH / 2)
      state.y = level.rows - BALL_HEIGHT - 1
      state.dx = direction.RIGHT
      state.dy = direction.TOP
      return state
    },
    move: (state) => {
      state.x = state.x + state.dx
      state.y = state.y + state.dy
    },
    moveLeft: (state) => direction.setLeft(state),
    moveRight: (state) => direction.setRight(state),
    moveTop: (state) => direction.setTop(state),
    moveBottom: (state) => direction.setBottom(state),
    moveToPlayer: (state, player) => {
      state.x = player.x + Math.floor(player.width / 2 - BALL_WIDTH / 2)
      state.y = player.y - BALL_HEIGHT
      state.dy = direction.TOP
      return state
    },
  },
  effects: (dispatch) => ({
    update: (_payload, { ball, level, player }) => {
      if (helpers.floorIsLava(ball, level)) {
        dispatch.game.die()
      }

      if (helpers.willBumpEdgeTop(ball, level)) {
        dispatch.ball.moveBottom()
      }

      if (helpers.willBumpEdgeLeft(ball, level)) {
        dispatch.ball.moveRight()
      } else if (helpers.willBumpEdgeRight(ball, level)) {
        dispatch.ball.moveLeft()
      }

      if (helpers.willBumpPlayer(ball, player)) {
        dispatch.ball.moveTop()
      }

      const brick = helpers.findBrickCollision(ball, level)
      if (brick) {
        if (collision.fromBottom(ball, brick)) {
          dispatch.ball.moveBottom()
        } else if (collision.fromTop(ball, brick)) {
          dispatch.ball.moveTop()
        }

        if (collision.fromLeft(ball, brick)) {
          dispatch.ball.moveLeft()
        } else if (collision.fromRight(ball, brick)) {
          dispatch.ball.moveRight()
        }

        if (isBreakable(brick)) {
          dispatch.level.killBrick(brick.id)

          dispatch.modifier.apply(brick.modifier)

          dispatch.game.incrementScore(brick.points)
        }
      }
    },
  }),
}
