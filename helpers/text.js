import blessed from 'neo-blessed'

export const style = (content, style) => {
  return blessed.parseTags(blessed.generateTags(style, content))
}