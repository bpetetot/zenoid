import { useLayoutEffect, useRef } from 'react'

export default (keyHandlers) => {
  const ref = useRef(null)

  useLayoutEffect(() => {
    if (!ref.current) return

    ref.current.focus()
    
    Object.entries(keyHandlers).forEach(([key, handler]) => {
      ref.current.key(key, handler)
    })

    return () => {
      if (!ref.current) return
      Object.entries(keyHandlers).forEach(([key, handler]) => {
        ref.current.unkey(key, handler)
      })
    }
  }, [keyHandlers])

  return ref
}
