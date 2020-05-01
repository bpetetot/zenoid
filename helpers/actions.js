export const PLAY_GAME = 'PLAY_GAME'
export const GAME_OVER = 'GAME_OVER'
export const GAME_WON = 'GAME_WON'
export const INCREMENT_SCORE = 'INCREMENT_SCORE'
export const MOVE_PLAYER = 'MOVE_PLAYER'
export const SET_PLAYER_DIRECTION_LEFT = 'SET_PLAYER_DIRECTION_LEFT'
export const SET_PLAYER_DIRECTION_RIGHT = 'SET_PLAYER_DIRECTION_RIGHT'
export const MOVE_BALL = 'MOVE_BALL'
export const SET_BALL_DIRECTION_BOTTOM = 'SET_BALL_DIRECTION_BOTTOM'
export const SET_BALL_DIRECTION_TOP = 'SET_BALL_DIRECTION_TOP'
export const SET_BALL_DIRECTION_LEFT = 'SET_BALL_DIRECTION_LEFT'
export const SET_BALL_DIRECTION_RIGHT = 'SET_BALL_DIRECTION_RIGHT'
export const HIGHLIGHT_PLAYER_COLOR = 'HIGHLIGHT_PLAYER_COLOR'
export const RESET_PLAYER_COLOR = 'RESET_PLAYER_COLOR'
export const KILL_BRICK = 'KILL_BRICK'

export const killBrick = id => ({
  type: KILL_BRICK,
  payload: id,
})

export const incrementScore = points => ({
  type: INCREMENT_SCORE,
  payload: points,
})
