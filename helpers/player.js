import * as actions from './actions'
import * as direction from './direction'

const PLAYER_HEIGHT = 1
const PLAYER_WIDTH = 10

export const init = (board) => ({
  x:  Math.floor(board.cols / 2 - PLAYER_WIDTH / 2),
  y:  board.rows - PLAYER_HEIGHT,
  width: PLAYER_WIDTH,
  height: PLAYER_HEIGHT,
  dx: 0,
})

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
    return { ...player, color }
  }
  return player
}

export const highlightColor = setColor(HIGHLIGHT_COLOR)
export const defaultColor = setColor(DEFAULT_COLOR)

export const reducer = (state, action) => {
  switch (action) {
    case actions.SET_PLAYER_DIRECTION_LEFT:
      return direction.setLeft(state.player)
    case actions.SET_PLAYER_DIRECTION_RIGHT:
      return direction.setRight(state.player)
    case actions.MOVE_PLAYER:
      return move(state.player, state.board) 
    case actions.HIGHLIGHT_PLAYER_COLOR:
      return highlightColor(state.player)
    case actions.RESET_PLAYER_COLOR:
      return defaultColor(state.player)
    default:
      return state.player
  }
}
