import React, { memo, useState, useRef } from 'react'

import { Lcd } from './Contrib'
import useInterval from '../hooks/useInterval'
import useKeys from '../hooks/useKeys'
import * as text from '../helpers/text'

const colors = ['red', 'green', 'blue']

const Splashscreen = ({ onStart }) => {
  const [color, setColor] = useState('red')
  const lcd = useRef(null)

  const keysRef = useKeys({ space: onStart })

  useInterval(() => {
    const value = Math.round(Math.random() * 1000)
    const newColor = colors[value % colors.length]
    lcd.current.setDisplay('ZENOID')
    lcd.current.setOptions({ color: newColor })
    setColor(newColor)
  }, 150)

  return (
    <box
      ref={keysRef}
      width="100%"
      height="100%"
    >
      <box width={60} height={8} top="40%" left="center">
        <Lcd ref={lcd} display="ZENOID" elements={6} color={color} />
      </box>
      <text top="40%+8" left="center">
        {text.style('Press <space> to start.', { fg: 'grey' })}
      </text>
    </box>
  )
}

export default memo(Splashscreen)
