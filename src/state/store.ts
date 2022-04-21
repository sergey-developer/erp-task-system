import { configureStore } from '@reduxjs/toolkit'

import { env } from 'configs/env'
import api from 'shared/services/api.service'

import { rootReducer } from './rootReducer'

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
  devTools: env.isDevelopment,
})

export type RootState = ReturnType<typeof store.getState>

export default store
