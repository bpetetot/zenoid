import * as actions from './actions'
import * as modifier from './modifier'

const BREAKABLE = 'BREAKABLE'
export const BUMP = 'BUMP'

const isType = type => brick => brick.type === type

export const isBreakable = isType(BREAKABLE)
export const isBump = isType(BUMP)

export const isAlive = brick => !brick.dead

export const init = (brick, id) => ({
  ...brick,
  id: brick.id || id,
  points: brick.points || 1,
  dead: false,
  type: brick.type || BREAKABLE,
  modifier: brick.modifier || modifier.NONE,
})

export const getColor = (type) => {
  if (type === BUMP) return 'grey'
  return 'yellow'
}

const kill = (bricks, id) => bricks.map(brick => ({
  ...brick,
  dead: brick.dead || brick.id === id,
}))

export const reducer = (state, action) => {
  switch (action.type) {
    case actions.KILL_BRICK:
      return kill(state.board.bricks, action.payload)
    default:
      return state.board.bricks
  }
}
