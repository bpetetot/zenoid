import * as actions from './actions'

export const NONE = 'NONE'
export const LONG_BAR = 'LONG_BAR'
export const SHORT_BAR = 'SHORT_BAR'

const modifiers = [
  {
    name: LONG_BAR,
    label: 'Long bar',
    modify: (game) => {
      game.player.width = 15
    },
  },
  {
    name: SHORT_BAR,
    label: 'Short bar',
    modify: (game) => {
      game.player.width = 7
    },
  },
]

export const getModifier = (name) => modifiers.find((m) => m.name === name)

const apply = (game, name) => {
  if (!name || name === NONE) return
  game.modifier = name

  const modifier = getModifier(name)
  modifier.modify(game)
}

export const reducer = (state, action) => {
  switch (action.type) {
    case actions.APPLY_MODIFIER:
      return apply(state, action.payload)
    default:
      return state
  }
}
