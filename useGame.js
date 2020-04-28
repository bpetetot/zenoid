import { useReducer } from 'react'
import { movePlayerLeft, movePlayerRight } from './movePlayer.js'

export const PLAYER_GO_LEFT='PLAYER_GO_LEFT'
export const PLAYER_GO_RIGHT='PLAYER_GO_RIGHT'

const gameReducer = (state, action) => {
  switch (action) {
    case PLAYER_GO_LEFT: 
      return {
        ...state,
        player: movePlayerLeft(state),
      }
    case PLAYER_GO_RIGHT: 
      return {
        ...state,
        player: movePlayerRight(state),
      }
    default:
      return state
  }
}

const getPlayerX = level => Math.floor(level.cols / 2 - (level.playerWidth / 2))

export const useGame = level => {
  const { cols, rows, bricks, playerWidth } = level

  const initialState = {
    board: {
      cols,
      rows,
      bricks,
    },
    player: {
      x: getPlayerX(level),
      width: playerWidth,
    },
  }
  return useReducer(gameReducer, initialState)
}
