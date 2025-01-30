import { combineReducers } from '@reduxjs/toolkit'

import authReducer from 'features/auth/auth.slice'

import { baseApiService } from 'shared/api/services/baseApi'

export const rootReducer = combineReducers({
  [baseApiService.reducerPath]: baseApiService.reducer,
  auth: authReducer,
})
