import * as player from './player'
import * as gameHelper from './game'

export const NONE = 'NONE'
export const LONG_BAR = 'LONG_BAR'
export const SHORT_BAR = 'SHORT_BAR'
export const FAST_GAME = 'FAST_GAME'
export const SLOW_GAME = 'SLOW_GAME'

const BONUS_COLOR = 'green'
const MALUS_COLOR = 'red'

const modifiers = {
  [LONG_BAR]: {
    label: 'Long bar',
    color: BONUS_COLOR,
    effect: (dispatch) => () => {
      dispatch.player.setWidth(player.PLAYER_WIDTH_LONG)
    },
  },
  [SHORT_BAR]: {
    label: 'Short bar',
    color: MALUS_COLOR,
    effect: (dispatch) => () => {
      dispatch.player.setWidth(player.PLAYER_WIDTH_SHORT)
    },
  },
  [FAST_GAME]: {
    label: 'Fast game',
    color: MALUS_COLOR,
    effect: (dispatch) => () => {
      dispatch.game.setSpeed(gameHelper.GAME_SPEED_FAST)
    },
  },
  [SLOW_GAME]: {
    label: 'Slow game',
    color: BONUS_COLOR,
    effect: (dispatch) => () => {
      dispatch.game.setSpeed(gameHelper.GAME_SPEED_SLOW)
    },
  },
}

export const getModifier = (name) => modifiers[name]

export const getColor = (name) => {
  const modifier = getModifier(name)
  if (modifier) return modifier.color
}
