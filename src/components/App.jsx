import React, { useState } from 'react'

import Board from './Board'
import Splashscreen from './Splashscreen'

const App = () => {
  const [started, setStarted] = useState(false)
  return (
    <box width="100%" height="100%">
      {started ? (
        <Board goToSplashscreen={() => setStarted(false)} />
      ) : (
        <Splashscreen onStart={() => setStarted(true)} />
      )}
    </box>
  )
}

export default App
