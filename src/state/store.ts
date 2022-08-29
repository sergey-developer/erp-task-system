import { configureStore } from '@reduxjs/toolkit'

import { env } from 'configs/env'
import { apiService } from 'shared/services/api'

import { rootReducer } from './rootReducer'

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiService.middleware),
  devTools: env.isDevelopment,
})

export type RootState = ReturnType<typeof store.getState>

export default store
