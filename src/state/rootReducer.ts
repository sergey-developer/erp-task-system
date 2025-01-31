import { combineReducers } from '@reduxjs/toolkit'

import authReducer from 'features/auth/auth.slice'

import { baseApi } from 'shared/api/baseApi'

export const rootReducer = combineReducers({
  [baseApi.reducerPath]: baseApi.reducer,
  auth: authReducer,
})
