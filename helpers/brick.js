export const BREAKABLE = 'BREAKABLE'
export const BUMP = 'BUMP'

export const init = (brick) => ({
  ...brick,
  visible: true,
  type: brick.type || BREAKABLE,
})

export const getColor = (type) => {
  if (type === BUMP) return 'grey'
  return 'yellow'
}
