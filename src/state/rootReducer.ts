import api from 'shared/services/api.service'

export const rootReducer = {
  [api.reducerPath]: api.reducer,
}
