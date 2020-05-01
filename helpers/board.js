import * as brick from './brick'

export const getBricks = board => board.bricks.filter(b => b.visible)

export const getBricksRemaining = board => {
  return getBricks(board).filter(b => b.type !== brick.BUMP)
}

export const isFinished = board => {
  return getBricksRemaining(board).length === 0
}

export const getWidth = board => board.cols + 2

export const getHeight = board => board.rows + 2
