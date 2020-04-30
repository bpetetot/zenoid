import * as actions from '../helpers/actions'
import * as ball from '../helpers/ball'
import * as player from '../helpers/player'
import * as brick from '../helpers/brick'

export const init = (board) => {
  const initPlayer = player.init(board)
  return ({
    started: false,
    board: {
      ...board,
      bricks: board.bricks.map(brick.init),
    },
    player: initPlayer,
    ball: ball.init(initPlayer),
  })
}

export const update = (game, action) => {
  game.player = player.reducer(game, action)
  game.ball = ball.reducer(game, action)

  if (action === actions.START_GAME) {
    game.started = true
  } else if (action === actions.GAME_OVER) {
    game.over = true
  } else if (action === actions.WIN) {
    game.win = true
  }
};
