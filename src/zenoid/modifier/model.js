import { PLAYER_WIDTH_LONG, PLAYER_WIDTH_SHORT } from '../player/constants'
import { GAME_SPEED_FAST, GAME_SPEED_SLOW } from '../game/constants'
import * as names from './constants'

const MODIFIERS = {
  [names.LONG_BAR]: {
    label: 'Long bar',
    color: 'green',
    effect: (dispatch) => {
      dispatch.player.setWidth(PLAYER_WIDTH_LONG)
    },
  },
  [names.SHORT_BAR]: {
    label: 'Short bar',
    color: 'blue',
    effect: (dispatch) => {
      dispatch.player.setWidth(PLAYER_WIDTH_SHORT)
    },
  },
  [names.FAST_GAME]: {
    label: 'Fast game',
    color: 'magenta',
    effect: (dispatch) => {
      dispatch.game.setSpeed(GAME_SPEED_FAST)
    },
  },
  [names.SLOW_GAME]: {
    label: 'Slow game',
    color: 'cyan',
    effect: (dispatch) => {
      dispatch.game.setSpeed(GAME_SPEED_SLOW)
    },
  },
  [names.LIFE]: {
    label: 'New life',
    color: 'red',
    effect: (dispatch) => {
      dispatch.game.addLife()
    },
  },
}

export const getModifier = (name) => MODIFIERS[name] || {}

export default {
  state: '',
  reducers: {
    init: (state) => {
      state = ''
      return state
    },
    apply: (state, name) => getModifier(name).label || state,
  },
  effects: (dispatch) => ({
    apply(name) {
      const { effect } = getModifier(name)

      if (!effect) return

      effect(dispatch)
    },
  }),
}
