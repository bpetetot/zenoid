import { BUMP } from '../helpers/brick'
import { SHORT_BAR, LONG_BAR } from '../helpers/modifier'

export default {
  cols: 80,
  rows: 24,
  bricks: [
    { x: 18, y: 2, width: 4, height: 2, modifier: LONG_BAR },
    { x: 28, y: 2, width: 4, height: 2, type: BUMP },
    { x: 38, y: 2, width: 4, height: 2 },
    { x: 48, y: 2, width: 4, height: 2, type: BUMP },
    { x: 58, y: 2, width: 4, height: 2, modifier: SHORT_BAR },
  ],
}
