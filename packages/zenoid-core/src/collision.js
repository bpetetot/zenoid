export const touchBottom = (box1, box2) => box1.y === box2.y + box2.height

export const touchTop = (box1, box2) => box1.y + box1.height === box2.y

export const touchLeft = (box1, box2) => box1.x + box1.width === box2.x

export const touchRight = (box1, box2) => box1.x === box2.x + box2.width

export const touchBox = (box1) => (box2) => {
  if (box1.x > box2.x + box2.width || box2.x > box1.x + box1.width) {
    return false
  }
  if (box1.y > box2.y + box2.height || box2.y > box1.y + box1.height) {
    return false
  }
  return true
}
