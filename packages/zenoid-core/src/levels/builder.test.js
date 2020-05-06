import { BREAKABLE, BUMP } from '../level/constants'
import { SHORT_BAR } from '../modifier/constants'
import { build } from './builder'

describe('level builder', () => {
  it('should return an empty level if no description provided', () => {
    const levelDesc = ''
    const level = build(levelDesc)
    expect(level).toStrictEqual({ cols: 0, rows: 0, bricks: [] })
  })

  it('should parse a 1 char breakable type brick "B"', () => {
    const levelDesc = 'B'
    const level = build(levelDesc)
    expect(level.bricks).toStrictEqual([
      { x: 0, y: 0, width: 1, height: 1, type: BREAKABLE },
    ])
  })

  it('should parse a 1 char bump type brick "U"', () => {
    const levelDesc = 'U'
    const level = build(levelDesc)
    expect(level.bricks).toStrictEqual([
      { x: 0, y: 0, width: 1, height: 1, type: BUMP },
    ])
  })

  it('should parse a 1 char modifier short player type brick "Q"', () => {
    const levelDesc = 'Q'
    const level = build(levelDesc)
    expect(level.bricks).toStrictEqual([
      { x: 0, y: 0, width: 1, height: 1, modifier: SHORT_BAR },
    ])
  })

  it('should parse a 1 char breakable brick "B" into empty blocks "X" line', () => {
    const levelDesc = 'XXBXX'
    const level = build(levelDesc)
    expect(level.bricks).toStrictEqual([
      { x: 2, y: 0, width: 1, height: 1, type: BREAKABLE },
    ])
  })

  it('should parse a 1 char breakable brick "B" into multiple empty lines', () => {
    const levelDesc = `
XXXXX
XXBXX
XXXXX`
    const level = build(levelDesc)
    expect(level.cols).toBe(5)
    expect(level.rows).toBe(3)
    expect(level.bricks).toStrictEqual([
      { x: 2, y: 1, width: 1, height: 1, type: BREAKABLE },
    ])
  })

  it('should parse a 3 consecutive char breakable brick into 1 brick with a width of 3', () => {
    const levelDesc = 'XXXXXBBBXXXXX'
    const level = build(levelDesc)
    expect(level.bricks).toStrictEqual([
      { x: 5, y: 0, width: 3, height: 1, type: BREAKABLE },
    ])
  })
})
