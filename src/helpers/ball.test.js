import * as ball from './ball'
import * as player from './player'
import {LEFT, RIGHT, BOTTOM} from './direction'

describe('ball', () => {
  let game
  beforeEach(() => {
    const board = { rows: 24, cols: 80 }
    game = {
      board,
      player: player.init(board),
      ball: { x: 0, y: 0, dx: LEFT, dy: BOTTOM, width: 2, height: 2 },
    }
  })

  it('should collide with player with ball coming from the right side', () => {
    game.player.x = 0
    game.ball.y = game.player.y - game.ball.height
    game.ball.dx = LEFT
    game.ball.dy = BOTTOM
    
    const originBallX = game.player.x + game.player.width
    for (let i = 0; i <= game.player.width; i++) {
      game.ball.x = originBallX - i
      expect(ball.willBumpPlayer(game)).toBe(true)
    }
  })

  it('should collide with player with ball coming from the left side', () => {
    game.player.x = game.board.cols - game.player.width
    game.ball.y = game.player.y - game.ball.height
    game.ball.dx = RIGHT
    game.ball.dy = BOTTOM
    
    const originBallX = game.player.x - game.ball.width
    for (let i = 0; i <= game.player.width; i++) {
      game.ball.x = originBallX + i
      expect(ball.willBumpPlayer(game)).toBe(true)
    }
  })

  it('should not collide on the right of the player ', () => {
    game.ball.x = game.player.width + game.ball.width + 1
    game.ball.y = game.player.y - game.ball.height
    game.ball.dx = LEFT
    game.ball.dy = BOTTOM
    expect(ball.willBumpPlayer(game)).toBe(false)
  })

  it('should not collide on the left of the player ', () => {
    game.ball.x = game.player.x - game.ball.width - 1
    game.ball.y = game.player.y - game.ball.height
    game.ball.dx = RIGHT
    game.ball.dy = BOTTOM
    expect(ball.willBumpPlayer(game)).toBe(false)
  })
})
