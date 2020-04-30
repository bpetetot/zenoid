const LEFT_DIRECTION=-1
const TOP_DIRECTION=-1

const RIGHT_DIRECTION=1
const BOTTOM_DIRECTION=1

const TOP_BOTTOM_KEY='dy'
const LEFT_RIGHT_KEY='dx'

const setDirection = key => value => state => ({
  ...state,
  [key]: value,
})

const setDirectionLeftRight = setDirection(LEFT_RIGHT_KEY)

export const setDirectionLeft = setDirectionLeftRight(LEFT_DIRECTION)
export const setDirectionRight = setDirectionLeftRight(RIGHT_DIRECTION)

const setDirectionTopBottom = setDirection(TOP_BOTTOM_KEY)

export const setDirectionTop = setDirectionTopBottom(TOP_DIRECTION)
export const setDirectionBottom = setDirectionTopBottom(BOTTOM_DIRECTION)
