import * as brick from './brick'

export const getBricks = board => board.bricks.filter(brick.isAlive)

export const getBricksRemaining = board => {
  return getBricks(board).filter(brick.isBreakable)
}

export const isFinished = board => {
  return getBricksRemaining(board).length === 0
}

export const getWidth = board => board.cols + 2

export const getHeight = board => board.rows + 2
