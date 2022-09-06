import { combineReducers } from '@reduxjs/toolkit'

import authReducer from 'modules/auth/authSlice'
import { apiService } from 'shared/services/api'

export const rootReducer = combineReducers({
  [apiService.reducerPath]: apiService.reducer,
  auth: authReducer,
})
