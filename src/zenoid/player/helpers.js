import { LEFT, RIGHT } from '../direction'

const isMoving = (dx) => (state) => state.dx == dx

export const isMovingLeft = isMoving(LEFT)
export const isMovingRight = isMoving(RIGHT)
