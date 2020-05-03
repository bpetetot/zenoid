import levels from '../../levels'
import * as gameConstants from './game'

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
    }
  },
  effects: (dispatch) => ({
    update: (payload, { game, level }) => {
      if (isFinished(level)) {
        if (game.currentLevel < levels.length) {
          dispatch.game.setStatus(gameConstants.NEXT_LEVEL)
        } else {
          dispatch.game.setStatus(gameConstants.GAME_WON)
        }
      }
    }, 
  })
}

// helpers
const BREAKABLE = 'BREAKABLE'
const BUMP = 'BUMP'

const initBrick = (brick, id) => ({
  ...brick,
  id: brick.id || id,
  points: brick.points || 1,
  dead: false,
  type: brick.type || BREAKABLE,
  // modifier: brick.modifier || modifier.NONE,
})

const isType = type => brick => brick.type === type

export const isBreakable = isType(BREAKABLE)
export const isBump = isType(BUMP)
export const isAlive = brick => !brick.dead

export const getBricks = level => level.bricks.filter(isAlive)

export const getBricksRemaining = level => {
  return getBricks(level).filter(isBreakable)
}

export const isFinished = level => {
  return getBricksRemaining(level).length === 0
}
