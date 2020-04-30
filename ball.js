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

export const willBumpPlayer = (game) => {
  const left = game.player.x
  const right = game.player.x + game.player.width
  const top = game.board.rows - 1
  const bottom = game.board.rows

  return willCollideObject(game.ball, { left, right, top, bottom })
}

const willCollideObject = (ball, objectBBox) => {
  const ballLeft = ball.x
  const ballRight = ball.x + ball.width
  const ballTop = ball.y
  const ballBottom = ball.y + ball.height

  const newBallLeft = ballLeft + ball.dx
  const newBallRight = ballRight + ball.dx
  const newBallTop = ballTop + ball.dy
  const newBallBottom = ballBottom + ball.dy

  return (
    newBallRight > objectBBox.left &&
    newBallLeft < objectBBox.right &&
    newBallTop < objectBBox.bottom &&
    newBallBottom > objectBBox.top
  )
}

export const move = (ball) => ({
  ...ball,
  x: ball.x + ball.dx,
  y: ball.y + ball.dy,
})
