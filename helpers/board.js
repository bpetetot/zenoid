import * as brick from './brick'

export const getBricks = board => board.bricks.filter(brick => brick.visible)

export const isFinished = board => {
  return getBricks(board).filter(brick => brick !== brick.BUMP).length === 0
}
