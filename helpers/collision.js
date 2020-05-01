import * as direction from './direction'

export const fromBottom = (ball, brick) => (
  ball.dy === direction.TOP &&
  ball.y === brick.y + brick.height
)

export const fromTop = (ball, brick) => (
  ball.dy === direction.BOTTOM &&
  ball.y + ball.height === brick.y
)

export const fromLeft = (ball, brick) => (
  ball.dx === direction.RIGHT &&
  ball.x + ball.width === brick.x
)

export const fromRight = (ball, brick) => (
  ball.dx === direction.LEFT &&
  ball.x === brick.x + brick.width
)

export const willCollide = box1 => box2 => {
  return (
    box1.x < box2.x + box2.width &&
    box1.x + box1.width > box2.x &&
    box1.y < box2.y + box2.height &&
    box1.y + box1.height > box2.y
  )
}

