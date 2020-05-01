import { useLayoutEffect, useRef } from 'react'

const forEach = (keyHandlers, callback) => {
  Object.entries(keyHandlers).forEach(([key, handler]) => {
    callback(key, handler)
  })
}

export default (keyHandlers) => {
  const ref = useRef(null)

  useLayoutEffect(() => {
    if (!ref.current) return

    ref.current.focus()
    
    forEach(keyHandlers, (key, handler) => {
      ref.current.key(key, handler)
    })

    return () => {
      if (!ref.current) return

      forEach(keyHandlers, (key, handler) => {
        ref.current.unkey(key, handler)
      })
    }
  }, [keyHandlers])

  return ref
}
