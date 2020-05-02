import levels from '../levels'

import * as actions from '../helpers/actions'
import * as ball from '../helpers/ball'
import * as player from '../helpers/player'
import * as brick from '../helpers/brick'
import * as modifier from '../helpers/modifier'
import * as direction from '../helpers/direction'

export const GAME_SPEED = 45
export const GAME_SPEED_SLOW = 55
export const GAME_SPEED_FAST = 33

const READY='READY'
const PLAYING='PLAYING'
const LEVEL_WON='LEVEL_WON'
const WON='WON'
const OVER='OVER'

const isStatus = status => game => game.status === status

export const isOver = isStatus(OVER)
export const isPlaying = isStatus(PLAYING)
export const isLevelWon = isStatus(LEVEL_WON)
export const isWon = isStatus(WON)
export const isReady = isStatus(READY)

const setGameStatus = status => game => {
  game.status = status
  return game
}

const setReady = setGameStatus(READY)
const setLevelWon = setGameStatus(LEVEL_WON)
const setGameWon = setGameStatus(WON)
const setGameOver = setGameStatus(OVER)
const setGamePlaying = setGameStatus(PLAYING)

const incrementScore = (game, step = 1) => {
  game.score = game.score + step
  return game
}

export const init = (currentLevel = 1, lives = 5) => {
  const level = levels[currentLevel - 1]
  const initPlayer = player.init(level)
  return ({
    status: READY,
    score: 0,
    currentLevel,
    levelsCount: levels.length,
    lives,
    speed: GAME_SPEED,
    modifier: modifier.NONE,
    board: {
      ...level,
      bricks: level.bricks.map(brick.init),
    },
    player: initPlayer,
    ball: ball.init(initPlayer),
  })
}

const nextLevel = (game) => {
  const newGame = init(game.currentLevel + 1)
  Object.keys(newGame).forEach(key => {
    if (key !== 'score' && key !== 'lives') {
      game[key] = newGame[key]
    }
  })
  setReady(game)
  return game
}

const loseLive = (game) => {
  game.lives = game.lives - 1
  game.player = direction.setStopX(game.player)
  game.ball = ball.init(game.player)
  setReady(game)
  return game
}

const reducer = (game, action) => {
  switch (action.type) {
    case actions.GAME_OVER:
      return setGameOver(game)
    case actions.GAME_WON:
      return setGameWon(game)
    case actions.LEVEL_WON:
      return setLevelWon(game)
    case actions.PLAY_GAME:
      return setGamePlaying(game)
    case actions.INCREMENT_SCORE:
      return incrementScore(game, action.payload)
    case actions.START_NEXT_LEVEL:
      return nextLevel(game)
    case actions.LOSE_LIVE:
      return loseLive(game)
    default:
      return game
  }
}

export const update = (game, actionName) => {
  const action = createAction(actionName)

  game.player = player.reducer(game, action)
  game.ball = ball.reducer(game, action)
  game.board.bricks = brick.reducer(game, action)

  modifier.reducer(game, action)
  reducer(game, action)
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
