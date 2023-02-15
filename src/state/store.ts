import { PreloadedState, configureStore } from '@reduxjs/toolkit'

import { env } from 'configs/env'
import { apiService } from 'shared/services/api'

import { rootReducer } from './rootReducer'

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>

type SetupStoreSettings = {
  preloadedState?: PreloadedState<RootState>
}

const setupStore = ({ preloadedState }: SetupStoreSettings = {}) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(apiService.middleware),
    devTools: env.isDevelopment,
  })
}

const store = setupStore()

export { setupStore }
export default store
