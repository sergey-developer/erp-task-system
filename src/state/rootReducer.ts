import authReducer from 'modules/auth/authSlice'
import tasksReducer from 'modules/tasks/tasksSlice'
import { api } from 'shared/services/api'

export const rootReducer = {
  [api.reducerPath]: api.reducer,
  authReducer,
  tasksReducer,
}
