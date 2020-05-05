import * as direction from '../direction'
import * as collision from '../collision'
import { isBreakable, getBricks } from '../level/helpers'

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

      let { dx, dy } = ball

      if (helpers.touchEdgeLeft(ball, level)) {
        dx = direction.RIGHT
      } else if (helpers.touchEdgeRight(ball, level)) {
        dx = direction.LEFT
      }
      if (helpers.touchEdgeTop(ball, level)) {
        dy = direction.BOTTOM
      }
      if (helpers.touchPlayer(ball, player)) {
        dy = direction.TOP
      }

      const brick = helpers.findNextTouchingBrick(ball, getBricks(level))

      if (brick) {
        if (dx === direction.RIGHT && collision.touchLeft(ball, brick)) {
          dx = direction.LEFT
        } else if (dx === direction.LEFT && collision.touchRight(ball, brick)) {
          dx = direction.RIGHT
        }

        if (dy === direction.BOTTOM && collision.touchTop(ball, brick)) {
          dy = direction.TOP
        } else if (dy === direction.TOP && collision.touchBottom(ball, brick)) {
          dy = direction.BOTTOM
        }

        if (isBreakable(brick)) {
          dispatch.level.killBrick(brick.id)
          dispatch.modifier.apply(brick.modifier)
          dispatch.game.incrementScore(brick.points)
        }
      }

      if (dx === direction.RIGHT) dispatch.ball.moveRight()
      if (dx === direction.LEFT) dispatch.ball.moveLeft()
      if (dy === direction.BOTTOM) dispatch.ball.moveBottom()
      if (dy === direction.TOP) dispatch.ball.moveTop()
    },
  }),
}
