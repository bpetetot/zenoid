import levels from '../../levels'

// helpers
export const READY = 'READY'
export const PLAYING = 'PLAYING'
export const GAME_WON = 'GAME_WON'
export const GAME_OVER = 'GAME_OVER'
export const NEXT_LEVEL = 'NEXT_LEVEL'

export default {
  state: {
    status: READY,
    score: 0,
    lives: 1,
    currentLevel: 0,
  },
  reducers: {
    incrementScore: (state, points = 1) => {
      state.score = state.score + points
      return state
    },
    die: (state) => {
      state.lives = state.lives - 1
      return state
    },
    setStatus: (state, status) => {
      state.status = status
      return state
    },
  },
  effects: (dispatch) => ({
    init: (payload, { game }) => {
      const level = levels[game.currentLevel]
      dispatch.level.init(level)
      dispatch.player.init(level)
      dispatch.ball.init(level)
    },
    update: (payload, { game, level }) => {
      if (game.status !== PLAYING) return

      dispatch.ball.update()

      dispatch.ball.move()
      dispatch.player.move(level)

      dispatch.level.update()
    },
    lose: (payload, { game, player }) => {
      dispatch.game.die()

      if (game.lives === 1) {
        dispatch.game.setStatus(GAME_OVER)
      } else {
        dispatch.game.setStatus(READY)
        dispatch.player.stop()
        dispatch.ball.moveToPlayer(player)
      }
    },
    startNextLevel: () => {
      
    }
  }),
}
