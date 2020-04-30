import { LEFT_DIRECTION, RIGHT_DIRECTION } from './directions.js'

const PLAYER_VELOCITY = 2

export const movePlayer = state => {
  const { board, player } = state
  
  let shouldMove = false
  let currentDx = player.dx * PLAYER_VELOCITY
  while (!shouldMove && Math.abs(currentDx) !== 0) {
    const nextX = player.x + currentDx
    if (currentDx <= 0) {
      if (nextX >= 0) {
        shouldMove = true
      } else {
        currentDx++
      }
    } else if (currentDx >= 0) {
      if (nextX + player.width <= board.cols) {
        shouldMove = true
      } else {
        currentDx--
      }
    }
  }

  if (shouldMove) {
    return { ...player, x: player.x + currentDx }
  }
  return player
}

const playerMoving = dx => state => {
  return state.dx == dx
}

export const playerMovingLeft = playerMoving(LEFT_DIRECTION)
export const playerMovingRight = playerMoving(RIGHT_DIRECTION)
