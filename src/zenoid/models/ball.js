import * as direction from '../../helpers/direction'
import * as collision from '../../helpers/collision'
import * as levelHelpers from './level'

const BALL_HEIGHT = 1
const BALL_WIDTH = 2

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
      state.x = player.x + Math.floor((player.width / 2) - (BALL_WIDTH / 2))
      state.y = player.y - BALL_HEIGHT
      state.dy = direction.TOP
      return state
    }
  },
  effects: (dispatch) => ({
    update: (payload, { ball, level, player, game }) => {
      if (willBumpEdgeTop(ball, level)) {
        dispatch.ball.moveBottom()
      } else if (willBumpEdgeBottom(ball, level)) {
        dispatch.game.lose()
      }

      if (willBumpEdgeLeft(ball, level)) {
        dispatch.ball.moveRight()
      } else if (willBumpEdgeRight(ball, level)) {
        dispatch.ball.moveLeft()
      }

      if (willBumpPlayer(ball, player)) {
        dispatch.ball.moveTop()
      }

      const brick = findBrickCollision(ball, level)
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

        if (levelHelpers.isBreakable(brick)) {
          dispatch.level.killBrick(brick.id)
          // dispatch(actions.applyModifier(brick.modifier))
          dispatch.game.incrementScore(brick.points)
        }
      }
    }
  }),
}

// helpers
const willBumpEdgeTop = (ball) => ball.y + ball.dy < 0

const willBumpEdgeBottom = (ball, level) => ball.y + ball.dy + ball.height > level.rows

const willBumpEdgeLeft = (ball) => ball.x + ball.dx < 0

const willBumpEdgeRight = (ball, level) => ball.x + ball.dx + ball.width > level.cols

const getBBox = ball => ({
  x: ball.x + ball.dx,
  y: ball.y + ball.dy,
  width: ball.width,
  height: ball.height,
})

const willBumpPlayer = (ball, player) => {
  const willCollideWithBall = collision.willCollide(getBBox(ball))
  return willCollideWithBall(player)
}

const findBrickCollision = (ball, level) => {
  const ballBBox = getBBox(ball)
  const willCollideWithBall = collision.willCollide(ballBBox)
  return levelHelpers.getBricks(level).find(willCollideWithBall)
}
