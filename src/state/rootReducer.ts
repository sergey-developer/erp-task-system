import authReducer from 'modules/auth/authSlice'
import { api } from 'shared/services/api'

export const rootReducer = {
  [api.reducerPath]: api.reducer,
  authReducer,
}
