import levels from '../levels'
import { NEXT_LEVEL, GAME_WON } from '../game/constants'
import { initBrick, isFinished } from './helpers'

export default {
  state: {
    cols: 0,
    rows: 0,
    bricks: [],
  },
  reducers: {
    init: (state, level) => {
      state.cols = level.cols
      state.rows = level.rows
      state.bricks = level.bricks.map(initBrick)
      return state
    },
    killBrick: (state, brickId) => {
      state.bricks[brickId].dead = true
      return state
    },
  },
  effects: (dispatch) => ({
    update: (_payload, { game, level }) => {
      if (isFinished(level)) {
        if (game.currentLevel < levels.length - 1) {
          dispatch.game.setStatus(NEXT_LEVEL)
        } else {
          dispatch.game.setStatus(GAME_WON)
        }
      }
    },
  }),
}
