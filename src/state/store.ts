import { configureStore, PreloadedState } from '@reduxjs/toolkit'

import { env } from 'configs/env'

import { baseApiService } from 'shared/services/api'

import { rootReducer } from './rootReducer'

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>

type SetupStoreSettings = {
  preloadedState?: PreloadedState<RootState>
}

export const setupStore = ({ preloadedState }: SetupStoreSettings = {}) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(baseApiService.middleware),
    devTools: env.isDevelopment,
  })
}

export const store = setupStore()
