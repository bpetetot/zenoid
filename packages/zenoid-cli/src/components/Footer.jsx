import React, { memo } from 'react'
import Text from './Text'

export const FOOTER_HEIGHT = 1

const Footer = () => {
  return (
    <box bottom={0} width="100%" height={FOOTER_HEIGHT}>
      <box left={1} width="50%">
        <Text fg="grey">{'Press ← and → to move the player. <space> to dash.'}</Text>
      </box>
      <box right={0} width={19}>
        <Text fg="grey">by Charlyx and Ben</Text>
      </box>
    </box>
  )
}

export default memo(Footer)
