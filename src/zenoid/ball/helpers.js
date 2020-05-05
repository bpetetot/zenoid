import { touchBox } from '../collision'

export const floorIsLava = (ball, level) => ball.y + ball.height > level.rows

export const touchEdgeTop = (ball) => ball.y <= 0

export const touchEdgeLeft = (ball) => ball.x <= 0

export const touchEdgeRight = (ball, level) => ball.x + ball.width >= level.cols

export const touchPlayer = (ball, player) => {
  const touchPlayer = touchBox(player)
  return touchPlayer(ball)
}

export const findNextTouchingBrick = (ball, bricks) => {
  const touchBall = touchBox(ball)
  return bricks.find(touchBall)
}

