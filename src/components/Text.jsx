import blessed from 'neo-blessed'

const Text = ({ children, ...props}) => {
  return blessed.parseTags(blessed.generateTags(props, children))
}

export default Text