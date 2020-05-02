import * as actions from './actions'
import * as direction from './direction'
import * as board from './board'
import * as collision from './collision'

const BALL_HEIGHT = 1
const BALL_WIDTH = 2
const BALL_SPEED = 100

export const init = (player) => ({
  speed: BALL_SPEED,
  x: player.x + Math.floor((player.width / 2) - (BALL_WIDTH / 2)),
  y: player.y - BALL_HEIGHT,
  dx: direction.RIGHT,
  dy: direction.TOP,
  width: BALL_WIDTH,
  height: BALL_HEIGHT,
})

export const willBumpTop = (game) => {
  return game.ball.y + game.ball.dy < 0
}

export const willBumpBottom = (game) => {
  return game.ball.y + game.ball.dy + game.ball.height > game.board.rows
}

export const willBumpLeft = (game) => {
  return game.ball.x + game.ball.dx < 0
}

export const willBumpRight = (game) => {
  return game.ball.x + game.ball.dx + game.ball.width > game.board.cols
}

const getBBox = ball => ({
  x: ball.x + ball.dx,
  y: ball.y + ball.dy,
  width: ball.width,
  height: ball.height,
})

export const willBumpPlayer = ({ player, ball }) => {
  const playerBBox = {
    x: player.x,
    y: player.y,
    width: player.width,
    height: player.height,
  }
  const willCollideWithBall = collision.willCollide(getBBox(ball))

  return willCollideWithBall(playerBBox)
}

export const findBrickCollision = (game) => {
  const ballBBox = getBBox(game.ball)
  const willCollideWithBall = collision.willCollide(ballBBox)

  return board.getBricks(game.board).find(willCollideWithBall)
}

export const move = (ball) => ({
  ...ball,
  x: ball.x + ball.dx,
  y: ball.y + ball.dy,
})

export const reducer = (state, { type }) => {
  switch (type) {
    case actions.MOVE_BALL:
      return move(state.ball)
    case actions.SET_BALL_DIRECTION_BOTTOM:
      return direction.setBottom(state.ball)
    case actions.SET_BALL_DIRECTION_TOP:
      return direction.setTop(state.ball)
    case actions.SET_BALL_DIRECTION_LEFT:
      return direction.setLeft(state.ball)
    case actions.SET_BALL_DIRECTION_RIGHT:
      return direction.setRight(state.ball)
    default:
      return state.ball
  }
}
