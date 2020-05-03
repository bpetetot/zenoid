import rematch from '@rematch/core'
import immerPlugin from '@rematch/immer'

import models from './models'

export const initZenoid = () => {
  const store = rematch.init({
    models,
    plugins: [immerPlugin()],
  })

  store.dispatch.game.init()

  return store
}
