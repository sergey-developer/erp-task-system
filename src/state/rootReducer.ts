import { api } from 'shared/services/api'

export const rootReducer = {
  [api.reducerPath]: api.reducer,
}
