import * as ball from '../helpers/ball'
import * as player from '../helpers/player'
import * as brick from '../helpers/brick'

export const init = (board) => ({
  board: {
    ...board,
    bricks: board.bricks.map(brick.init),
  },
  player: player.init(board),
  ball: ball.init(board),
})

export const update = (game, action) => {
  game.player = player.reducer(game, action)
  game.ball = ball.reducer(game, action)
};
