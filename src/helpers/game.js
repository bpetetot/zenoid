import levels from '../levels'

import * as actions from './actions'
import * as ball from './ball'
import * as player from './player'
import * as brick from './brick'
import * as board from './board'
import * as collision from './collision'
import * as modifier from './modifier'
import * as direction from './direction'

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

const setGameStatus = status => game => ({ ...game, status })

const setLevelWon = setGameStatus(LEVEL_WON)
const setGameWon = setGameStatus(WON)
const setGameOver = setGameStatus(OVER)
const setGamePlaying = setGameStatus(PLAYING)

const incrementScore = (game, step = 1) => ({
  ...game,
  score: game.score + step,
})

let CURRENT_GAME

export const get = () => {
  if (!CURRENT_GAME) return reset()
  return CURRENT_GAME
}

export const reset = (currentLevel = 1) => {
  const level = levels[currentLevel - 1]
  const initPlayer = player.init(level)
  CURRENT_GAME = {
    status: READY,
    score: 0,
    currentLevel,
    levelsCount: levels.length,
    lives: 5,
    speed: GAME_SPEED,
    modifier: modifier.NONE,
    board: {
      ...level,
      bricks: level.bricks.map(brick.init),
    },
    player: initPlayer,
    ball: ball.init(initPlayer),
  }
  return CURRENT_GAME
}

const nextLevel = (game) => ({
  ...reset(game.currentLevel + 1),
  status: READY,
  score: game.score,
  lives: game.lives,
})

const loseLive = (game) => {
  const newPlayer = direction.setStopX(game.player)
  return {
    ...game,
    status: READY,
    lives: game.lives - 1,
    player: newPlayer,
    ball: ball.init(newPlayer),
  }
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

const dispatch = (actionName) => {
  const action = createAction(actionName)
  CURRENT_GAME = { ...CURRENT_GAME, ...reducer(CURRENT_GAME, action) }
  CURRENT_GAME = { ...CURRENT_GAME, ...modifier.reducer(CURRENT_GAME, action) }
  CURRENT_GAME = { ...CURRENT_GAME, board: { ...CURRENT_GAME.board, bricks: brick.reducer(CURRENT_GAME, action) } }
  CURRENT_GAME = { ...CURRENT_GAME, player: player.reducer(CURRENT_GAME, action) } 
  CURRENT_GAME = { ...CURRENT_GAME, ball: ball.reducer(CURRENT_GAME, action) }
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

export const update = () => {
  if (!isPlaying(CURRENT_GAME)) {
    return CURRENT_GAME
  }
  if (ball.willBumpTop(CURRENT_GAME))
    dispatch(actions.SET_BALL_DIRECTION_BOTTOM)
  if (ball.willBumpLeft(CURRENT_GAME))
    dispatch(actions.SET_BALL_DIRECTION_RIGHT)
  if (ball.willBumpRight(CURRENT_GAME))
    dispatch(actions.SET_BALL_DIRECTION_LEFT)
  if (ball.willBumpBottom(CURRENT_GAME)) {
    if (CURRENT_GAME.lives === 0) {
      dispatch(actions.GAME_OVER)
    } else {
      dispatch(actions.LOSE_LIVE)
    }
  }

  if (ball.willBumpPlayer(CURRENT_GAME)) {
    dispatch(actions.SET_BALL_DIRECTION_TOP)
    dispatch(actions.HIGHLIGHT_PLAYER_COLOR)
  } else {
    dispatch(actions.RESET_PLAYER_COLOR)
  }

  const brickCollide = ball.findBrickCollision(CURRENT_GAME)
  if (brickCollide) {
    const { ball } = CURRENT_GAME
    if (collision.fromBottom(ball, brickCollide)) {
      dispatch(actions.SET_BALL_DIRECTION_BOTTOM)
    }
    if (collision.fromTop(ball, brickCollide)) {
      dispatch(actions.SET_BALL_DIRECTION_TOP)
    }
    if (collision.fromLeft(ball, brickCollide)) {
      dispatch(actions.SET_BALL_DIRECTION_LEFT)
    }
    if (collision.fromRight(ball, brickCollide)) {
      dispatch(actions.SET_BALL_DIRECTION_RIGHT)
    }

    if (brick.isBreakable(brickCollide)) {
      dispatch(actions.killBrick(brickCollide.id))
      dispatch(actions.applyModifier(brickCollide.modifier))
      dispatch(actions.incrementScore(brickCollide.points))
    }
  }

  if (board.isFinished(CURRENT_GAME.board)) {
    const nextLevel = CURRENT_GAME.currentLevel + 1
    if (nextLevel <= CURRENT_GAME.levelsCount) {
      dispatch(actions.LEVEL_WON)
    } else {
      dispatch(actions.GAME_WON)
    }
  }

  if (isPlaying(CURRENT_GAME)) {
    dispatch(actions.MOVE_BALL)
    dispatch(actions.MOVE_PLAYER)
  }

  return CURRENT_GAME
}

export const moveLeft = () => {
  if (!player.isMovingLeft(CURRENT_GAME)) {
    if (isReady(CURRENT_GAME)) {
      dispatch(actions.PLAY_GAME)
      dispatch(actions.SET_BALL_DIRECTION_LEFT)
    }
    dispatch(actions.SET_PLAYER_DIRECTION_LEFT)
  }
}

export const moveRight = () => {
  if (!player.isMovingRight(CURRENT_GAME.player)) {
    if (isReady(CURRENT_GAME)) {
      dispatch(actions.PLAY_GAME)
      dispatch(actions.SET_BALL_DIRECTION_RIGHT)
    }
    dispatch(actions.SET_PLAYER_DIRECTION_RIGHT)
  }
}

export const start = () => {
  if (isReady(CURRENT_GAME)) {
    dispatch(actions.PLAY_GAME)
  }
}

export const startNextLevel = () => {
  dispatch(actions.START_NEXT_LEVEL)
}
