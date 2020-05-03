import levels from '../../levels'

// helpers
export const READY = 'READY'
export const PLAYING = 'PLAYING'
export const GAME_WON = 'GAME_WON'
export const GAME_OVER = 'GAME_OVER'
export const NEXT_LEVEL = 'NEXT_LEVEL'
export const GAME_SPEED = 45
export const GAME_SPEED_SLOW = 55
export const GAME_SPEED_FAST = 33


export default {
  state: {
    status: READY,
    score: 0,
    lives: 1,
    currentLevel: 0,
    speed: GAME_SPEED,
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
    startNextLevel: (state) => {
      state.status = READY
      state.currentLevel = state.currentLevel + 1
    },
    setSpeed: (state, speed) => {
      state.speed = speed
      return state
    },
  },
  effects: (dispatch) => ({
    init: (_payload, { game }) => {
      const level = levels[game.currentLevel]
      dispatch.level.init(level)
      dispatch.player.init(level)
      dispatch.ball.init(level)
    },
    update: (_payload, { game, level }) => {
      if (game.status !== PLAYING) return

      dispatch.ball.update()

      dispatch.ball.move()
      dispatch.player.move(level)

      dispatch.level.update()
    },
    die: (_payload, { game, player }) => {
      if (game.lives === 0) {
        dispatch.game.setStatus(GAME_OVER)
      } else {
        dispatch.game.setStatus(READY)
        dispatch.player.stop()
        dispatch.ball.moveToPlayer(player)
      }
    },
    startNextLevel: () => {
      dispatch.game.init()
    }
  }),
}
