import { willCollide } from '../collision'
import { getBricks } from '../level/helpers'

const getBBox = (ball) => ({
  x: ball.x + ball.dx,
  y: ball.y + ball.dy,
  width: ball.width,
  height: ball.height,
})

export const willBumpEdgeTop = (ball) => ball.y + ball.dy < 0

export const floorIsLava = (ball, level) => ball.y + ball.height > level.rows

export const willBumpEdgeLeft = (ball) => ball.x + ball.dx < 0

export const willBumpEdgeRight = (ball, level) =>
  ball.x + ball.dx + ball.width > level.cols

export const willBumpPlayer = (ball, player) => {
  const willCollideWithBall = willCollide(getBBox(ball))
  return willCollideWithBall(player)
}

export const findBrickCollision = (ball, level) => {
  const ballBBox = getBBox(ball)
  const willCollideWithBall = willCollide(ballBBox)
  return getBricks(level).find(willCollideWithBall)
}
