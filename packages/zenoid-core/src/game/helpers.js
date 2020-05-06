import * as constants from './constants'

const isStatus = (status) => (game) => game.status === status

export const isReady = isStatus(constants.READY)
export const isPlaying = isStatus(constants.PLAYING)
export const isNextLevel = isStatus(constants.NEXT_LEVEL)
export const isGameWon = isStatus(constants.GAME_WON)
export const isGameOver = isStatus(constants.GAME_OVER)

export const setStatus = (status) => (game) => {
  game.status = status
  return status
}

