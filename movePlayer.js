const LEFT_DIRECTION=-1
const RIGHT_DIRECTION=1

const movePlayer = dx => state => {
  const { board, player } = state
  const nextX = player.x + dx

  if (
    (dx < 0 && nextX >= 0) ||
    (dx > 0 && nextX + player.width <= board.cols)
  ) {
    return { ...player, x: nextX }
  }

  return player
}

export const movePlayerLeft = movePlayer(LEFT_DIRECTION)
export const movePlayerRight = movePlayer(RIGHT_DIRECTION)
