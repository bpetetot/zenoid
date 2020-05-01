import * as actions from '../helpers/actions'
import * as ball from '../helpers/ball'
import * as player from '../helpers/player'
import * as brick from '../helpers/brick'

export const init = (level) => {
  const initPlayer = player.init(level)
  return ({
    started: false,
    board: {
      ...level,
      bricks: level.bricks.map(brick.init),
    },
    player: initPlayer,
    ball: ball.init(initPlayer),
  })
}

export const update = (game, action) => {
  const { type, payload } = normalizeAction(action)

  game.player = player.reducer(game, { type, payload })
  game.ball = ball.reducer(game, { type, payload })

  if (type === actions.START_GAME) {
    game.started = true
  } else if (type === actions.GAME_OVER) {
    game.over = true
  } else if (type === actions.WIN) {
    game.win = true
  }
}

const normalizeAction = (action) => {
  if (!action) {
    return {}
  }
  if (typeof action === 'string') {
    return { type: action }
  }
  return action
}