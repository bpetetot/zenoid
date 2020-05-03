import * as player from './player'
import * as gameHelper from './game'

export const NONE = 'NONE'
export const LONG_BAR = 'LONG_BAR'
export const SHORT_BAR = 'SHORT_BAR'
export const FAST_GAME = 'FAST_GAME'
export const SLOW_GAME = 'SLOW_GAME'

const MODIFIERS = {
  [LONG_BAR]: {
    label: 'Long bar',
    effect: (dispatch) => {
      dispatch.player.setWidth(player.PLAYER_WIDTH_LONG)
    },
  },
  [SHORT_BAR]: {
    label: 'Short bar',
    effect: (dispatch) => {
      dispatch.player.setWidth(player.PLAYER_WIDTH_SHORT)
    },
  },
  [FAST_GAME]: {
    label: 'Fast game',
    effect: (dispatch) => {
      dispatch.game.setSpeed(gameHelper.GAME_SPEED_FAST)
    },
  },
  [SLOW_GAME]: {
    label: 'Slow game',
    effect: (dispatch) => {
      dispatch.game.setSpeed(gameHelper.GAME_SPEED_SLOW)
    },
  },
}

export default {
  state: '',
  reducers: {
    apply: (state, name) => getModifier(name).label || state,
  },
  effects: (dispatch) => ({
    apply(name) {
      const { effect } = getModifier(name)

      if (!effect) return

      effect(dispatch)
    }
  })
}

const getModifier = name => MODIFIERS[name] || {}
