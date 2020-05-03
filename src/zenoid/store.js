import rematch from '@rematch/core'
import immerPlugin from '@rematch/immer'

import game from './game/model'
import level from './level/model'
import player from './player/model'
import ball from './ball/model'
import modifier from './modifier/model'

export const initZenoid = () => {
  const store = rematch.init({
    models: {
      game,
      level,
      player,
      ball,
      modifier,
    },
    plugins: [immerPlugin()],
  })

  store.dispatch.game.init()

  return store
}
