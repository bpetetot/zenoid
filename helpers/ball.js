import * as actions from './actions'
import * as direction from './direction'

const BALL_HEIGHT = 1
const BALL_WIDTH = 2
const BALL_SPEED = 100

export const init = (board) => ({
  speed: BALL_SPEED,
  x: Math.floor(board.cols / 2),
  y: Math.floor(board.rows / 2),
  dx: direction.RIGHT,
  dy: direction.BOTTOM,
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

export const willBumpPlayer = ({ player, ball }) => {
  const playerBBox = {
    x: player.x,
    y: player.y,
    width: player.width,
    height: player.height,
  }

  const ballBBox = {
    x: ball.x + ball.dx,
    y: ball.y + ball.dy,
    width: ball.width,
    height: ball.height,
  }

  return willCollideObject(playerBBox, ballBBox)
}

const willCollideObject = (box1, box2) => {
  return (
    box1.x < box2.x + box2.width &&
    box1.x + box1.width > box2.x &&
    box1.y < box2.y + box2.height &&
    box1.y + box1.height > box2.y
  )
}

export const move = (ball) => ({
  ...ball,
  x: ball.x + ball.dx,
  y: ball.y + ball.dy,
})

export const reducer = (state, action) => {
  switch (action) {
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
