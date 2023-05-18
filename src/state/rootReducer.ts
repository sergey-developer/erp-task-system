import { combineReducers } from '@reduxjs/toolkit'

import authReducer from 'modules/auth/auth.slice'

import { baseApiService } from 'shared/services/api'

export const rootReducer = combineReducers({
  [baseApiService.reducerPath]: baseApiService.reducer,
  auth: authReducer,
})
