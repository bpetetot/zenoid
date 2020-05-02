import React from 'react'
import blessed from 'neo-blessed'
import { createBlessedRenderer } from 'react-blessed'

import App from './components/App'

const render = createBlessedRenderer(blessed)
const screen = blessed.screen({
  title: 'Zenoid',
  smartCSR: true,
  fullUnicode: true,
  forceUnicode: true,
  debug: true,
})

screen.key(['escape', 'q', 'C-c'], () => process.exit(0))

render(<App />, screen)
