import { RootState } from 'state/store'

export const selectIsAuthenticated = (state: RootState) =>
  state.authReducer.isAuthenticated
