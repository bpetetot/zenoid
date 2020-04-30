import {BUMP} from '../helpers/brick'

export default {
	cols: 80,
  rows: 24,
  bricks: [
    { x: 0, y: 2, width: 6, height: 3, type: BUMP },
    { x: 20, y: 2, width: 6, height: 3 },
    { x: 40, y: 2, width: 6, height: 3 },
    { x: 50, y: 2, width: 6, height: 3, type: BUMP },
    { x: 70, y: 2, width: 6, height: 3 },
    { x: 0, y: 10, width: 6, height: 2, type: BUMP },
    { x: 20, y: 10, width: 6, height: 2 },
    { x: 40, y: 10, width: 6, height: 2, type: BUMP },
    { x: 50, y: 10, width: 6, height: 2 },
    { x: 70, y: 10, width: 6, height: 2 },
  ],
}
