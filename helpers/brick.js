import * as actions from './actions'

export const BREAKABLE = 'BREAKABLE'
export const BUMP = 'BUMP'

export const init = (brick, id) => ({
  ...brick,
  id,
  dead: false,
  type: brick.type || BREAKABLE,
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
