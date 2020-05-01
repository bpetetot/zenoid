import * as actions from '../helpers/actions'
import * as ball from '../helpers/ball'
import * as player from '../helpers/player'
import * as brick from '../helpers/brick'

const READY='READY'
const PLAYING='PLAYING'
const WON='WON'
const OVER='OVER'

const isStatus = status => game => game.status === status

export const isOver = isStatus(OVER)
export const isPlaying = isStatus(PLAYING)
export const isWon = isStatus(WON)
export const isReady = isStatus(READY)

const setGameStatus = status => game => {
  game.status = status
  return game
}

const setGameWon = setGameStatus(WON)
const setGameOver = setGameStatus(OVER)
const setGamePlaying = setGameStatus(PLAYING)

const incrementScore = (game, step = 1) => {
  game.score = game.score + step
  return game
}

export const init = (level) => {
  const initPlayer = player.init(level)
  return ({
    status: READY,
    score: 0,
    board: {
      ...level,
      bricks: level.bricks.map(brick.init),
    },
    player: initPlayer,
    ball: ball.init(initPlayer),
  })
}

const updateGame = (game, action) => {
  switch (action.type) {
    case actions.GAME_OVER:
      return setGameOver(game)
    case actions.GAME_WON:
      return setGameWon(game)
    case actions.PLAY_GAME:
      return setGamePlaying(game)
    case actions.INCREMENT_SCORE:
      return incrementScore(game, action.payload)
    default:
      return game
  }
}

export const update = (game, actionName) => {
  const action = createAction(actionName)

  game.player = player.reducer(game, action)
  game.ball = ball.reducer(game, action)
  game.board.bricks = brick.reducer(game, action)

  return updateGame(game, action)
}

const createAction = (action) => {
  if (!action) {
    return {}
  }
  if (typeof action === 'string') {
    return { type: action }
  }
  return action
}
