import * as actions from './actions'
import * as player from './player'
import * as gameHelper from './game'

export const NONE = 'NONE'
export const LONG_BAR = 'LONG_BAR'
export const SHORT_BAR = 'SHORT_BAR'
export const FAST_GAME = 'FAST_GAME'
export const SLOW_GAME = 'SLOW_GAME'

const BONUS_COLOR = 'green'
const MALUS_COLOR = 'red'

const modifiers = [
  {
    name: LONG_BAR,
    label: 'Long bar',
    color: BONUS_COLOR,
    modify: (game) => ({
      ...game,
      modifier: LONG_BAR,
      player: {
        ...game.player,
        width: player.PLAYER_WIDTH_LONG,
      },
    }),
  },
  {
    name: SHORT_BAR,
    label: 'Short bar',
    color: MALUS_COLOR,
    modify: (game) => ({
      ...game,
      modifier: SHORT_BAR,
      player: {
        ...game.player,
        width: player.PLAYER_WIDTH_SHORT,
      },
    }),
  },
  {
    name: FAST_GAME,
    label: 'Fast game',
    color: MALUS_COLOR,
    modify: (game) => ({
      ...game,
      modifier: FAST_GAME,
      speed: gameHelper.GAME_SPEED_FAST,
    }),
  },
  {
    name: SLOW_GAME,
    label: 'Slow game',
    color: BONUS_COLOR,
    modify: (game) => ({
      ...game,
      modifier: SLOW_GAME,
      speed: gameHelper.GAME_SPEED_SLOW,
    }),
  },
]

export const getModifier = (name) => modifiers.find((m) => m.name === name)

export const getColor = (name) => {
  const modifier = getModifier(name)
  if (modifier) return modifier.color
}

const apply = (game, name) => {
  if (!name || name === NONE) return game

  const modifier = getModifier(name)
  if (!modifier) return game

  return modifier.modify(game, name)
}

export const reducer = (state, action) => {
  switch (action.type) {
    case actions.APPLY_MODIFIER:
      return apply(state, action.payload)
    default:
      return state
  }
}
