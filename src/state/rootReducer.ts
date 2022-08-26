import authReducer from 'modules/auth/authSlice'
import { apiService } from 'shared/services/api'

export const rootReducer = {
  [apiService.reducerPath]: apiService.reducer,
  auth: authReducer,
}
