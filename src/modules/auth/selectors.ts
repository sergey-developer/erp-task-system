import { RootState } from 'state/store'

export const selectIsAuthenticated = (
  state: RootState,
): RootState['auth']['isAuthenticated'] => state.auth.isAuthenticated
