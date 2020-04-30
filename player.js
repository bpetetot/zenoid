import * as direction from './direction'

const PLAYER_VELOCITY = 2

const isMoving = dx => state => state.dx == dx

export const isMovingLeft = isMoving(direction.LEFT)
export const isMovingRight = isMoving(direction.RIGHT)

export const move = (player, board) => {
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

const HIGHLIGHT_COLOR = 'red'
const DEFAULT_COLOR = 'blue'

const setColor = color => player => {
  if (player.color !== color) {
    return {...player, color }
  }
  return player
}

export const highlightColor = setColor(HIGHLIGHT_COLOR)
export const defaultColor = setColor(DEFAULT_COLOR)
