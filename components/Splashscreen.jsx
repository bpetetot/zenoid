import React, { memo, useState, useRef, useLayoutEffect } from 'react'
import { Lcd } from './Contrib'
import useInterval from '../hooks/useInterval'

const colors = ['red', 'green', 'blue']

const Splashscreen = ({ onStart }) => {
  const [color, setColor] = useState('red')
  const lcd = useRef(null)
  const box = useRef(null)

  useInterval(() => {
    const value = Math.round(Math.random() * 1000)
    const newColor = colors[value % colors.length]
    lcd.current.setDisplay('ZENOID')
    lcd.current.setOptions({ color: newColor })
    setColor(newColor)
  }, 150)

  useLayoutEffect(() => {
    box.current.key('space', onStart)
    return () => box.current.unkey('space', onStart)
  }, [])

  return (
    <box ref={box} focused width="100%-2" height="100%-2">
      <box width={60} height={8} top="40%" left="center">
        <Lcd ref={lcd} display="ZENOID" elements={6} color={color} />
      </box>
      <text top="40%+8" left="center">
        {'Press <space> to start.'}
      </text>
    </box>
  )
}

export default memo(Splashscreen)
