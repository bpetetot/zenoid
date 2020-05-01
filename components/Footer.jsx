import React, { memo } from 'react'

import * as text from '../helpers/text'

export const FOOTER_HEIGHT = 1

const Footer = () => {
  return (
    <box bottom={0} width="100%" height={FOOTER_HEIGHT}>
      <box left={1} width="50%">
        {text.style('Press ← and → to move the player.', { fg: 'grey' })}
      </box>
      <box right={0} width={19}>
        {text.style('by Charlyx and Ben', { fg: 'grey' })}
      </box>
    </box>
  )
}

export default memo(Footer)
