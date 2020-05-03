export const LEFT=-1
export const RIGHT=1
export const TOP=-1
export const BOTTOM=1
export const STOP=0

const TOP_BOTTOM_PROP='dy'
const LEFT_RIGHT_PROP='dx'

const set = prop => value => state => ({
  ...state,
  [prop]: value,
})

const setLeftRight = set(LEFT_RIGHT_PROP)

export const setLeft = setLeftRight(LEFT)
export const setRight = setLeftRight(RIGHT)
export const setStopX = setLeftRight(STOP)

const setTopBottom = set(TOP_BOTTOM_PROP)

export const setTop = setTopBottom(TOP)
export const setBottom = setTopBottom(BOTTOM)
