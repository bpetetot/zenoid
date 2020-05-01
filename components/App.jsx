import React, { useState } from 'react'
import blessed from 'neo-blessed'
import { createBlessedRenderer } from 'react-blessed'

import Board from './Board'
import Splashscreen from './Splashscreen'

const render = createBlessedRenderer(blessed)

const screen = blessed.screen({
  title: 'Zenoid',
  smartCSR: true,
  fullUnicode: true,
  forceUnicode: true,
  debug: true,
})
screen.key(['escape', 'q', 'C-c'], () => process.exit(0))

const App = () => {
  const [started, setStarted] = useState(false)
  return (
    <box width="100%" height="100%">
      {started ? (
        <Board onRestart={() => setStarted(false)} />
      ) : (
        <Splashscreen onStart={() => setStarted(true)} />
      )}
    </box>
  )
}

render(<App />, screen)
