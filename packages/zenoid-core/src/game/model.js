import { setStatus, isPlaying } from './helpers'
import { READY, PLAYING, GAME_OVER, GAME_SPEED } from './constants'

export default {
  state: {
    status: READY,
    score: 0,
    lives: 5,
    currentLevel: 0,
    speed: GAME_SPEED,
  },
  reducers: {
    init: (state, levels) => {
      if (levels)  {
        state.lastLevel = levels.length - 1
        state.levels = levels
      }
      return state
    },
    incrementScore: (state, points = 1) => {
      state.score = state.score + points
      return state
    },
    ready: setStatus(READY),
    play: setStatus(PLAYING),
    gameOver: setStatus(GAME_OVER),
    die: (state) => {
      state.lives = state.lives - 1
      return state
    },
    addLife: (state) => {
      state.lives = state.lives + 1
      return state
    },
    setStatus: (state, status) => {
      state.status = status
      return state
    },
    startNextLevel: (state) => {
      state.status = READY
      state.currentLevel = state.currentLevel + 1
      return state
    },
    setSpeed: (state, speed) => {
      state.speed = speed
      return state
    },
  },
  effects: (dispatch) => ({
    init: (_payload, { game }) => {
      const level = game.levels[game.currentLevel]
      dispatch.level.init(level)
      dispatch.player.init(level)
      dispatch.ball.init(level)
      dispatch.modifier.init()
    },
    update: (_payload, { game, level }) => {
      if (!isPlaying(game)) return

      dispatch.ball.update()

      dispatch.ball.move()
      dispatch.player.move(level)

      dispatch.level.update()
    },
    die: (_payload, { game, player }) => {
      if (game.lives === 0) {
        dispatch.game.gameOver()
      } else {
        dispatch.game.ready()
        dispatch.player.stop()
        dispatch.ball.moveToPlayer(player)
      }
    },
    startNextLevel: () => {
      dispatch.game.init()
    },
  }),
}
