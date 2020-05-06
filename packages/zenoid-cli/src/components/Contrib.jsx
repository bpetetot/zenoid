import React from 'react'
import contrib from 'neo-blessed-contrib'
import blessed from 'neo-blessed'

blessed.__BLESSED_WRAPPER__ = function (props) {
  return props.__BLESSED_WIDGET__(props)
}

function createBlessedComponent(blessedElement) {
  return React.forwardRef((props, ref) => {
    return React.createElement('__BLESSED_WRAPPER__', {
      ...props,
      __BLESSED_WIDGET__: blessedElement,
      ref,
    })
  })
}

export const Lcd = createBlessedComponent(contrib['lcd'])
