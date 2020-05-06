import { BREAKABLE, BUMP } from '../level/constants'
import { SHORT_BAR, LONG_BAR, SLOW_GAME, FAST_GAME, LIFE } from '../modifier/constants'

const mappingType = {
  B: BREAKABLE,
  U: BUMP,
}

const mappingModifier = {
  Q: SHORT_BAR,
  W: LONG_BAR,
  E: SLOW_GAME,
  R: FAST_GAME,
  T: LIFE,
}

const trim = (str) => str.replace(/^\s+|\s+$/g, '');

export const build = (levelDesc) => {
  const level = { cols: 0, rows: 0, bricks: [] }
  
  const cleanDesc = trim(levelDesc)

  if (!cleanDesc) return level

  let colsCount
  const rows = cleanDesc.split('\n')

  rows.forEach((row, rowIndex) => {
    const rowCols = Array.from(row)

    let previous
    rowCols.forEach((char, colIndex) => {
      let current = mappingType[char] || mappingModifier[char]
      if (char === previous && current) {
        level.bricks[level.bricks.length - 1].width += 1
      } else if (current) {
        const type = mappingType[char]
        const modifier = mappingModifier[char]
        const brick = {
          x: colIndex,
          y: rowIndex,
          width: 1,
          height: 1,
        }
        if (type) brick.type = type
        if (modifier) brick.modifier = modifier
        level.bricks.push(brick)
      }
      previous = char
    })
    previous = undefined

    if (!colsCount) {
      colsCount = rowCols.length
    } else if (colsCount !== rowCols.length) {
      console.warn(
        `Row ${rowIndex + 1}: Columns count (${rowCols.length}) different from the first row (${colsCount})`
      )
    }
  })

  level.rows = rows.length
  level.cols = colsCount

  return level
}
